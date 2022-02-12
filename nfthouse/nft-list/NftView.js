export function buildNftView(nft) {
  /* const currentTime = new Date(nft.date).toLocaleString(); */
  const nftDetailView = buildNftDetailView(nft);
  let nftTemplate = `
  <div class="nftWrapper">
  
    <a href="nftDetail.html?id=${nft.id}" class="">
      <div class="imgContainer">
          <img src="../public/img/${nft.image}" alt="" class="nftImg">
      </div>
      <div class="details">
          <div class="info">
              <div class="flex-0.6 flex-wrap">
                  <div class="collectionName">${nft.name}</div>
                  <div class="assetName">${nft.name} #${nft.id}</div>
              </div>
              <div class="flex-0.4 text-right">
                  <div class="priceTag"></div>
                  <div class="priceValue">
                      <img src="../assets/eth.png" alt="" class="cardEthLogo">${nft.price}
                  </div>
              </div>
          </div>
          <div class="likes">
              <span class="likeIcon">
                  <i class="far fa-heart"></i>
              </span>{''}
          </div>
      </div>
    </a>

  </div>`;

  return nftTemplate;
}

export function buildNftDetailView(nft) {
  const currentTime = new Date(nft.date).toLocaleString();

  let nftTemplate = `
    <a href="nftDetail.html?id=${nft.id}" class="">
      <div class="imgContainer">
          <img src="../public/img/${nft.image}" alt="" class="nftImg">
      </div>
      <div class="details">
          <div class="info">
              <div class="flex-0.6 flex-wrap">
                  <div class="collectionName">${nft.name}</div>
                  <div class="assetName">${nft.name} #${nft.id}</div>
              </div>
              <div class="flex-0.4 text-right">
                  <div class="priceTag"></div>
                  <div class="priceValue">
                      <img src="../assets/eth.png" alt="" class="cardEthLogo">${nft.price}
                  </div>
              </div>
          </div>
          <div class="likes">
              <span class="likeIcon">
                  <i class="far fa-heart"></i>
              </span>{''}
          </div>
      </div>
    </a>
  `;

  return nftTemplate;
}

export function buildNftListSpinnerView() {
  return `
  <div class="loader">
    <button type="button" class="bg-indigo-500 ..." disabled>
      <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
        <!-- ... -->
      </svg>
      Processing...
    </button>
  </div>
  `;
}

export function buildNotFoundNftsView() {
  return `
    <h1>Ooops!!! no hay ningún nft!!! =(</h1>
  `;
}
