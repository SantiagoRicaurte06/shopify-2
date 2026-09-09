/**
 * Audita las reglas de Shopify que `theme check` NO detecta y que solo se
 * manifiestan al subir el theme a la tienda, más las que sí detecta pero
 * conviene ver en una sola lista.
 *
 * Cada comprobación viene de un error real. Están documentados en ERRORES.md
 * con el número que aparece entre corchetes.
 *
 *   node scripts/auditar-theme.js
 *
 * Sale con código 1 si encuentra algo, para poder encadenarlo en CI.
 */
const fs = require("fs");
const path = require("path");

const THEME = path.join(__dirname, "..", "theme");
const problemas = [];

const marcar = (regla, archivo, detalle) =>
  problemas.push({ regla, archivo: path.relative(path.join(__dirname, ".."), archivo), detalle });

const leer = (p) => fs.readFileSync(p, "utf8");
const listar = (dir, ext) =>
  fs.existsSync(dir)
    ? fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(ext))
        .map((f) => path.join(dir, f))
    : [];

/** El JSON de plantillas y grupos empieza con un comentario de bloque. */
const parseJsonConComentario = (texto) => JSON.parse(texto.slice(texto.indexOf("{")));

const extraerSchema = (texto) => {
  const m = texto.match(/\{%\s*schema\s*%\}([\s\S]*?)\{%\s*endschema\s*%\}/);
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch (e) {
    return { __error: e.message };
  }
};

/** Recorre settings y los settings anidados de presets/blocks. */
const recorrerSettings = (schema, visitar) => {
  (schema.settings || []).forEach(visitar);
  (schema.blocks || []).forEach((b) => (b.settings || []).forEach(visitar));
};

// --- Localización ----------------------------------------------------------

const locales = {
  esSchema: JSON.parse(leer(path.join(THEME, "locales", "es.default.schema.json"))),
  enSchema: JSON.parse(leer(path.join(THEME, "locales", "en.schema.json"))),
  esTienda: JSON.parse(leer(path.join(THEME, "locales", "es.default.json"))),
  enTienda: JSON.parse(leer(path.join(THEME, "locales", "en.json"))),
};

const resolver = (obj, ruta) =>
  ruta.split(".").reduce((acc, k) => (acc == null ? undefined : acc[k]), obj);

/**
 * Tipos de sección que ya coloca una plantilla o un grupo. No necesitan
 * preset porque el comerciante nunca las añade a mano.
 */
const colocadasPorPlantilla = new Set();
for (const carpeta of ["templates", "sections"]) {
  for (const f of listar(path.join(THEME, carpeta), ".json")) {
    try {
      const datos = parseJsonConComentario(leer(f));
      for (const s of Object.values(datos.sections || {})) colocadasPorPlantilla.add(s.type);
    } catch {
      /* el JSON inválido se reporta más abajo */
    }
  }
}

const archivosLiquid = [
  ...listar(path.join(THEME, "sections"), ".liquid"),
  ...listar(path.join(THEME, "blocks"), ".liquid"),
  ...listar(path.join(THEME, "snippets"), ".liquid"),
  ...listar(path.join(THEME, "layout"), ".liquid"),
];

