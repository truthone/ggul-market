// let postId = [];
const Modal = document.querySelector('.modal');
const btnOne = document.querySelector('.btn-one');
const btnTwo = document.querySelector('.btn-two');
const ModalAlert = document.querySelector('.modal-alert');
const Alert_msg = document.querySelector('.alert-message');
const Alert_btnOne = document.querySelector('.alert-btn-one');
const Alert_btnTwo = document.querySelector('.alert-btn-two');

function alert_message (option) {
  if (option == "logout") {
    Alert_msg.innerHTML = "로그아웃하시겠어요?";
    Alert_btnOne.innerHTML = "취소";
    Alert_btnTwo.innerHTML = "로그아웃";
  }
  else if (option == "report_comment") {
    Alert_msg.innerHTML = "댓글을 신고할까요?";
    Alert_btnOne.innerHTML = "취소";
    Alert_btnTwo.innerHTML = "신고";
  }
  else if (option == "delete_comment") {
    Alert_msg.innerHTML = "댓글을 삭제할까요?";
    Alert_btnOne.innerHTML = "취소";
    Alert_btnTwo.innerHTML = "삭제";
  }
  else if (option == "report_edit") {
    Alert_msg.innerHTML = "게시글을 신고할까요?";
    Alert_btnOne.innerHTML = "취소";
    Alert_btnTwo.innerHTML = "신고";
  }
  else if (option == "delete_edit") {
    Alert_msg.innerHTML = "게시글을 삭제할까요?";
    Alert_btnOne.innerHTML = "취소";
    Alert_btnTwo.innerHTML = "삭제";
  }
  else if (option == "delete_product") {
    Alert_msg.innerHTML = "상품을 삭제할까요?";
    Alert_btnOne.innerHTML = "취소";
    Alert_btnTwo.innerHTML = "삭제";
  }
  Modal.style.bottom = '-240px';
  ModalAlert.style.display = 'block';
}

function close_alert () {
  topModal.style.bottom = '-240px';
  Alert_btnOne.addEventListener('click', () => {
    ModalAlert.style.display = "none";
    Modal.classList.remove('open');
    topModal.classList.remove('open');
  })
}


// 피드 더보기버튼 위치
// 두번째부터 모달창 안열리는 문제
// function close_modal () {
//   window.addEventListener('click', () => {
//     window.addEventListener('click', (e) => {
//       console.log(e.target)
//         if (e.target != (Modal)) {
//             Modal.style.bottom = '-240px';
//           }
//         })
//       })
// }
// async function getPostData() {
//   const url = API_URL + `/post/${this.postId}`;
//   const res = await fetch(url, {
//     method:"GET",
//     headers:{
//       "Authorization" : `Bearer ${token}`,
//       "Content-type" : "application/json"
//     }
//   })
//   this.postData = await res.json();
//   // console.log(postData)
// }
// getPostData();
token = localStorage.getItem("Token")
// let postId = [];
// console.log(postId)

// 게시글 상세
// this.postData = {};
// getPostId(post_id)
// async function getPostId() {
//   const url = API_URL + `/post`;
//   const res = await fetch(url, {
//     method:"GET",
//     headers:{
//       "Authorization" : `Bearer ${token}`,
//       "Content-type" : "application/json"
//     }
//   })
//   let postId = '';
//   const json = await res.json();
//   const post = json.posts
//   // console.log(post)
//   post.forEach(post => {
//     postId = postId + ' ' + post._id
//     // const postContent = post.content
//     // console.log(postContent)
//   })
//   // console.log(postId)
//   return(postId)
// }
// console.log(postId)
// getPostId();

// //게시글 신고
async function reportPost(postId) {
  const url = API_URL + `/post/${postId}/report`;
  const res = await fetch(url, {
    method:"POST",
    headers:{
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
    }
  })
  const data = await res.json();
  console.log(data);
}

//게시글 삭제
async function deletePost(postId) {
  const url = API_URL + `/post/${postId}`;
  const res = await fetch(url, {
    method:"DELETE",
    headers:{
        "Authorization" : `Bearer ${token}`,
        "Content-type" : "application/json"
    }
  })
}


