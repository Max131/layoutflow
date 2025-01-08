import Alpine from "./alpine.esm.min.js";

window.Alpine = Alpine;

await import("./alpineMenu.js");
await import("./alpineForm.js");
await import("./inputPassword.js");
await import("./inputFile.js");
await import("./inputFileMultiple.js");
await import("./passwordCompare.js");
await import("./socialMediaField.js");
await import("./alpineSteps.js");
await import("./alpineModal.js");
await import("./alpineEditor.js");
await import("./alpineCheckboxGroup.js");
await import("./alpineLightbox.js");

Alpine.data("imagePreview", (image = null) => ({
  image,
  imagePreview: null,
  init () {

    this.$watch("image", img => {
      if (img) {
        const reader = new FileReader();
        reader.readAsDataURL(img);

        reader.addEventListener("load", async ({ target: { result } }) => {
          this.imagePreview = result;
        });

        return;
      }

      this.imagePreview = null;
    });

  }
}));
Alpine.start();
