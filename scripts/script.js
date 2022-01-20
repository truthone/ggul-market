import { API_URL, TOKEN } from './constants.js'

export async function follow(target) {
  console.log('follow', target)
  const url = API_URL + `/profile/${target}/follow`
  const res = await fetch(url,{
      method:"POST",
      headers:{
          "Authorization" : `Bearer ${TOKEN}`,
          "Content-type" : "application/json"
      }
  })
}

export async function unfollow(target) {
  console.log('unfollow', target)
  const url = API_URL + `/profile/${target}/unfollow`
  const res = await fetch(url,{
    method:"DELETE",
    headers:{
        "Authorization" : `Bearer ${TOKEN}`,
        "Content-type" : "application/json"
    }
})
}

export function getMiniProfile(target) {
  const goURL = `6.profile.html?${target.accountname}`
  let profile = document.createElement('article');
  profile.classList = 'box-profile'
  profile.innerHTML = `<ul class="wrap-profile">
    <li>
      <a href=${goURL}><img src=${target.image} onerror="this.src='../images/basic-profile-img.png';" alt="기본프로필 소형" class="basic-profile"></a>
    </li>
    <li>
      <a href=${goURL}>
        <ul class="wrap-right">
          <li class="user-name">${target.username}</li>
          <li class="user-id">@ ${target.accountname}</li>
        </ul>
      </a>
    </li>
  </ul>`

  return profile
}

export function loadPost(idx, post, imageArr, imageLength, isMyprofile, authorName) {
  const goURL = `6.profile.html?${authorName}`

  let btnMsg = isMyprofile ? 'modal-my-edit' : 'modal-other-edit';

  let images = ''
  let list = document.createElement('article')
  list.classList = 'home-post'

  let date = post.createdAt.slice(0, 10).split('-')
  // 이미지가 있을 때
  if (post.image) {
    for (let image of imageArr) {
      images += `<div><img src=${image} alt="피드 이미지" class="img-feed"></div>`
    }
    // 다중 이미지 처리
    if (imageLength > 1) {
      let btn = '';
      for (let i = 0; i < imageLength; i++) {
        btn += `<button type="button" class="btn-image btn-image${idx}" id="btn${idx}-${i}"></button>`
      }
      btn = `<div class="wrap-btn">${btn}</div>`
      images = `<div class="wrap-images" id="wrap-images${idx}">${images}</div>${btn}`;
    }
  }
  // console.log(post.hearted)
  let heartimage = post.hearted ? '<img src="../images/icon/icon-heart-active.png" alt="좋아요 이미지" class="icon-heart">' : '<img src="../images/icon/icon-heart.png" alt="좋아요 이미지" class="icon-heart">'

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
        <button class="${post.id} btn-comment"><img src="../images/icon/icon-message-circle.png" alt="댓글 이미지" class="chat-icon-message-circle"></button><span>${post.commentCount}</span>
      </li>
    </ul>
    <small class="txt-date">${date[0]}년 ${date[1]}월 ${date[2]}일</small>
  </div>`
  return list;
}

// 다중 이미지 슬라이드(스크롤)
export function handleImageScroll(idx, imageLength) {
  let btnImage = document.querySelectorAll(`.btn-image${idx-1}`)
  let wrapImages = document.querySelector(`#wrap-images${idx-1}`)
  if (!wrapImages){
    return;
  }
  // let imageSize = wrapImages.getBoundingClientRect().width;
  let imageSize = wrapImages.clientWidth;
  let pos = 0 // 현재 보고 있는 이미지

  btnImage.forEach(btn => {
    btn.addEventListener('click', () => {
      pos = btn.id[btn.id.length - 1]
      wrapImages.scroll({
        left: (imageSize * pos),
        behavior: 'smooth'
      })
    })
  });
  let scrollLeft;
  // 스크롤 동작
  wrapImages.addEventListener('scroll', () => {
    scrollLeft = wrapImages.scrollLeft;
    pos = scrollLeft / imageSize
    pos = Math.round(pos)
    for (let i = 0; i < imageLength; i++) {
      if (i == pos) {
        btnImage[i].style.background = "orange";
      } else {
        btnImage[i].style.background = "lightgray";
      }
    }
  })
}

