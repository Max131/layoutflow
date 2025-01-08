/**
 * Input password reveal component
 */
Alpine.data('inputPassword', () => ({
  showPassword: false,
  toggle: {
    '@click'() {
      this.showPassword = !this.showPassword;
    }
  }
}));
