/**
 * Input File
 */
Alpine.data("inputfileMultiple", () => ({
  files: [],
  addFiles (files) {
    for (const file of files) {
      if (!this.files.some(fileInFiles => fileInFiles.name === file.name)) {
        this.files.push(file);
      }
    }
    this.updateFiles();
  },
  removeFile (index) {
    this.files.splice(index, 1);
    this.updateFiles();
  },
  updateFiles () {
    const dataTransfer = new DataTransfer();
    this.files.forEach(file => {
      dataTransfer.items.add(file);
    });
    this.$refs.fileInput.files = dataTransfer.files;
    console.log(this.$refs.fileInput.files);
  },
  getFileSize (bytes) {
    const kb = bytes / 1024;
    const size = kb < 1024 ? `${kb.toFixed(2)}kb` : `${(kb / 1024).toFixed(2)}mb`;

    return size;
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
      this.addFiles(target.files);
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
