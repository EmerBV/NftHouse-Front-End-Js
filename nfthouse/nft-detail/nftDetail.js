import { NftDetailController } from "../nft-Detail/NftDetailController.js";
import { NotificationController } from "../shared/notification/NotificationController.js";

document.addEventListener("DOMContentLoaded", () => {
  const nftDetailElement = document.querySelector("#nftDetail");

  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(
    notificationElement
  );

  const searchParams = new URLSearchParams(window.location.search);

  const nftId = searchParams.get("id");

  const nftDetailController = new NftDetailController(nftDetailElement);
  nftDetailController.showNft(nftId);
});
