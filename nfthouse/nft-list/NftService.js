import { signupService } from "../signup/SignupService.js";

export default {
  async getNfts() {
    const url = "http://localhost:8000/api/nfts";
    const badUrl = "https://hds.hel.fi/static/assets/placeholders/image/image-m@3x.png";

    let response;
    let nfts;

    try {
      response = await fetch(url);
    } catch (error) {
      throw new Error("No he podido ir a por los Nfts");
    }

    if (!response.ok) {
      throw new Error("Nfts no encontrados");
    }

    try {
      nfts = await response.json();
    } catch (error) {
      throw new Error("No he podido transformar la respuesta a json");
    }

    const transformedNfts = this.transformNfts(nfts);

    return transformedNfts;
  },
  async getNft(nftId) {
    const url = `http://localhost:8000/api/nfts/${nftId}`;

    let response;
    let nft;

    try {
      response = await fetch(url);
    } catch (error) {
      throw new Error("No he podido ir a por el nft");
    }

    if (!response.ok) {
      throw new Error("Nft no encontrado");
    }

    try {
      nft = await response.json();
    } catch (error) {
      throw new Error("No he podido transformar la respuesta a json");
    }

    const transformedNft = this.transformNfts([nft]);

    return transformedNft[0];
  },
  async deleteNft(nftId) {
    const url = `http://localhost:8000/api/nfts/${nftId}`;

    let response;

    try {
      response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + signupService.getLoggedUser(),
        },
      });
    } catch (error) {
      throw new Error("No he podido borrar el nft");
    }

    if (!response.ok) {
      throw new Error("Nft no encontrado");
    }
  },
  transformNfts(nfts) {
    return nfts.map((nft) => {
      const transformedNft = {
        id: nft.id || 0,
        name: nft.name || nft.body, // actualizable
        price: nft.price || nft.value,
        category: nft.categoryId || 0,
        detail: nft.detail || nft.detailId,
        userId: nft.userId || nft.handle,
        likes: nft.likes || 0,
        date: nft.updatedAt || nft.date,
        username: nft.username || nft.handle,
        
        image:
          nft.image ||
          "https://lh3.googleusercontent.com/bP80vVhqvbQLUywOP-bGkh5mCsRWjzE7QNwjFgE4Bduxb5uhf0Q3dYdP7H3I_9LwcqBswUv4EKz5KJQPk317mLmzGazl64GFNFK6=w199",
      };

      return transformedNft;
    });
  },
  oldGetNfts() {
    const url = "../db.json";
    const badUrl = "https://hds.hel.fi/static/assets/placeholders/image/image-m@3x.png";

    return new Promise(function (resolve, reject) {
      fetch(url)
        .catch((error) => {
          console.log(error);
          reject("No he podido ir a por los Nfts");
        })
        .then((responseHttp) => {
          console.log(responseHttp);
          return responseHttp.json();
        })
        .catch((error) => {
          console.log(error);
          reject("No he podido transformar la respuesta a json");
        })
        .then((data) => {
          resolve(data);
        });
    });
  },
};

/*

responsabilidad del modelo:

- abstraer al controlador y a la vista de la procedencia de los datos.

*/
