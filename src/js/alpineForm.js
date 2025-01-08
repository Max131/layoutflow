/**
 * Form component to handle all forms
 */
Alpine.data("form", ({ actionURL = "", fillURL = "" }) => ({
  allInputs: [],
  validForm: false,
  isLoading: false,
  message: "",
  messageType: "",
  async init () {
    this.allInputs = [...document.querySelectorAll("textarea, input[type='text'], input[type='file']")];

    if (!fillURL) return;
    const ERROR_CODES = [400, 401, 403, 404, 500];

    const fields = this.$el.querySelectorAll(
      "form [name]:not([type='hidden'])"
    );
    const queryID = this.$el.querySelector("form [name='id']").value;

    try {
      const fetchURL = `${fillURL}/${queryID}`;

      if (!queryID) return;

      this.isLoading = true;

      const response = await fetch(fetchURL);
      const data = await response.json();

      if (ERROR_CODES.includes(data?.status)) {
        throw new Error({
          status: data.status || 500,
          statusText: data.message || "Error desconocido"
        });
      }

      fields.forEach(field => {
        const fieldName = field.name;
        if (Object.hasOwn(data.acf, fieldName)) {
          field.value = data.acf[fieldName];
        }
      });
    } catch (err) {
      const { status, statusText } = err;
      this.message = `Error ${status}: ${statusText}`;
      this.messageType = "is-error";
    } finally {
      this.isLoading = false;
      this.validForm = false;
      this.$el.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  },
  setDraft () {
    const modal = this.$el.closest("dialog.modal");

    this.$refs.draft.value = this.$el.value;
    this.sendForm();

    modal?.close();
  },
  async sendForm () {
    if (!actionURL) return;

    const formData = new FormData(this.$root);
    console.log(formData);

    // Manejo especial para inputs file múltiples
    this.$root.querySelectorAll("input[type=\"file\"][multiple]").forEach(input => {
      const files = input.files;
      if (files.length > 0) {
        formData.delete(input.name);
        for (let i = 0; i < files.length; i++) {
          formData.append(`${input.name}[${i}]`, files[i]);
        }
      }
    });

    const showDraftSaved = +formData.get("draft");
    const successModal = this.$root.querySelector(
      `[data-modal-name=${showDraftSaved ? "modal-draft-saved" : "modal-sended"}]`
    );

    try {
      this.isLoading = true;
      this.message = "";
      const response = await fetch(actionURL, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const { data } = await response.json();
        throw data;
      }

      const data = await response.json();
      const { mensaje, url } = JSON.parse(data);
      this.message = mensaje || "";
      this.messageType = "is-success";

      successModal?.showModal();

      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      const { status = 500, statusText = "Error desconocido" } = err;
      console.log({ status, statusText });
      this.message = `Error ${status}: ${statusText}`;
      this.messageType = "is-error";
    } finally {
      this.isLoading = false;
      this.validForm = false;
      document.body.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  },
  form: {
    style: "scroll-margin-top: 2rem",
    "@input" () {
      this.validForm = this.allInputs.every(input => input.value);
    },
    "@formvalidity" ({ detail }) {
      this.validForm = this.validForm && detail.validity;
    },
    "@submit.prevent" () { }
  }
}));
