// **6. 사용자 프로필 페이지**

// - 사용자 정보 하단에는 팔로우 버튼이 있습니다. 팔로우 버튼을 클릭하면 언팔로우 버튼으로 바뀌어야 합니다. 단, 팔로우 기능은 구현하지 않습니다. 버튼의 변화만 구현하세요.
const btnFollowUnfollow = document.querySelector('#btn-profile_view_follow');

btnFollowUnfollow.addEventListener('click', () => {
  if (btnFollowUnfollow.classList.contains('activ')){
    btnFollowUnfollow.classList.remove('activ');
    btnFollowUnfollow.textContent="팔로우";
  }
  else{
    btnFollowUnfollow.classList.add('activ');
    btnFollowUnfollow.textContent="언팔로우";
  }
});

// - 판매 중인 상품 섹션은 등록한 상품이 없을 경우에는 표시되지 않습니다.
const products = document.querySelectorAll('.product');
const listSelling = document.querySelector('.wrap-items');
// if (products.length == 0){
//   listSelling.style.display = "none";
// }

// - 게시글 섹션에서는 목록형과 앨범형으로 게시글들을 확인할 수 있습니다. 기본형은 목록형이며, 이미지가 없는 게시글을 경우에는 앨범형에서는 표시되지 않습니다.
const btnViewList = document.querySelector('#toggle-list');
const btnViewAlbum = document.querySelector('#toggle-album');
const viewList = document.querySelector('.list-post')
const viewAlbum = document.querySelector('.grid-post')

btnViewList.addEventListener('click', () => {
  if (btnViewList.firstChild.classList.contains('off-view')) {
    btnViewList.firstChild.classList.remove('off-view')
    btnViewList.firstChild.classList.add('on-view')
    btnViewList.lastChild.classList.remove('on-view')
    btnViewList.lastChild.classList.add('off-view')

    btnViewAlbum.firstChild.classList.remove('on-view')
    btnViewAlbum.firstChild.classList.add('off-view')
    btnViewAlbum.lastChild.classList.remove('off-view')
    btnViewAlbum.lastChild.classList.add('on-view')

    viewList.style.display = "block";
    viewAlbum.style.display = "none";
  }
})

btnViewAlbum.addEventListener('click', () => {
  if (btnViewAlbum.firstChild.classList.contains('off-view')) {
    btnViewAlbum.firstChild.classList.remove('off-view')
    btnViewAlbum.firstChild.classList.add('on-view')
    btnViewAlbum.lastChild.classList.remove('on-view')
    btnViewAlbum.lastChild.classList.add('off-view')

    btnViewList.firstChild.classList.remove('on-view')
    btnViewList.firstChild.classList.add('off-view')
    btnViewList.lastChild.classList.remove('off-view')
    btnViewList.lastChild.classList.add('on-view')

    viewAlbum.style.display = "grid";
    viewList.style.display = "none";
  }

})

// - 또한 사용자가 올린 게시글이 없을 경우에는 게시글이 나타나지 않습니다.
const itemPost = document.querySelectorAll('.home-post');
const feed = document.querySelector('.feed');
if (itemPost.length == 0){
  feed.style.display = "none";
}


// - 나의 프로필 페이지일 경우
//     - 프로필 수정 버튼과 상품 등록 버튼이 표시됩니다.
//     - 판매 중인 상품을 클릭하면 하단에 상품 삭제, 수정, 웹사이트에서 상품 보기 버튼이 포함된 메뉴가 나타납니다. 

// (단, 나의 프로필 페이지가 아닐 경우 상품을 클릭하면 바로 상품 판매 사이트로 이동됩니다.)

let isMyprofile = false;
const accountName = localStorage.getItem("AccountName")
const token = localStorage.getItem("Token")
getProfile(accountName)

products.forEach(product => product.addEventListener('click', () => {
  if (isMyprofile == true){
    productModal.classList.toggle('open');
    if (productModal.classList.contains('open')) {
      productModal.style.bottom = '-52px';
    }
    else {
      productModal.style.bottom = '-240px';
    }
  }
  else {
    location.href="#";
  }
}))

const btnRemove = document.querySelector('.btn-remove')
// const btnEdit = document.querySelector('.btn-edit')
const viewModal = document.querySelector('.modal-alert')
const msgConfirm = document.querySelector('.msg-confirm')
// const btnCancel = document.querySelector('.btn-cancel')
// const btnRemovePost = document.querySelector('.btn-remove_post')

