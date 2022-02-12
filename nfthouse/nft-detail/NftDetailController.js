import { pubSub } from "../shared/pubSub.js";
import { signupService } from "../signup/SignupService.js";
import NftService from "../nftList/NftService.js";
import { buildNftDetailView } from "../nftList/TweetView.js";
import { decodeToken } from "../utils/decodeToken.js";

export class NftDetailController {
  constructor(nftDetailElement) {
    this.nftDetailElement = nftDetailElement;
    this.nft = null;
  }

  async showNft(nftId) {
    if (!nftId) {
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        "Id del nft no válido"
      );

      return;
    }

    try {
      this.nft = await NftService.getNft(nftId);
      const nftTemplate = buildNftDetailView(this.nft);
      this.nftDetailElement.innerHTML = nftTemplate;

      this.handleDeleteButton();
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }

  handleDeleteButton() {
    const loggedUserToken = signupService.getLoggedUser();

    if (loggedUserToken) {
      // decodificamos token
      const userInfo = decodeToken(loggedUserToken);

      // comprobamos si el id de usuario logado es el mismo que el id del creador del nft
      const isOwner = this.isTweetOwner(userInfo.userId);
      console.log(isOwner);

      // pintamos botón
      if (isOwner) {
        this.drawDeleteButton();
      }
    }
  }

  isTweetOwner(userId) {
    return userId === this.nft.userId;
  }

  drawDeleteButton() {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Borrar Tweet";

    this.nftDetailElement.appendChild(buttonElement);

    this.nftDetailElement.addEventListener("click", () => {
      this.deleteNft();
    });
  }

  async deleteNft() {
    const shouldDelete = window.confirm("Estás seguro de borrar el nft?");

    if (shouldDelete) {
      try {
        await NftService.deleteNft(this.nft.id);
        window.location.href = "/";
      } catch (error) {
        // utilizamos pubsub
      }
    }
  }
}