// 좋아요 버튼
export function BtnLike() {
  let btn_like = document.getElementsByClassName('wrap-like-btn');
  let icon_heart = document.getElementsByClassName('icon-heart');
  let like_count = document.getElementsByClassName('like-count');

  for (let i = 0; i < btn_like.length; i++) {
    btn_like[i].addEventListener('click', () => {
        let postId = btn_like[i].classList[1];
        let HeartCount = btn_like[i].classList[2];
        let isHearted = btn_like[i].classList[3];
      console.log(isHearted)
      console.log(HeartCount)
      if (isHearted == "false") {
          likePost(postId);
          isHearted = "true"
          HeartCount = parseInt(HeartCount) + 1;
          btn_like[i].classList.remove(btn_like[i].classList[3]);
          btn_like[i].classList.remove(btn_like[i].classList[2]);
          btn_like[i].classList.add(HeartCount);
          btn_like[i].classList.add(isHearted);
          icon_heart[i].src = "../images/icon/icon-heart-active.png";
      }
      else {
        cancellikePost(postId);
          isHearted = "false"
          HeartCount = parseInt(HeartCount) - 1;
          btn_like[i].classList.remove(btn_like[i].classList[3]);
          btn_like[i].classList.remove(btn_like[i].classList[2]);
          btn_like[i].classList.add(HeartCount);
          btn_like[i].classList.add(isHearted);
          icon_heart[i].src = "../images/icon/icon-heart.png";
      }
      console.log(isHearted)
      console.log(HeartCount)
      like_count[i].innerHTML = HeartCount;
    })
  }
}

// // 게시글 좋아요 취소
export async function cancellikePost(postId) {
  const url = API_URL + `/post/${postId}/unheart`;
  const res = await fetch(url, {
    method:"DELETE",
    headers:{
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
    }
  })
  const data = await res.json();
}

// 게시글 좋아요
export async function likePost(postId) {
  const url = API_URL + `/post/${postId}/heart`;
  const res = await fetch(url, {
    method:"POST",
    headers:{
      "Authorization" : `Bearer ${TOKEN}`,
      "Content-type" : "application/json"
    }
  })
  const data = await res.json();
  }

  export // 버튼이 동적으로 생성되고 나서 호출됩니다.
  async function getBtn() {
    const btnMoreModal = document.querySelectorAll('.btn-more-modal');
    btnMoreModal.forEach(btn => {
      btn.addEventListener('click', () => {
        // let scrollPosition = window.scrollY || document.documentElement.scrollTop;
        // window.scrollTo(0, scrollPosition);
        // console.log(scrollPosition)
        let postId = btn.classList.item(0);
        let productId = btn.classList.item(0);
        Modal.classList.toggle('open')
        if (Modal.classList.contains('open')) {
          if (btn.classList.contains('modal-my-edit')) {
            Modal.style.bottom = '-90px'
            btnOne.addEventListener('click', () => {
              alert_message("delete_edit");
              close_alert();
              Alert_btnTwo.addEventListener('click', async () => {
                deletePost(postId);
                ModalAlert.style.display = "none";
                document.location.reload(true);
              })
            })
            btnTwo.addEventListener('click', () => {
              window.location.href = "../pages/11.uploadPage.html";
              editPost(postId);
            })
            // close_modal();
          }
          
          else if (btn.classList.contains('modal-other-edit')) {
            Modal.style.bottom = '-140px'
            btnOne.textContent = "신고하기";
            btnOne.addEventListener('click', () => {
              alert_message("report_edit");
              // close_alert();
              Alert_btnOne.addEventListener('click', () => {
                ModalAlert.style.display = "none";
                Modal.classList.remove('open');
              })
              Alert_btnTwo.addEventListener('click', async () => {
                reportPost(postId);
                ModalAlert.style.display = "none";
                Modal.classList.remove('open');
              })
            })
          }
    
          else if (btn.classList.contains('modal-product')){
            Modal.style.bottom = '-40px';
            btnOne.addEventListener('click', () => {
              alert_message("delete_product");
              close_alert();
              Alert_btnTwo.addEventListener('click', async () => {
                deleteProduct(productId);
                ModalAlert.style.display = "none";
                document.location.reload(true);
              })
            })
            btnTwo.addEventListener('click', () => {
              window.location.href = "../pages/09.addProduct.html";
              editProduct(productId);
            })
          }
    
          else if (btn.classList.contains('modal-my-comment')){
            Modal.style.bottom = '-90px';
            btnOne.addEventListener('click', () => {
              alert_message("delete_comment");
              close_alert();
            })
          }
    
          else if (btn.classList.contains('modal-other-comment')){
            Modal.style.bottom = '-140px';
            btnOne.textContent = "신고하기";
            btnOne.addEventListener('click', () => {
              alert_message("report_comment");
              close_alert();
            })
          }
        }
        else {
          Modal.style.bottom = '-240px';
        }
        })
    });
  }

