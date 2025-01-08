await import("https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js").then(() => {
  Alpine.data("editor", ({ placeholder = "Escribe aquí...", content = "" }) => ({
    editor: null,
    hiddenField: null,
    content,
    script: null,
    init () {
      const QUILL_STYLES = "https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css";
      this.hiddenField = this.$el.querySelector("textarea[hidden]");
      const linkTag = document.createElement("LINK");
      linkTag.setAttribute("rel", "stylesheet");
      linkTag.href = QUILL_STYLES;
      document.head.insertAdjacentElement("afterbegin", linkTag);

      this.initQuill();
    },
    initQuill () {
      const editorElement = this.$root.querySelector(".editor");
      this.editor = new Quill(editorElement, {
        theme: "snow",
        placeholder,
        modules: {
          toolbar: [
            [{ "header": [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ "list": "ordered" }, { "list": "bullet" }],
            ["link"]
          ]
        }
      });
      this.editor.root.innerHTML = content;
      this.editor.on("text-change", () => {
        this.content = this.editor.root.innerHTML;
      })
    }
  }));

});
