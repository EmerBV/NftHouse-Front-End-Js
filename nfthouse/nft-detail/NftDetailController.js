import { pubSub } from "../shared/pubSub.js";
import { signupService } from "../signup/SignupService.js";
import NftService from "../nft-List/NftService.js";
import { buildNftDetailView } from "../nft-list/NftView.js";
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
        "Invalid Nft Id"
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
      const isOwner = this.isNftOwner(userInfo.userId);
      console.log(isOwner);

      // pintamos botón
      if (isOwner) {
        this.drawDeleteButton();
      }
    }
  }

  isNftOwner(userId) {
    return userId === this.nft.userId;
  }

  drawDeleteButton() {
    const buttonElement = document.createElement("button");
    /* buttonElement.textContent = "Delete Nft"; */
    buttonElement.innerHTML = `
      <button class="border border-[#282b2f] bg-[#2081e2] p-[0.3rem] my-4 text-xl font-semibold rounded-lg cursor-pointer text-black w-[250px] hover:bg-indigo-400 transition ease-in-out duration-150" type="submit">Delete Nft</button>
    `;

    this.nftDetailElement.appendChild(buttonElement);

    this.nftDetailElement.addEventListener("click", () => {
      this.deleteNft();
    });
  }

  async deleteNft() {
    const shouldDelete = window.confirm("Are you sure to delete the Nft?");

    if (shouldDelete) {
      try {
        await NftService.deleteNft(this.nft.id);
        window.location.href = "../public/collections.html";
      } catch (error) {
        // utilizamos pubsub
      }
    }
  }
}
