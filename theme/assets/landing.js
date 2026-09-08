/**
 * Landing behaviour. No dependencies, no framework.
 *
 * Everything essential is rendered server-side in Liquid; this file only adds
 * behaviour that HTML cannot express on its own. Accordions use <details>, so
 * the FAQ needs no JavaScript at all.
 *
 * Custom elements are used so each behaviour is scoped to the markup that asks
 * for it, and so sections re-initialise correctly when the theme editor
 * re-renders them.
 */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/**
 * Fades elements in as they enter the viewport.
 *
 * Elements start hidden via CSS only when motion is allowed, so if this script
 * fails to load the content is still visible.
 */
class LandingReveal extends HTMLElement {
  connectedCallback() {
    const targets = this.querySelectorAll(".reveal");

    if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          this.observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    targets.forEach((el) => this.observer.observe(el));
  }

  disconnectedCallback() {
    this.observer?.disconnect();
  }
}

/**
 * Shows a fixed mobile call to action once the main buy button has scrolled
 * out of view, and hides it again when the buy button comes back.
 *
 * Watching the real buy button rather than a scroll offset means the sticky bar
 * never covers the control it duplicates.
 */
class LandingSticky extends HTMLElement {
  connectedCallback() {
    const targetId = this.dataset.watch;
    const target = targetId ? document.getElementById(targetId) : null;

    if (!target || !("IntersectionObserver" in window)) {
      this.hidden = false;
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.hidden = entry.isIntersecting;
      },
      { threshold: 0 },
    );

    this.observer.observe(target);
  }

  disconnectedCallback() {
    this.observer?.disconnect();
  }
}

/**
 * Adds previous/next controls to a scroll-snap track.
 *
 * The track scrolls natively with touch and keyboard already; the buttons exist
 * for pointer users and are removed from the tab order when they cannot act.
 */
class LandingCarousel extends HTMLElement {
  connectedCallback() {
    this.track = this.querySelector("[data-carousel-track]");
    this.previous = this.querySelector("[data-carousel-previous]");
    this.next = this.querySelector("[data-carousel-next]");

    if (!this.track) return;

    this.onPrevious = () => this.scrollByPage(-1);
    this.onNext = () => this.scrollByPage(1);
    this.onScroll = () => this.updateControls();

    this.previous?.addEventListener("click", this.onPrevious);
    this.next?.addEventListener("click", this.onNext);
    this.track.addEventListener("scroll", this.onScroll, { passive: true });

    this.updateControls();
  }

  disconnectedCallback() {
    this.previous?.removeEventListener("click", this.onPrevious);
    this.next?.removeEventListener("click", this.onNext);
    this.track?.removeEventListener("scroll", this.onScroll);
  }

  scrollByPage(direction) {
    const item = this.track.firstElementChild;
    const amount = item ? item.getBoundingClientRect().width + 16 : this.track.clientWidth;

    this.track.scrollBy({
      left: amount * direction,
      behavior: prefersReducedMotion.matches ? "auto" : "smooth",
    });
  }

  updateControls() {
    const { scrollLeft, scrollWidth, clientWidth } = this.track;
    const atStart = scrollLeft <= 1;
    const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;

    if (this.previous) this.previous.disabled = atStart;
    if (this.next) this.next.disabled = atEnd;
  }
}

/**
 * Connects the bundle picker to the buy form.
 *
 * Each tier is a radio carrying the variant id and quantity it represents, so
 * the selection is meaningful without JavaScript — the radios are inside the
 * form and submit correctly on their own. This only keeps a mirrored hidden
 * input and the summary price in sync for the sticky bar.
 */
class LandingOffer extends HTMLElement {
  connectedCallback() {
    this.form = this.dataset.form
      ? document.getElementById(this.dataset.form)
      : this.querySelector("form");
    this.onChange = (event) => {
      const tier = event.target.closest("[data-tier]");
      if (tier) this.select(tier);
    };

    this.addEventListener("change", this.onChange);

    const checked = this.querySelector("[data-tier] input:checked");
    if (checked) this.select(checked.closest("[data-tier]"));
  }

  disconnectedCallback() {
    this.removeEventListener("change", this.onChange);
  }

  select(tier) {
    const { variantId, quantity, total } = tier.dataset;

    this.querySelectorAll("[data-tier]").forEach((el) => {
      el.classList.toggle("is-selected", el === tier);
    });

    if (this.form) {
      const idInput = this.form.querySelector('input[name="id"], select[name="id"]');
      const quantityInput = this.form.querySelector('input[name="quantity"]');

      if (idInput && variantId) idInput.value = variantId;
      if (quantityInput && quantity) quantityInput.value = quantity;
    }

    document.querySelectorAll("[data-offer-total]").forEach((el) => {
      if (total) el.textContent = total;
    });
  }
}

/**
 * Steps a number input up and down.
 *
 * The input itself remains the source of truth so typing and native spinners
 * keep working.
 */
class QuantitySelector extends HTMLElement {
  connectedCallback() {
    this.input = this.querySelector('input[type="number"]');
    this.onClick = (event) => {
      const button = event.target.closest("button[data-step]");
      if (!button || !this.input) return;

      const step = Number(button.dataset.step);
      const min = Number(this.input.min || 1);
      const next = Math.max(min, Number(this.input.value || min) + step);

      this.input.value = next;
      this.input.dispatchEvent(new Event("change", { bubbles: true }));
    };

    this.addEventListener("click", this.onClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("landing-reveal", LandingReveal);
customElements.define("landing-sticky", LandingSticky);
customElements.define("landing-carousel", LandingCarousel);
customElements.define("landing-offer", LandingOffer);
customElements.define("quantity-selector", QuantitySelector);
