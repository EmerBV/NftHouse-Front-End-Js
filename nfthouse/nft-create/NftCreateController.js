import { createNftService } from "./CreateNftService.js";
import { pubSub } from "../shared/pubSub.js";
import { signupService } from "../signup/SignupService.js";
import { decodeToken } from "../utils/decodeToken.js";

export class NftCreateController {
  constructor(createFormElement) {
    this.createFormElement = createFormElement;
    this.attachEvents();
  }

  attachEvents() {
    this.onAnyInputChange();
    this.onSubmitCreateForm();
  }

  onAnyInputChange() {
    const inputElements = Array.from(
      this.createFormElement.querySelectorAll("input:required")
    );

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        const areInputsFilled = inputElements.every(
          (inputElement) => inputElement.value
        );

        if (areInputsFilled) {
          this.createFormElement
            .querySelector("button")
            .removeAttribute("disabled");
        } else {
          this.createFormElement
            .querySelector("button")
            .setAttribute("disabled", "");
        }
      });
    });
  }

  onSubmitCreateForm() {
    this.createFormElement.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(this.createFormElement);

      const image = formData.get("image");
      const name = formData.get("name");
      const category = formData.get("category");
      const price = formData.get("price");
      const detail = formData.get("detail");

      this.addNft(image, name, category, price, detail);
    });
  }

  async addNft(image, name, category, price, detail) {

    try {
      await createNftService.createNft(image, name, category, price, detail);
      window.location.href = "/";
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }

  loginvalidate() {
    const loggedUserToken = signupService.getLoggedUser();

    if (!loggedUserToken) {

      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, "Debe hacer login para crear usuarios");
      this.drawBackButton();
    } else{
      const inputElements = Array.from(
        this.createFormElement.querySelectorAll("input")
      );
      // En caso de hacer login se habilitan los inputs
      this.inputsEnabled (inputElements);
    }     
    
  }
  inputsEnabled (inputElements) {
    inputElements.forEach((inputElement) => {
      inputElement.removeAttribute("disabled");

    });
  }

  drawBackButton() {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = "volver";

    this.createFormElement.appendChild(buttonElement);

    this.createFormElement.addEventListener("click", () => {
      window.location.href = "/index.html";
    });
  }
}
