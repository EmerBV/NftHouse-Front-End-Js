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
                    <div class="assetName">${nft.name} # ${nft.id}</div>
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
                    <i class="far fa-heart"> 2</i>
                </span>
            </div>
        </div>
      </a>

    </div>
    `;

  return nftTemplate;
}

export function buildNftDetailView(nft) {
  const currentTime = new Date(nft.date).toLocaleString();

  let nftTemplate = `
  
    
  <div class="detailTopContent">
    <div class="detailImgContainer">
      <div>
        <div class="topBar">
          <div class="topBarContent">
            <i class="fas fa-snowflake"></i>
            <div class="likesCounter">
                <i class="far fa-heart"> 2.3K</i>
            </div>
          </div>
        </div>
        <div class="flex items-center">
            <img src="../public/img/${nft.image}" alt="" class="rounded-b-lg border-[#151c22] border">
        </div>
      </div>
    </div>
    <div class="detailsContainer">
      <div class="generalWrapper">
        <div class="generalInfoContainer">
          <div class="accent">Team ${nft.name}</div>
          <div class="generalNftTitle">${nft.name} # ${nft.id}</div>
          <div class="otherInfo">
          <div class="ownedBy">
              Owned by <span class="accent">#${nft.userId}</span>
          </div>
          <div class="generalLikes">
              <i class="fas fa-heart generalLikeIcon"> 2.3K favorites</i>
          </div>
          </div>
        </div>
        <div class="actionButtonsContainer">
          <div class="generalActionButtons">
          <div class="generalActionButton">
              <i class="fas fa-redo"></i>
          </div>
          <div class="generalDivider"></div>
          <div class="generalActionButton">
              <i class="fas fa-external-link-alt"></i>
          </div>
          <div class="generalDivider"></div>
          <div class="generalActionButton">
              <i class="fas fa-share-alt"></i>
          </div>
          <div class="generalDivider"></div>
          <div class="generalActionButton">
              <i class="fas fa-ellipsis-v"></i>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="">
    <div class="activityWrapper">
      <div class="activityTitle">
        <div class="activityTitleLeft">
          <span class="activityTitleIcon">
            <i class="fas fa-sort-alt"></i>
          </span>
          Item Activity
        </div>
        <div class="activityTitleRight">
          <i class="fas fa-angle-down"></i>
        </div>
      </div>
      <div class="activityTable">
        <div class="activityFilter">
          <div class="filterTitle">Filter</div>
          <div class="activityTitleIcon">
            <i class="fas fa-angle-down"></i>
          </div>
        </div>
        <div class="tableHeader">
          <div class="tableHeaderElement flex-[2]">Event</div>
          <div class="tableHeaderElement flex-[2]">Price</div>
          <div class="tableHeaderElement flex-[3]">From</div>
          <div class="tableHeaderElement flex-[3]">To</div>
          <div class="tableHeaderElement flex-[2]">Date</div>
        </div>
        <div class="">
          <div class="eventItem">
            <div class="event flex-[2]">
              <div class="eventIcon">
                <i class="fas fa-shopping-cart"></i>
              </div>
              <div class="eventName">Sale</div>
            </div>
            <div class="eventPrice flex-[3]">
              <img src="../assets/eth.png" alt="eth" class="eventEthLogo"/>
              <div class="eventPriceValue">${nft.price}</div>
            </div>
            <div class="accent flex-[3]">{event.from}</div>
            <div class="accent flex-[3]">{event.to}</div>
            <div class="accent flex-[2]">${currentTime}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
    
  
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
