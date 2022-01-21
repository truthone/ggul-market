import {
  likePost,
  cancellikePost,
  reportPost,
  deletePost,
  deleteProduct,
  editPost,
  editProduct,
  GetComment,
  editComment,
  deleteComment,
  reportComment,
} from './api.js'



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
  let btnCommentMsg = isMyprofile ? 'modal-my-comment' : 'modal-other-comment';

  let images = ''
  let list = document.createElement('article')
  list.classList = 'home-post';
  list.classList.add(post.id);

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

  list.innerHTML = `<section>
    <h5 class="txt-hide">피드 게시글</h5>
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
  </section>
  <section class="main-feed">
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
  </section>
  <section class="comment hidden">
    <p>comment 파트 입니다</p>
  </section>`
  return list;
}

// <section class="comment hidden"></section>안에 추가될 부분
// `
// <ul class="wrap-profile">
// <li>
//   <a href=${goURL}><img src=${comment.author.image} alt="기본프로필 소형" class="basic-profile"></a>
// </li>
// <a href=${goURL}>
//   <li>
//     <ul class="wrap-right">
//       <li class="user-name">${comment.author.username}</li>
//     </ul>
//   </li>
// </a>
// <li>
//   <small class="txt-date">${comment.createdAt}</small>
// </li>
// <li><button type="button" class="${comment.id} btn-more-modal ${btnCommentMsg}"><img src="../images/icon/s-icon-more-vertical.png" alt="더보기 버튼" class="s-icon-more-vertical"></button></li>
// </ul>
// <p class="txt-feed">
// ${comment.content}
// </p>
// `

// 다중 이미지 슬라이드(스크롤)
export function handleImageScroll(idx, imageLength) {
  let btnImage = document.querySelectorAll(`.btn-image${idx-1}`)
  let wrapImages = document.querySelector(`#wrap-images${idx-1}`)
  if (!wrapImages) {
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
      } else {
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

// 모달창 구현
if (document.querySelector('.top-btn-more-modal')) {
  const topbtnMoreModal = document.querySelector('.top-btn-more-modal');
  const topModal = document.querySelector('.top-modal');
  const topbtnOne = document.querySelector('.top-btn-one');
  const topbtnTwo = document.querySelector('.top-btn-two');
  const Alert_btnTwo = document.querySelector('.alert-btn-two');

  topbtnMoreModal.addEventListener('click', () => {
    topModal.classList.toggle('open');
    if (topModal.classList.contains('open')) {
      if (topbtnMoreModal.classList.contains('modal-profile')) {
        topModal.style.bottom = '-90px';
        topbtnTwo.addEventListener('click', () => {
          alert_message("logout");
          close_alert();
          Alert_btnTwo.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = "../pages/2.login.html";
          })
        })
      } else if (topbtnMoreModal.classList.contains('modal-chat-room')) {
        topbtnOne.innerHTML = "채팅방 나가기";
        topbtnOne.href = "../pages/12.chat_list.html";
        topModal.style.bottom = '-140px';
      }
    } else {
      topModal.style.bottom = '-240px';
    }
  })  
}
function close_alert() {
  const Alert_btnOne = document.querySelector('.alert-btn-one');
  const Modal = document.querySelector('.modal');
  const ModalAlert = document.querySelector('.modal-alert');

  document.querySelector('.top-modal').style.bottom = '-240px';
  Alert_btnOne.addEventListener('click', () => {
    ModalAlert.style.display = "none";
    Modal.classList.remove('open');
    document.querySelector('.top-modal').classList.remove('open');
  })
}
function alert_message(option) {
  const Alert_msg = document.querySelector('.alert-message');
  const Alert_btnOne = document.querySelector('.alert-btn-one');
  const Alert_btnTwo = document.querySelector('.alert-btn-two');
  const Modal = document.querySelector('.modal');
  const ModalAlert = document.querySelector('.modal-alert');
  if (option == "logout") {
    Alert_msg.innerHTML = "로그아웃하시겠어요?";
    Alert_btnOne.innerHTML = "취소";
    Alert_btnTwo.innerHTML = "로그아웃";
  } else if (option == "report_comment") {
    Alert_msg.innerHTML = "댓글을 신고할까요?";
    Alert_btnOne.innerHTML = "취소";
    Alert_btnTwo.innerHTML = "신고";
  } else if (option == "delete_comment") {
    Alert_msg.innerHTML = "댓글을 삭제할까요?";
    Alert_btnOne.innerHTML = "취소";
    Alert_btnTwo.innerHTML = "삭제";
  } else if (option == "report_edit") {
    Alert_msg.innerHTML = "게시글을 신고할까요?";
    Alert_btnOne.innerHTML = "취소";
    Alert_btnTwo.innerHTML = "신고";
  } else if (option == "delete_edit") {
    Alert_msg.innerHTML = "게시글을 삭제할까요?";
    Alert_btnOne.innerHTML = "취소";
    Alert_btnTwo.innerHTML = "삭제";
  } else if (option == "delete_product") {
    Alert_msg.innerHTML = "상품을 삭제할까요?";
    Alert_btnOne.innerHTML = "취소";
    Alert_btnTwo.innerHTML = "삭제";
  }
  Modal.style.bottom = '-240px';
  ModalAlert.style.display = 'block';
}

