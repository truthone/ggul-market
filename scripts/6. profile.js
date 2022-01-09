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
if (products.length == 0){
  listSelling.style.display = "none";
}

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
//     - 판매 중인 상품을 클릭하면 하단에 상품 삭제, 수정, 웹사이트에서 상품 보기 버튼이 포함된 메뉴가 나타납니다. (단, 나의 프로필 페이지가 아닐 경우 상품을 클릭하면 바로 상품 판매 사이트로 이동됩니다.)