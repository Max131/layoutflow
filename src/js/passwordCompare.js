/**
 * Password compare component
 */
Alpine.data('passwordsCompare', () => ({
  pass1: '',
  pass2: '',
  match: true,
  init() {
    this.$watch('pass1', () => this.checkMatch());
    this.$watch('pass2', () => this.checkMatch());
  },
  checkMatch() {
    this.match = this.pass1 === this.pass2;
    this.$dispatch('formvalidity', { validity: this.match });
  }
}));
