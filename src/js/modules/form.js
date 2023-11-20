export default class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll("input");
    this.message = {
      loading: "Загрузка...",
      success: "Спасибо! Скоро с вами свяжемся",
      failure: "Что-то пошло не так...",
    };
    this.path = "http://localhost:3000/api/data";
  }

  clearInputs() {
    this.inputs.forEach((input) => {
      input.value = "";
    });
  }

  checkMailInputs() {
    const mailInputs = document.querySelectorAll('[type="email"]');

    mailInputs.forEach((input) => {
      input.addEventListener("keypress", (e) => {
        if (e.key.match(/[^a-z 0-9 @ \.]/gi)) {
          e.preventDefault();
        }
      });
    });
  }

  initMask() {
    const setCursorPosition = (pos, elem) => {
      elem.focus();

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      }
    };
    const createMask = (event) => {
      const eventTarget = event.target;
      const matrix = "+1 (___) ___-____";
      let i = 0;
      let def = matrix.replace(/\D/g, "");
      let val = eventTarget.value.replace(/\D/g, "");

      if (def.length >= val.length) {
        val = def;
      }

      eventTarget.value = matrix.replace(/./g, (a) => {
        return /[_\d]/.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
          ? ""
          : a;
      });

      if (event.type === "blur") {
        if (eventTarget.value.length == 2) {
          eventTarget.value = "";
        }
      } else {
        setCursorPosition(eventTarget.value.length, eventTarget);
      }
    };

    const inputs = document.querySelectorAll('[name="phone"]');

    inputs.forEach((input) => {
      input.addEventListener("input", createMask);
      input.addEventListener("focus", createMask);
      input.addEventListener("blur", createMask);
    });
  }

  async postData(url, data) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await res.text();
  }

  init() {
    this.checkMailInputs();
    this.initMask();
    this.forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const statusMessage = document.createElement("div");
        statusMessage.style.cssText = `
          margin-top:15px;
          font-size: 18px;
          color:grey;
        `;
        form.parentNode.appendChild(statusMessage);

        statusMessage.textContent = this.message.loading;

        const formData = new FormData(form);

        const data = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });

        this.postData(this.path, data)
          .then((res) => {
            console.log(res);
            statusMessage.textContent = this.message.success;
          })
          .catch(() => {
            statusMessage.textContent = this.message.failure;
          })
          .finally(() => {
            this.clearInputs();
            setTimeout(() => {
              statusMessage.remove();
            }, 6000);
          });
      });
    });
  }
}
