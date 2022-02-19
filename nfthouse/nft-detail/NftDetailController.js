import { pubSub } from '../shared/pubSub.js'
import { signupService } from '../signup/SignupService.js'
import NftService from '../nft-List/NftService.js'
import { buildNftDetailView } from '../nft-list/NftView.js'
import { decodeToken } from '../utils/decodeToken.js'

export class NftDetailController {
    constructor(nftDetailElement) {
        this.nftDetailElement = nftDetailElement
        this.nft = null
    }

    async showNft(nftId) {
        if (!nftId) {
            pubSub.publish(
                pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
                'Invalid Nft Id'
            )

            return
        }

        try {
            this.nft = await NftService.getNft(nftId)
            const nftTemplate = buildNftDetailView(this.nft)
            this.nftDetailElement.innerHTML = nftTemplate

            this.handleDeleteButton()
        } catch (error) {
            pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error)
        }
    }

    handleDeleteButton() {
        const loggedUserToken = signupService.getLoggedUser()

        if (loggedUserToken) {

            const userInfo = decodeToken(loggedUserToken)
            const isOwner = this.isNftOwner(userInfo.userId)
            console.log(isOwner)

            if (isOwner) {
                this.drawDeleteButton()
            }
        }
    }

    isNftOwner(userId) {
        return userId === this.nft.userId
    }

    drawDeleteButton() {
        const buttonElement = document.createElement('button')
        buttonElement.innerHTML = `
      <button class="border border-[#282b2f] bg-[#2081e2] hover:bg-[#42a0ff] p-[0.3rem] my-4 text-xl font-semibold rounded-lg w-[250px] transition ease-in-out duration-150 cursor-pointer text-white" type="submit">Delete Nft</button>
    `

        this.nftDetailElement.appendChild(buttonElement)

        this.nftDetailElement.addEventListener('click', () => {
            this.deleteNft()
        })
    }

    async deleteNft() {
        const shouldDelete = window.confirm('Are you sure to delete the Nft?')

        if (shouldDelete) {
            try {
                await NftService.deleteNft(this.nft.id)
                window.location.href = '../collections.html'
            // eslint-disable-next-line no-empty
            } catch (error) {

            }
        }
    }
}