// btnRemove.addEventListener('click', () => {
//   productModal.style.bottom = '-240px';
//   viewModal.style.display = 'block';
// })

// btnEdit.addEventListener('click', () => {
//   productModal.style.bottom = '-240px';
//   viewModal.style.display = 'block';
//   msgConfirm.textContent = '게시글을 삭제할까요?';
// })

// btnCancel.addEventListener('click', () => {
//   viewModal.style.display = "none";
// })

// btnRemovePost.addEventListener('click', () => {
//   viewModal.style.display = "none";
//   msgConfirm.textContent = '상품을 삭제할까요?';
// })

// API

async function getProfile(accountName) {  
  const url = API_URL + `/profile/${accountName}`;
  if(!accountName){
    return
  }
  try {
    const res = await fetch(url,{
    method:"GET",
    headers:{
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
      }
    })
    const json = await res.json()
    const profile = json.profile
    if (accountName == profile.accountname) {
      isMyprofile = true;
    }
    let followerCount  = profile.followerCount?json.profile.followerCount:0
    let followingCount = profile.followingCount?json.profile.followingCount:0
    let name = profile.username;
    let desc = profile.intro;
    let img = profile.image;

    const userImage = document.querySelector('#img-profile')
    const followers = document.querySelector('.number-follower')
    const followings = document.querySelector('.number-following')
    const userName = document.querySelector('.name-user')
    const userId = document.querySelector('.id-user')
    const descUser = document.querySelector('.desc-user')

    userImage.src = img;
    followers.textContent = followerCount
    followings.textContent = followingCount
    userName.textContent = name;
    userId.textContent = `@ ${accountName}`;
    descUser.textContent = desc;
    await getProductList(accountName);
    await getPost(accountName, img);

}
catch(err){
  isMyprofile = false;
}

  const myprofile = document.querySelector('.my_profile') 
  const otherprofile = document.querySelector('.other_profile') 
  if (isMyprofile == true) {
    myprofile.style.display = "none";
    otherprofile.style.display = "block"
  }

  else {
    myprofile.style.display = "flex";
    otherprofile.style.display = "none"
  }

}

async function getProductList(accountName) {
  const url = API_URL + `/product/${accountName}`;
  const res = await fetch(url, {
    method: 'GET',
    headers:{
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
      }
  })
  const json = await res.json();
  if (json.data == 0){
    listSelling.style.display = "none";
    return
  }
  
  let price = json.product[0].price.toLocaleString();
  const slider = document.querySelector('.slider')
  for (let product of json.product){
    let item = document.createElement('button')
    item.classList.add('product')
    item.innerHTML = `<h5 class="txt-hide">상품 썸네일</h5>
    <img src=${product.itemImage} alt="상품 이미지" class="img-product">
    <p class="tit-product">${product.itemName}</p>
    <p class="price-product">${price}원</p>`
    slider.appendChild(item)
  }
}