for (const archivo of archivosLiquid) {
  const texto = leer(archivo);
  const esSeccion = archivo.includes(`${path.sep}sections${path.sep}`);
  const esBloque = archivo.includes(`${path.sep}blocks${path.sep}`);

  // [2] Los bloques de una sección solo se pueden renderizar una vez.
  const veces = (texto.match(/\{%-?\s*content_for\s+'blocks'/g) || []).length;
  if (veces > 1) {
    marcar("bloques-duplicados", archivo, `content_for 'blocks' aparece ${veces} veces (máximo 1)`);
  }

  // Claves de tienda: {{ 'x.y' | t }}
  for (const m of texto.matchAll(/'([a-z0-9_]+(?:\.[a-z0-9_]+)+)'\s*\|\s*t\b/g)) {
    const clave = m[1];
    if (resolver(locales.esTienda, clave) === undefined) {
      marcar("traduccion-tienda", archivo, `${clave} falta en es.default.json`);
    } else if (resolver(locales.enTienda, clave) === undefined) {
      marcar("traduccion-tienda", archivo, `${clave} falta en en.json`);
    }
  }

  // [27] Los argumentos de una etiqueta render son literales o variables.
  // Ni filtros ni comparaciones: Shopify lo rechaza al subir y theme check
  // no lo detecta. La solución es un assign antes del render.
  for (const m of texto.matchAll(/\{%-?\s*render\s+[\s\S]*?-?%\}/g)) {
    const args = m[0].replace(/^\{%-?\s*render\s+/, "").replace(/-?%\}$/, "");
    const linea = texto.slice(0, m.index).split("\n").length;
    if (/\|/.test(args)) {
      marcar("render-con-filtro", archivo, `línea ${linea}: usa un assign antes del render`);
    } else if (/(==|!=|<=|>=|\s(and|or)\s)/.test(args)) {
      marcar("render-con-comparacion", archivo, `línea ${linea}: usa un assign antes del render`);
    }
  }

  // [28] Dentro de una etiqueta liquid cada línea se analiza por separado.
  // Una condición partida convierte el "or" de la línea siguiente en una
  // etiqueta desconocida, y un delimitador dentro de un comentario cierra la
  // etiqueta antes de tiempo y desparrama el resto sobre la página.
  for (const m of texto.matchAll(/\{%-?\s*liquid\b([\s\S]*?)-?%\}/g)) {
    const cuerpo = m[1];
    const linea = texto.slice(0, m.index).split("\n").length;
    if (cuerpo.includes("%}") || cuerpo.includes("{%")) {
      marcar(
        "liquid-delimitador",
        archivo,
        `línea ${linea}: un delimitador dentro del bloque lo cierra antes de tiempo`,
      );
    }
    for (const l of cuerpo.split("\n")) {
      if (/^\s*(or|and)\s/.test(l)) {
        marcar(
          "liquid-condicion-partida",
          archivo,
          `línea ${linea}: la condición entera debe caber en una sola línea`,
        );
      }
    }
  }

  const schema = extraerSchema(texto);
  if (!schema) continue;
  if (schema.__error) {
    marcar("schema-invalido", archivo, schema.__error);
    continue;
  }

  // Claves de editor: "t:x.y" en cualquier parte del schema.
  const crudo = JSON.stringify(schema);
  for (const m of crudo.matchAll(/"t:([a-z0-9_]+(?:\.[a-z0-9_]+)+)"/g)) {
    const clave = m[1];
    if (resolver(locales.esSchema, clave) === undefined) {
      marcar("traduccion-editor", archivo, `t:${clave} falta en es.default.schema.json`);
    } else if (resolver(locales.enSchema, clave) === undefined) {
      marcar("traduccion-editor", archivo, `t:${clave} falta en en.schema.json`);
    }
  }

  // [16] El nombre traducido de una sección no puede pasar de 25 caracteres.
  if (esSeccion && typeof schema.name === "string" && schema.name.startsWith("t:")) {
    const clave = schema.name.slice(2);
    for (const [idioma, tabla] of [
      ["es", locales.esSchema],
      ["en", locales.enSchema],
    ]) {
      const valor = resolver(tabla, clave);
      if (typeof valor === "string" && valor.length > 25) {
        marcar("nombre-largo", archivo, `${idioma}: "${valor}" tiene ${valor.length} caracteres`);
      }
    }
  }

  recorrerSettings(schema, (s) => {
    if (!s || typeof s !== "object") return;

    // [3] Un range necesita al menos tres pasos.
    if (s.type === "range") {
      const pasos = (s.max - s.min) / s.step + 1;
      if (!Number.isFinite(pasos) || pasos < 3) {
        marcar("range-corto", archivo, `${s.id}: ${pasos} pasos (mínimo 3) — usa un select`);
      }
      if (s.default !== undefined && (s.default < s.min || s.default > s.max)) {
        marcar(
          "range-default",
          archivo,
          `${s.id}: default ${s.default} fuera de [${s.min}, ${s.max}]`,
        );
      }
    }

    // [4] El valor de un select es siempre una cadena.
    if (s.type === "select") {
      (s.options || []).forEach((o) => {
        if (typeof o.value !== "string") {
          marcar(
            "select-no-string",
            archivo,
            `${s.id}: valor ${JSON.stringify(o.value)} no es cadena`,
          );
        }
      });
      if (s.default !== undefined && !(s.options || []).some((o) => o.value === s.default)) {
        marcar(
          "select-default",
          archivo,
          `${s.id}: default "${s.default}" no está entre las opciones`,
        );
      }
    }

    // [17] El default de un richtext tiene que venir envuelto en <p>.
    if (s.type === "richtext" && typeof s.default === "string" && s.default.length) {
      const valor = s.default.startsWith("t:")
        ? resolver(locales.esSchema, s.default.slice(2))
        : s.default;
      if (typeof valor === "string" && !valor.trim().startsWith("<")) {
        marcar("richtext-sin-p", archivo, `${s.id}: el default debe ir envuelto en <p>…</p>`);
      }
    }
  });

  // Presets. Una sección solo los necesita si el comerciante ha de poder
  // añadirla a mano; las que ya coloca una plantilla o un grupo (la sección
  // principal de producto, de carrito, el encabezado…) no.
  if ((esSeccion || esBloque) && !schema.presets) {
    const nombre = path.basename(archivo, ".liquid");
    if (!colocadasPorPlantilla.has(nombre)) {
      marcar("sin-preset", archivo, "no tiene presets: no se puede añadir desde el editor");
    }
  }
}

// --- Plantillas JSON -------------------------------------------------------

const plantillas = [
  ...listar(path.join(THEME, "templates"), ".json"),
  ...listar(path.join(THEME, "sections"), ".json"),
];

/** Índice de tipo de ajuste por tipo de sección y de bloque. */
const tiposDeAjuste = {};
for (const carpeta of ["sections", "blocks"]) {
  for (const archivo of listar(path.join(THEME, carpeta), ".liquid")) {
    const schema = extraerSchema(leer(archivo));
    if (!schema || schema.__error) continue;
    const clave = `${carpeta}:${path.basename(archivo, ".liquid")}`;
    tiposDeAjuste[clave] = {};
    recorrerSettings(schema, (s) => {
      if (s && s.id) tiposDeAjuste[clave][s.id] = s.type;
    });
  }
}

for (const archivo of plantillas) {
  let datos;
  try {
    datos = parseJsonConComentario(leer(archivo));
  } catch (e) {
    marcar("json-invalido", archivo, e.message);
    continue;
  }

  const revisarAjustes = (clave, ajustes) => {
    const tipos = tiposDeAjuste[clave];
    if (!tipos || !ajustes) return;
    for (const [id, valor] of Object.entries(ajustes)) {
      if (tipos[id] === undefined) {
        marcar("ajuste-desconocido", archivo, `${clave} → "${id}" no existe en el schema`);
      } else if (tipos[id] === "select" && typeof valor !== "string") {
        // [4] El caso que rompe al subir y que theme check no ve.
        marcar(
          "select-no-string",
          archivo,
          `${clave} → "${id}": ${JSON.stringify(valor)} debe ir entre comillas`,
        );
      }
    }
  };

  for (const seccion of Object.values(datos.sections || {})) {
    revisarAjustes(`sections:${seccion.type}`, seccion.settings);
    for (const bloque of Object.values(seccion.blocks || {})) {
      revisarAjustes(`blocks:${bloque.type}`, bloque.settings);
    }
  }

  // Límites de la plataforma.
  const nSecciones = Object.keys(datos.sections || {}).length;
  if (nSecciones > 25) marcar("limite-secciones", archivo, `${nSecciones} secciones (máximo 25)`);
  for (const [id, seccion] of Object.entries(datos.sections || {})) {
    const nBloques = Object.keys(seccion.blocks || {}).length;
    if (nBloques > 50) marcar("limite-bloques", archivo, `${id}: ${nBloques} bloques (máximo 50)`);
  }
}

// --- Informe ---------------------------------------------------------------

if (problemas.length === 0) {
  console.log(
    `✓ Sin incidencias. ${archivosLiquid.length} liquid y ${plantillas.length} JSON revisados.`,
  );
  process.exit(0);
}

console.log(`✗ ${problemas.length} incidencia(s):\n`);
for (const p of problemas) {
  console.log(`  [${p.regla}] ${p.archivo}\n      ${p.detalle}`);
}
process.exit(1);
