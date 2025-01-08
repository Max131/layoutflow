/**
 * Menu trigger component
 */
Alpine.data('menu', () => ({
  isOpen: false,
  trigger: {
    '@click.stop'() {
      this.isOpen = !this.isOpen;
    }
  },
  target: {
    '@click.outside'() {
      this.isOpen = false;
    },
    ':class'() {
      return {
        'is-open': this.isOpen
      };
    }
  }
}));
