/**
 * Steps
 */
Alpine.data("steps", () => ({
  currentStep: 1,
  totalSteps: 1,
  init () {
    this.totalSteps = this.$el.querySelectorAll("[data-form-step]").length;
    if (this.totalSteps) {
      this.currentStep = 1;
    }
  },
  setCurrentStep ({ currentTarget }) {
    const stepValue = +currentTarget.value;

    if (this.currentStep < this.totalSteps && !stepValue) {
      ++this.currentStep;
      this.$root.scrollIntoView({ block: "start" });
      return;
    }

    if (stepValue) {
      this.currentStep = stepValue;
      this.$root.scrollIntoView({ block: "start" });
      return;
    }

    this.currentStep = 1;
  },
  isFilled () {
    const formControls = this.$root.querySelectorAll(
      `[data-form-step="${this.$el.value}"] :is(input, select, textarea)`
    );
    const allFieldsAreFilled = [...formControls]?.every(
      control => control.value
    );
    return allFieldsAreFilled;
  }
}));
