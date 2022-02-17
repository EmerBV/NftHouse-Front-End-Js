
import { NotificationController } from "../shared/notification/NotificationController.js";
import { NftCreateController } from "./NftCreateController.js";

document.addEventListener("DOMContentLoaded", () => {
  const createFormElement = document.querySelector("form");
  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(
    notificationElement
  );

  const nftCreateController = new NftCreateController(createFormElement);
  nftCreateController.loginvalidate();
});