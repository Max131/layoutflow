/**
 * Social media handler component
 */
Alpine.data("socialMedia", (networks = []) => ({
  value: "",
  error: false,
  networks: [],
  init () {
    networks.forEach(net => {
      try {
        const url = new URL(net);
        this.networks.push(url);
      } catch {
        console.warn(`${net} is not a valid URL`);
      }
    });
  },
  add () {
    if (this.value.trim() === "") return;

    try {
      const url = new URL(this.value);
      this.networks.push(url);
      this.value = "";
      this.error = false;
    } catch {
      this.error = true;
    }
  },
  remove (index) {
    this.networks.splice(index, 1);
  }
}));
