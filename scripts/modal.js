// 피드 더보기버튼 위치, 버튼 열렸다말았다 - 서버따라 자꾸 달라짐
// 두번째부터 모달창 안열리는 문제
// 모달확인창 버튼 클릭시 화면이 맨위로 올라가는 현상
// 삭제 시 화면 스크롤 유지한 상태로 새로고침
// document.location.reload(true);

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


token = localStorage.getItem("Token")
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

//게시글 신고
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

//게시글 수정
async function editPost(postId) {
  const url = API_URL + `/post/${postId}`;
  const res = await fetch(url, {
    method:"PUT",
    headers:{
        "Authorization" : `Bearer ${token}`,
        "Content-type" : "application/json"
    },
    body: JSON.stringify({
      "post": {
        "content": String,
				"image": String
      }
    })
  })
}

//상품 삭제
async function deleteProduct(productId) {
  const url = API_URL + `/product/${productId}`;
  const res = await fetch(url, {
    method:"DELETE",
    headers:{
        "Authorization" : `Bearer ${token}`,
        "Content-type" : "application/json"
    }
  })
}

//상품 수정
async function editProduct(productId) {
  const url = API_URL + `/product/${productId}`;
  const res = await fetch(url, {
    method:"PUT",
    headers:{
        "Authorization" : `Bearer ${token}`,
        "Content-type" : "application/json"
    },
    body: JSON.stringify({
      "product": {
				"itemName": String,
				"price": Number,
				"link": String,
				"itemImage": String
				}
    })
  })
}

// 버튼이 동적으로 생성되고 나서 호출됩니다.
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

const topbtnMoreModal = document.querySelector('.top-btn-more-modal');
const topModal = document.querySelector('.top-modal');
const topbtnOne = document.querySelector('.top-btn-one');
const topbtnTwo = document.querySelector('.top-btn-two');

if (topbtnMoreModal)
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