// 버튼이 동적으로 생성되고 나서 호출됩니다.
export async function getBtn() {
  const btnOne = document.querySelector('.btn-one');
  const btnTwo = document.querySelector('.btn-two');
  const btnMoreModal = document.querySelectorAll('.btn-more-modal');
  const Modal = document.querySelector('.modal');
  const ModalAlert = document.querySelector('.modal-alert');
  const Alert_btnOne = document.querySelector('.alert-btn-one');
  const Alert_btnTwo = document.querySelector('.alert-btn-two');
  btnMoreModal.forEach(btn => {
    btn.addEventListener('click', () => {
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
        } else if (btn.classList.contains('modal-other-edit')) {
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
        } else if (btn.classList.contains('modal-product')) {
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
            window.location.href = "../pages/9.addProduct.html";
            editProduct(productId);
          })
        } else if (btn.classList.contains('modal-my-comment')) {
          Modal.style.bottom = '-90px';
          btnOne.addEventListener('click', () => {
            alert_message("delete_comment");
            close_alert();
          })
        } else if (btn.classList.contains('modal-other-comment')) {
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

// 댓글
export async function BtnComment () {
  // const btn_comment = document.querySelectorAll('.btn-comment');
  // const home_post = document.querySelectorAll('.home-post');
  const btn_comment = document.getElementsByClassName('btn-comment');
  const home_post = document.getElementsByClassName('home-post');
  const comment = document.getElementsByClassName('comment');
  const top_nav = document.querySelector('.wrap-top-nav');
  // console.log(home_post)
  // console.log(home_post.length)
  for (let i = 0; i < home_post.length; i++) {
    btn_comment[i].addEventListener('click', () => {
      let postId = btn_comment[i].classList[0];
      console.log(postId)
      for (let j = 0; j < home_post.length; j++) {
        if (home_post[j].classList[1] != postId) {
          comment[i].classList.remove('hidden');
          home_post[j].style.display = "none";
        }
      }
      GetComment(postId);
      console.log(postId)
      //페이지 그리기
      // home_post[i].innerHTML = `
      // `
    })
  }
}

  // btn_comment.forEach(btn => {
  //   btn.addEventListener('click', () => {
  //     // const home_post = document.querySelector('.home-post');
  //     postId = btn.classList.item(0);
  //     localStorage.setItem('postId', postId)
  //     console.log(postId)
  //     // console.log('postId:', postId)
  //     // console.log('home_post:', home_post.classList.item(1))
  //     // if (home_post.classList.item(1) != postId)
  //     // {
  //     //   home_post.style.display = "none";
  //     // }
  //     // GetComment(postId);
  //     // window.location.href = "../pages/10.comment_page.html";
  //     // let btnMsg = isMyprofile ? 'modal-my-edit' : 'modal-other-edit';
  //     // let list = document.createElement('section');
  //     // const goURL = `6.profile.html?${authorName}`;
  //     // loadPost(idx, post, imageArr, imageLength, isMyprofile, authorName);
  //     // console.log(localStorage.getItem(postId))
  //   })
  //   postId = localStorage.getItem(postId);
  // })


// <section class="wrap-comment active">
// <ul class="wrap-profile">
//   <li>
//     <a href=${goURL}><img src=${comment.author.image} alt="기본프로필 소형" class="basic-profile"></a>
//   </li>
//   <a href=${goURL}>
//     <li>
//       <ul class="wrap-right">
//         <li class="user-name">${comment.author.username}</li>
//       </ul>
//     </li>
//   </a>
//   <small>${comment.createdAt}</small>
//   <li><button type="button" class="${comment.id} btn-more-modal ${btnCommentMsg}"><img src="../images/icon/s-icon-more-vertical.png" alt="더보기 버튼" class="s-icon-more-vertical"></button></li>
// </ul>
// <p class="txt-feed">
// ${comment.content}
// </p>
// <div class="wrap-comment">
//   <img src="../images/basic-profile-img.png" alt="기본프로필 소형" class="basic-profile">
//   <form class="form-comment">
//     <input class="input-comment" type="text" placeholder="댓글 입력하기...">
//     <button class="btn-send">게시</button>
//   </form>
// </div>
// </section>