// 댓글 리스트
export  async function GetComment(postId) {
  const url = API_URL + `/post/${postId}/comments`;
  const res = await fetch(url, {
    method:"GET",
    headers:{
      "Authorization" : `Bearer ${TOKEN}`,
      "Content-type" : "application/json"
    }
  })
  const data = await res.json();
  console.log(data);
}
// 댓글 작성
export async function editComment(postId) {
  const url = API_URL + `/post/${postId}/comments`;
  const res = await fetch(url, {
    method:"POST",
    headers:{
      "Authorization" : `Bearer ${TOKEN}`,
      "Content-type" : "application/json"
    }
  })
  const data = await res.json();
  console.log(data);
}
// 댓글 삭제
export async function deleteComment(postId) {
  const url = API_URL + `/post/${postId}/comments/${commentId}`;
  const res = await fetch(url, {
    method:"DELETE",
    headers:{
        "Authorization" : `Bearer ${TOKEN}`,
        "Content-type" : "application/json"
    }
  })
}
// 댓글 신고
export async function reportComment(postId) {
  const url = API_URL + `/post/${postId}/comments/${commentId}/report`;
  const res = await fetch(url, {
    method:"POST",
    headers:{
      "Authorization" : `Bearer ${TOKEN}`,
      "Content-type" : "application/json"
    }
  })
  const data = await res.json();
  console.log(data);
}
// 댓글
export async function BtnComment () {
  const btn_comment = document.querySelectorAll('.btn-comment');
  btn_comment.forEach(btn => {
    btn.addEventListener('click', () => {
      let postId = btn.classList.item(0);
      // const goURL = `6.profile.html?${authorName}`;
      // // profile.classList = 'box-profile'
      // list.innerHTML = `<h5 class="txt-hide">피드 댓글</h5>
      // <ul class="wrap-profile">
      //   <li>
      //     <a href=${goURL}><img src=${post.author.image} alt="기본프로필 소형" class="basic-profile"></a>
      //   </li>
      //   <a href=${goURL}>
      //     <li>
      //       <ul class="wrap-right">
      //         <li class="user-name">${post.author.username}</li>
      //         <li class="user-id">@ ${post.author.accountname}</li>
      //       </ul>
      //     </li>
      //   </a>
      //   <li><button type="button" class="${post.id} btn-more-modal ${btnMsg}"><img src="../images/icon/s-icon-more-vertical.png" alt="더보기 버튼" class="s-icon-more-vertical"></button></li>
      // </ul>`
      console.log(postId)
      GetComment(postId);
    })
  })
}