// 버튼이 동적으로 생성되고 나서 호출됩니다.
async function getBtn() {
  // await this.getPostData();
  // let postId = await getPostId();
  // postId = postId.split(' ')
  // postId.splice(0, 1);
  // console.log(postId[5])
  // console.log(post)
  const btnMoreModal = document.querySelectorAll('.btn-more-modal');
  // console.log(btnMoreModal.classList)
  // const postId = btnMoreModal.classList[0];
  // console.log(postId)
  btnMoreModal.forEach(btn => {
    btn.addEventListener('click', () => {
      // console.log(btn.classList.item(0))
      let postId = btn.classList.item(0);
      console.log(postId)
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
            })
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
            // Alert_btnTwo.addEventListener('click', async () => {
            //   deletePost(postId);
            // })
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

const topbtnMoreModal = document.querySelector('.top-btn-more-modal');
const topModal = document.querySelector('.top-modal');
const topbtnOne = document.querySelector('.top-btn-one');
const topbtnTwo = document.querySelector('.top-btn-two');

topbtnMoreModal.addEventListener('click', () => {
  topModal.classList.toggle('open');
  // console.log(topbtnMoreModal.classList)
  if (topModal.classList.contains('open')) { 
    if (topbtnMoreModal.classList.contains('modal-profile')) {
      topModal.style.bottom = '-90px';
      // Modal.classList.remove('modal-profile');
      topbtnTwo.addEventListener('click', () => {
        alert_message("logout");
        close_alert();
        Alert_btnTwo.addEventListener('click', () => {
          localStorage.clear();
          window.location.href = "../pages/2.login.html";
        })
      })
    }
    else if  (topbtnMoreModal.classList.contains('modal-chat-room')) {
      topbtnOne.innerHTML = "채팅방 나가기";
      topbtnOne.href = "../pages/12.chat_list.html";
      topModal.style.bottom = '-140px';
    }
  }
  else {
    topModal.style.bottom = '-240px';
  }
})

//API

// const accountName = localStorage.getItem("AccountName")
// const token = localStorage.getItem("Token")
// let id = post_id;
// 게시글 상세
// this.postData = {};
// getPostId(post_id)
// async function getPostId(post_id) {
//   const url = API_URL + `/post/${post_id}`;
//   const res = await fetch(url, {
//     method:"GET",
//     headers:{
//       "Authorization" : `Bearer ${token}`,
//       "Content-type" : "application/json"
//     }
//   })
//   const json = await res.json();
//   const post = json.post
//   postId = post.id;
//   console.log(postId)
// }

// this.postId = "";
// this.postData = {};
// // this.userId = "";

// //게시글 정보 가져오기
// // ${this.postId}
// async function getPostData() {
//   const url = API_URL + `/post/${this.postId}`;
//   const res = await fetch(url, {
//     method:"GET",
//     headers:{
//       "Authorization" : `Bearer ${token}`,
//       "Content-type" : "application/json"
//     }
//   })
//   this.postData = await res.json();
//   // this.userId = this.postData["post"]["author"][accountname];
// }
// await this.getPostData();

// // 게시글 삭제
// async function deletePost(postId) {
//   const url = API_URL + `/post/${postId}`;
//   const res = await fetch(url, {
//     method:"DELETE",
//     headers:{
//         "Authorization" : `Bearer ${token}`,
//         "Content-type" : "application/json"
//     }
//   })
//   this.postData = await res.json();
//   this.postId = await postData._id;
// }

// // 게시글 좋아요
// async function likePost(postId) {
//   const url = API_URL + `/post/${postId}/heart`;
//   const res = await fetch(url, {
//     method:"POST",
//     headers:{
//       "Authorization" : `Bearer ${token}`,
//       "Content-type" : "application/json"
//     }
//   })
//   const data = await res.json();
//   return data;
// }

// // 게시글 좋아요 취소
// async function canclelikePost(postId) {
//   const url = API_URL + `/post/${postId}/unheart`;
//   const res = await fetch(url, {
//     method:"DELETE",
//     headers:{
//       "Authorization" : `Bearer ${token}`,
//       "Content-type" : "application/json"
//     }
//   })
//   const data = await res.json();
//   return data;
// }

// //게시글 신고
// async function reportPost(postId) {
//   const url = API_URL + `/post/${postId}/report`;
//   const res = await fetch(url, {
//     method:"POST",
//     headers:{
//       "Authorization" : `Bearer ${token}`,
//       "Content-type" : "application/json"
//     }
//   })
//   const data = await res.json();
//   console.log(data);
// }

// async function deletePost(postId) {
//   const url = API_URL + `/post/${postId}`;
//   const res = await fetch(url, {
//     method:"DELETE",
//     headers:{
//         "Authorization" : `Bearer ${token}`,
//         "Content-type" : "application/json"
//     }
//   })
// }