async function getPost(accountName, authorimg) {
  const url = API_URL + `/post/${accountName}/userpost`

  const res = await fetch(url, {
    method: "GET",
    headers:{
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
      }
  })

  const json = await res.json()

  if (json.post == []){
    feed.style.display = "none";
    return
  }

  let idx = 0;
  for(let post of json.post){
    const imageArr = post.image.split(',')
    let images = ''
    for (let image of imageArr){
      images += `<img src=${image} alt="피드 이미지" class="img-feed">`
    }
    if (imageArr[1]){
      images = `<div class="wrap-images" id="wrap-images${idx}">${images}</div><button type="button" class="btn-left" id="btn-left${idx}">⬅️</button><button type="button" class="btn-right" id="btn-right${idx}">➡️</button>`;
      idx++;
    }
    let list = document.createElement('article')
    let grid = document.createElement('a')
    list.classList = 'home-post'
    let date = post.createdAt.slice(0, 10).split('-')
    if (post.image){
      grid.classList = 'cont-grid'
      grid.innerHTML = `<img src=${imageArr[0]} alt="피드 이미지">`
      if (!imageArr[1]) {
        grid.style.setProperty('--single', "none");
      }

        list.innerHTML = `<h5 class="txt-hide">피드 게시글</h5>
        <ul class="wrap-profile">
          <li>
            <img src=${authorimg} alt="기본프로필 소형" class="basic-profile">
          </li>
          <li>
            <ul class="wrap-right">
              <li class="user-name">${post.author.username}<button type="button" class="modal-my-edit btn-more-modal"><img src="../images/icon/s-icon-more-vertical.png" alt="더보기 버튼" class="s-icon-more-vertical"></button>
              </li>
              <li class="user-id">@ ${post.author.accountname}</li>
            </ul>
          </li>
        </ul>
    
        <div class="main-feed">
          <p class="txt-feed">
          ${post.content}
          </p>
          ${images}
          <ul class="wrap-reaction">
            <li>
              <img src="../images/icon/icon-heart.png" alt="좋아요 이미지" class="icon-heart icon-heart-active"><span>${post.heartCount}</span>
            </li>
            <li>
              <img src="../images/icon/icon-message-circle.png" alt="댓글 이미지" class="chat-icon-message-circle"><span>${post.commentCount}</span>
            </li>
          </ul>
          <small class="txt-date">${date[0]}년 ${date[1]}월 ${date[2]}일</small>
        </div>`
    }
    else {
      list.innerHTML = `<h5 class="txt-hide">피드 게시글</h5>
      <ul class="wrap-profile">
        <li>
          <img src=${authorimg} alt="기본프로필 소형" class="basic-profile">
        </li>
        <li>
          <ul class="wrap-right">
            <li class="user-name">${post.author.username}<button type="button" class="modal-my-edit btn-more-modal"><img src="../images/icon/s-icon-more-vertical.png" alt="더보기 버튼" class="s-icon-more-vertical"></button></li>
            <li class="user-id">@ ${post.author.accountname}</li>
          </ul>
        </li>
      </ul>
  
      <div class="main-feed">
        <p class="txt-feed">
        ${post.content}
        </p>
        <ul class="wrap-reaction">
          <li>
            <img src="../images/icon/icon-heart.png" alt="좋아요 이미지" class="icon-heart icon-heart-active"><span>${post.heartCount}</span>
          </li>
          <li>
            <img src="../images/icon/icon-message-circle.png" alt="댓글 이미지" class="chat-icon-message-circle"><span>${post.commentCount}</span>
          </li>
        </ul>
        <small class="txt-date">${date[0]}년 ${date[1]}월 ${date[2]}일</small>
      </div>`
    }
    viewList.appendChild(list)
    viewAlbum.appendChild(grid)

    if (imageArr[1]){
      let btnLeft = document.querySelector(`#btn-left${idx-1}`)
      let btnRight = document.querySelector(`#btn-right${idx-1}`)
      let wrapImages = document.querySelector(`#wrap-images${idx-1}`)
      let imageSize = wrapImages.getBoundingClientRect().width;

      let pos = 0
      btnShow()

      let scrollLeft;
      let totalWidth = wrapImages.clientWidth * (imageArr.length - 1)
      wrapImages.addEventListener('scroll', () => {
        scrollLeft = wrapImages.scrollLeft;
        pos = scrollLeft/wrapImages.clientWidth
        if(scrollLeft == 0) {
          btnShow()
        }
        else if(scrollLeft > totalWidth) {
          btnShow()
        }
        else {
          btnShow()
        }
      })

      function btnShow() {
        pos = Math.round(pos)
  
        if (pos == 0){
          btnLeft.style.display = "none";
        }
        else if (pos == imageArr.length - 1){
          btnRight.style.display = "none";
        }
        else {
          btnLeft.style.display = "block";
          btnRight.style.display = "block";
        }

      }

      btnLeft.addEventListener('click', () => {
        if (pos >= 1) {
          pos -= 1;
        }
        wrapImages.scroll({
          left: (imageSize*pos),
          behavior: 'smooth'
        })
        btnShow()
      })
      btnRight.addEventListener('click', () => {
        if (pos < imageArr.length - 1) {
          pos += 1;
        }
        wrapImages.scroll({
          left: (imageSize*pos),
          behavior: 'smooth'
        })
        btnShow()
      })
    }
  }

  // const btnMoreModal = document.querySelector('#btn-more-modal')
  // const productModal = document.querySelector('.product-modal')
  // btnMoreModal.addEventListener('click', () => {
  //   productModal.classList.toggle('open');
  //   if (productModal.classList.contains('open')) {
  //     productModal.style.bottom = '-92px';
  //   }
  //   else {
  //     productModal.style.bottom = '-240px';
  //   }
  // })
}