Alpine.data("checkboxGroup", (values = []) => ({
  values,
  init () {
    if(Array.isArray(values)) {
      this.values = values;
      return;
    }

    this.values = values.split(",");
  },
  inputValues: {
    ":value" () {
      return this.values.join();
    }
  }
}));
