import { signupService } from "../signup/SignupService.js";

export default {
  async getNfts() {
    const url = "http://localhost:8000/api/nfts";
    const badUrl =
      "https://hds.hel.fi/static/assets/placeholders/image/image-m@3x.png";

    let response;
    let nfts;

    try {
      response = await fetch(url);
    } catch (error) {
      throw new Error("No he podido ir a por los nfts");
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
      throw new Error("Tweet no encontrado");
    }
  },
  transformNfts(nfts) {
    return nfts.map((nft) => {
      const transformedNft = {
        id: nft.id || 0,
        name: nft.name || nft.body, // actualizable
        price: nft.price || nft.value ,
        category: nft.categoryId || 0,
        detail: nft.detailId || 0,
        userId: nft.userId || nft.handle,
        date: nft.updatedAt || nft.date,
        
        image:
          nft.image ||
          "https://lh3.googleusercontent.com/bP80vVhqvbQLUywOP-bGkh5mCsRWjzE7QNwjFgE4Bduxb5uhf0Q3dYdP7H3I_9LwcqBswUv4EKz5KJQPk317mLmzGazl64GFNFK6=w199",
      };

      return transformedNft;
    });
  },
  oldGetNfts() {
    const url =
      "https://gist.githubusercontent.com/edu-aguilar/8c9a509ec582d04da0640be2b0ede8d5/raw/f75c68645821f3c33d82d9c2c048215584d1d332/nfts.json";
    const badUrl =
      "https://hds.hel.fi/static/assets/placeholders/image/image-m@3x.png";

    return new Promise(function (resolve, reject) {
      fetch(url)
        .catch((error) => {
          console.log(error);
          reject("No he podido ir a por los nfts");
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
