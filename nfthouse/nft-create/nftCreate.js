
import { NotificationController } from "../shared/notification/NotificationController.js";
import { NftCreateController } from "./NftCreateController.js";

document.addEventListener("DOMContentLoaded", () => {
    const createFormElement = document.querySelector("#nftCreate");
    const notificationElement = document.querySelector(".notification");

    const notificationController = new NotificationController(
        notificationElement
      );

      const productCreateController = new NftCreateController(createFormElement);
      productCreateController.loginvalidate();
});