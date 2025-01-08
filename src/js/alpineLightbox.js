Alpine.data("lightbox", () => ({
  modal: null,
  init () {
    this.modal = this.$root.querySelector("dialog.lightbox-modal");
  },
  lightbox: {
    "@click" ({ target }) {
      if (target.matches(".lightbox-grid > img")) {
        const img = this.modal?.querySelector("img") || {};
        img.src = target.src;
        this.modal?.showModal();
        return;
      }

      if (target.matches(".lightbox-modal")) {
        this.modal?.close();
      }
    }
  }
}));
