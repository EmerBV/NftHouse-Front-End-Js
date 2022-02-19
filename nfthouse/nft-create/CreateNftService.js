import { signupService } from '../signup/SignupService.js'

class CreateNftService {
  
    async createNft(image, name, category, price, detail, id, username) {
        const url = 'http://localhost:8000/api/nfts'
        const nft = this.getNftObj(image, name, category, price, detail, id, username)

        let response

        try {
            response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(nft),
                headers: {
                    Authorization: 'Bearer ' + signupService.getLoggedUser(),
                    'Content-Type': 'application/json',
                },
            })
        } catch (error) {
            throw new Error('Could not save the Nft') 
        }

        if (!response.ok) {
            throw new Error('Error while saving Nft') 
        }
    }

    getNftObj(image, name, category, price, detail, id, username) {
        const nftObj = {
            image,
            name,
            category,
            price,
            detail,
            id,
            username
        }
        return nftObj
    }

}

export const createNftService = new CreateNftService()