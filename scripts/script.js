const API_URL = "http://146.56.183.55:5050"

function loadPost(idx, post, imageArr, imageLength, isMyprofile, authorName) {
  const goURL = `6.profile.html?${authorName}`

  let btnMsg = isMyprofile?'modal-my-edit':'modal-other-edit';

  let images = ''
  let list = document.createElement('article')
  list.classList = 'home-post'
  
  let date = post.createdAt.slice(0, 10).split('-')
  // 이미지가 있을 때
  if (post.image){
    for (let image of imageArr){
      images += `<div><img src=${image} alt="피드 이미지" class="img-feed"></div>`
    }
    // 다중 이미지 처리
    if (imageLength > 1){
      images = `<div class="wrap-images" id="wrap-images${idx}">${images}</div><button type="button" class="btn-left" id="btn-left${idx}">⬅️</button><button type="button" class="btn-right" id="btn-right${idx}">➡️</button>`;
    }
  }
  // console.log(post.hearted)
  let heartimage = post.hearted?'<img src="../images/icon/icon-heart-active.png" alt="좋아요 이미지" class="icon-heart">':'<img src="../images/icon/icon-heart.png" alt="좋아요 이미지" class="icon-heart">'

  list.innerHTML = `<h5 class="txt-hide">피드 게시글</h5>
  <ul class="wrap-profile">
    <li>
      <a href=${goURL}><img src=${post.author.image} alt="기본프로필 소형" class="basic-profile"></a>
    </li>
    <a href=${goURL}>
      <li>
        <ul class="wrap-right">
          <li class="user-name">${post.author.username}</li>
          <li class="user-id">@ ${post.author.accountname}</li>
        </ul>
      </li>
    </a>
    <li><button type="button" class="${post.id} btn-more-modal ${btnMsg}"><img src="../images/icon/s-icon-more-vertical.png" alt="더보기 버튼" class="s-icon-more-vertical"></button></li>
  </ul>
  <div class="main-feed">
    <p class="txt-feed">
    ${post.content}
    </p>
    ${images}
    <ul class="wrap-reaction">
      <li class="wrap-like-btn ${post.id} ${post.heartCount}  ${post.hearted}">
      <button>${heartimage}</button><span class="like-count">${post.heartCount}</span>
      </li>
      <li>
        <button><img src="../images/icon/icon-message-circle.png" alt="댓글 이미지" class="chat-icon-message-circle"></button><span>${post.commentCount}</span>
      </li>
    </ul>
    <small class="txt-date">${date[0]}년 ${date[1]}월 ${date[2]}일</small>
  </div>`
  return list;
}

// 다중 이미지 슬라이드(스크롤)
function handleImageScroll(idx, imageLength) {
  let btnLeft = document.querySelector(`#btn-left${idx-1}`)
  let btnRight = document.querySelector(`#btn-right${idx-1}`)
  let wrapImages = document.querySelector(`#wrap-images${idx-1}`)
  let imageSize = wrapImages.getBoundingClientRect().width;

  let pos = 0 // 현재 보고 있는 이미지
  btnShow()

  let scrollLeft;
  let totalWidth = wrapImages.clientWidth * (imageLength - 1)

  // 스크롤 동작
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

  // 버튼 보이고 숨기기
  function btnShow() {
    pos = Math.round(pos)

    if (pos == 0){
      btnLeft.style.display = "none";
    }
    else if (pos == imageLength - 1){
      btnRight.style.display = "none";
    }
    else {
      btnLeft.style.display = "block";
      btnRight.style.display = "block";
    }
  }

  // 버튼 클릭 이벤트
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
    if (pos < imageLength - 1) {
      pos += 1;
    }
    wrapImages.scroll({
      left: (imageSize*pos),
      behavior: 'smooth'
    })
    btnShow()
  })
}