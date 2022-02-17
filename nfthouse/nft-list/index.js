import { NotificationController } from "../shared/notification/NotificationController.js";
import { NftListController } from "./NftListController.js";

document.addEventListener("DOMContentLoaded", async () => {
  const nftListElement = document.querySelector("#nftList");
  // nftListController(nftListElement);

  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(
    notificationElement
  );

  const nftListController = new NftListController(nftListElement);
  await nftListController.showNfts();
});
