// **6. 사용자 프로필 페이지**
// - 나의 프로필 페이지일 경우
let isMyprofile = false;
let followingId = [];
const accountName = localStorage.getItem("AccountName")
const token = localStorage.getItem("Token")
let targetProfile = accountName;
localStorage.setItem("Target", targetProfile)
initPage();
getProfile(targetProfile)
function initPage() {
  getFollowingList()
	if (location.search != '') {
    targetProfile = location.search.replace('?', '');
    localStorage.setItem("Target", targetProfile)
	}
}

async function getFollowingList() {
  const url = API_URL + `/profile/${accountName}`;
  // 계정 정보가 없을 때
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
    followingId = profile.following
  }
catch(err){
  console.log(err)
}
}


// 팔로우/언팔로우 버튼 변화
const btnFollowUnfollow = document.querySelector('#btn-profile_view_follow');
followBtnChange()
function followBtnChange() {

  btnFollowUnfollow.addEventListener('click', () => {
    btnFollowUnfollow.classList.toggle('activ')
    if (btnFollowUnfollow.classList.contains('activ')){
      btnFollowUnfollow.textContent="언팔로우";
    }
    else{
      btnFollowUnfollow.textContent="팔로우";
    }
  });
}

// - 판매 중인 상품 섹션은 등록한 상품이 없을 경우에는 표시되지 않습니다.
const products = document.querySelectorAll('.product'); // 등록된 상품
const listSelling = document.querySelector('.wrap-items'); // 판매중인 상품 목록

// - 게시글 섹션에서는 목록형과 앨범형으로 게시글들을 확인할 수 있습니다. 
// 기본형은 목록형이며, 이미지가 없는 게시글을 경우에는 앨범형에서는 표시되지 않습니다.
const btnViewList = document.querySelector('#toggle-list'); // 목록형 버튼
const btnViewAlbum = document.querySelector('#toggle-album'); // 앨범형 버튼
const viewList = document.querySelector('.list-post') // 목록형 보기
const viewAlbum = document.querySelector('.grid-post') // 앨범형 보기

// 목록형, 앨범형 토글
function toggleView(show, hide) {
  show.firstChild.classList.toggle('off-view')
  show.firstChild.classList.toggle('on-view')
  show.lastChild.classList.toggle('on-view')
  show.lastChild.classList.toggle('off-view')

  hide.firstChild.classList.toggle('on-view')
  hide.firstChild.classList.toggle('off-view')
  hide.lastChild.classList.toggle('off-view')
  hide.lastChild.classList.toggle('on-view')
}

btnViewList.addEventListener('click', () => {
  if (btnViewList.firstChild.classList.contains('off-view')) {
    toggleView(btnViewList, btnViewAlbum);
    viewList.style.display = "block";
    viewAlbum.style.display = "none";
  }
})

btnViewAlbum.addEventListener('click', () => {
  if (btnViewAlbum.firstChild.classList.contains('off-view')) {
    toggleView(btnViewAlbum, btnViewList);
    viewAlbum.style.display = "grid";
    viewList.style.display = "none";
  }
})

// 사용자가 올린 게시글이 없을 경우에는 게시글이 나타나지 않습니다.
const itemPost = document.querySelectorAll('.home-post');
const feed = document.querySelector('.feed');
if (itemPost.length == 0){
  feed.style.display = "none";
}

// API
// 나의 프로필 가져오기
async function getProfile(currentProfile) {  
  const url = API_URL + `/profile/${currentProfile}`;
  // 계정 정보가 없을 때
  if(!currentProfile){
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

    // 로그인 정보와 프로필이 일치
    if (accountName == profile.accountname) {
      isMyprofile = true;
    }
    let followerCount  = profile.followerCount?json.profile.followerCount:0
    let followingCount = profile.followingCount?json.profile.followingCount:0
    let name = profile.username;
    let desc = profile.intro;
    let img = profile.image;
    let targetId = profile._id;
    if (followingId.includes(targetId)) {
      btnFollowUnfollow.classList.add('activ')
      btnFollowUnfollow.textContent='언팔로우'
    }
    else{
      btnFollowUnfollow.classList.remove('activ')
    }

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
    userId.textContent = `@ ${name}`;
    descUser.textContent = desc;
    await getProductList(currentProfile);
    await getPost(currentProfile);
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

// 판매중인 상품 리스트 로드
async function getProductList(targetName) {
  const url = API_URL + `/product/${targetName}`;
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
    item.type="button"
    item.classList.add('product')
    item.classList.add('modal-product')
    item.classList.add('btn-more-modal')
    item.innerHTML = `<h5 class="txt-hide">상품 썸네일</h5>
    <img src=${product.itemImage} alt="상품 이미지" class="img-product">
    <p class="tit-product">${product.itemName}</p>
    <p class="price-product">${price}원</p>`
    slider.appendChild(item)
  }
}

// 프로필 게시물 로드
async function getPost(currentProfile) {
  const url = API_URL + `/post/${currentProfile}/userpost`

  const res = await fetch(url, {
    method: "GET",
    headers:{
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
      }
  })

  const json = await res.json()
  // 게시물 없음
  if (json.post == []){
    feed.style.display = "none";
    return
  }
  
  let idx = 0;
  for(let post of json.post){
    let imageArr = post.image.split(',')
    let imageLength = imageArr.length;
    let list = loadPost(idx, post, imageArr, imageLength, isMyprofile, currentProfile);
    viewList.appendChild(list)
    if (imageLength > 1){
      handleImageScroll(++idx, imageLength)
    }

    if (post.image){
      let grid = document.createElement('a')
      grid.classList = 'cont-grid'
      grid.innerHTML = `<img src=${imageArr[0]} alt="피드 이미지">`
      // 앨범형에서 더보기 버튼이 보이지 않음
      if (imageLength == 1) {
        grid.style.setProperty('--single', "hidden");
      }
      viewAlbum.appendChild(grid)
    }
  }
  getBtn();
}