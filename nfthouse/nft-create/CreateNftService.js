import { signupService } from "../signup/SignupService.js";

class CreateNftService {
  constructor() {
  }

  async createNft(image, name, category, price, detail) {
    const url = `http://localhost:8000/api/nfts`;
    let response;
    const nft = this.getNftObj(image, name, category, price, detail);

    try {
      response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(nft),
        headers: {
          Authorization: "Bearer " + signupService.getLoggedUser(),
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      throw new Error("No he podido guardar el Nft"); 
    }

    if (!response.ok) {
        throw new Error("Error mientras se guardaba el Nft"); 
    }
  }

  getNftObj(image, name, category, price, detail) {
    const nftObj = {
      image,
      name,
      category,
      price,
      detail,
    };
    return nftObj;
  }

}

export const createNftService = new CreateNftService();