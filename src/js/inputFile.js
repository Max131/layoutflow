/**
 * Input File
 */
Alpine.data("inputfile", () => ({
  filename: "Click para seleccionar un archivo",
  hasFile: false,
  getFileSize (bytes) {
    const kb = bytes / 1024;
    const size = kb < 1024 ? `${kb.toFixed(2)}kb` : `${(kb / 1024).toFixed(2)}mb`;

    return size;
  },
  get getFile () {
    return this.hasFile ? this.$refs.fileInput.files[0] : null;
  },
  label: {
    "@keydown" ({ code }) {
      const KEY_KEYS = ["Space", "Enter", "NumpadEnter"];

      if (KEY_KEYS.includes(code)) {
        this.$refs.fileInput.click();
      }
    },
  },
  filefield: {
    "x-ref": "fileInput",
    "@input" ({ target }) {
      this.filename = `${target.files[0].name} (${this.getFileSize(target.files[0].size)})`;
      this.hasFile = true;
    }
  },
  deleteFile: {
    "x-show" () {
      return this.hasFile;
    },
    "@click" () {
      this.filename = "Click para seleccionar un archivo";
      this.$refs.fileInput.value = "";
      this.hasFile = false;
    },
    "@keydown.stop" () { }
  }
}));
