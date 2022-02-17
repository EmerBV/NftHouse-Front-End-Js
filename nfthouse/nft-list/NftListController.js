import { pubSub } from "../shared/pubSub.js";
import NftService from "./NftService.js";
import {
  buildNftView,
  buildNftListSpinnerView,
  buildNotFoundNftsView,
} from "./NftView.js";

export class NftListController {
  nftListElement = null;

  constructor(nftListElement, notificationController) {
    this.nftListElement = nftListElement;
    this.notificationController = notificationController;
  }

  async showNfts() {
    let nfts;
    const spinnerTemplate = buildNftListSpinnerView();

    this.nftListElement.innerHTML = spinnerTemplate;

    try {
      nfts = await NftService.getNfts();

      if (nfts.length === 0) {
        this.nftListElement.innerHTML = buildNotFoundNftsView();
      }

      for (const nft of nfts) {
        const nftArticleElement = document.createElement("article");
        const nftTemplate = buildNftView(nft);

        nftArticleElement.innerHTML = nftTemplate;

        this.nftListElement.appendChild(nftArticleElement);
      }
    } catch (error) {
      // informar de error
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        "Error obteniendo nfts"
      );
      // this.notificationController.show("Error obteniendo nfts");
    } finally {
      const loader = this.nftListElement.querySelector(".loader");
      loader.remove();
      // loader.classList.add("hidden");
    }
  }
}

async function oldNftListController(nftListElement) {
  let nfts;
  const spinnerTemplate = buildNftListSpinnerView();

  nftListElement.innerHTML = spinnerTemplate;

  try {
    nfts = await NftService.getNfts();

    for (const nft of nfts) {
      const nftArticleElement = document.createElement("article");
      const nftTemplate = buildNftView(nft);

      nftArticleElement.innerHTML = nftTemplate;

      nftListElement.appendChild(nftArticleElement);
    }
  } catch (error) {
    alert("Error obteniendo nfts");
  } finally {
    const loader = nftListElement.querySelector(".loader");
    loader.remove();
    // loader.classList.add("hidden");
  }
}

/* 
misiones de un controlador:

- orquestación o intermediario entre vista y modelo.
- definir y manejar eventos
- validar datos
- gestinar errores
- desacoplamiento entre capas(vista y modelo)
- un controlador debe ocuparse de gestionar un nodo DOM
  en cuanto a datos que debe pintar y eventos que suceden
*/
