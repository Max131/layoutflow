/**
 * Modal
 */
Alpine.data('modals', () => ({
  openModal({ currentTarget: { dataset } }) {
    const { modalTarget } = dataset;
    const modal = document.querySelector(`[data-modal-name="${modalTarget}"]`);
    modal.showModal();
  },
  modalClose: {
    '@click'() {
      const modal = this.$el.closest('dialog.modal');
      modal?.close();
    }
  }
}));
