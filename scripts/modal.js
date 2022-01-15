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
// 어떤건 부드럽고 어떤건 아님 ??
function close_modal () {
  window.addEventListener('click', () => {
    window.addEventListener('click', (e) => {
      console.log(e.target)
        if (e.target != (Modal)) {
            Modal.style.bottom = '-240px';
          }
        })
      })
}

// 버튼이 동적으로 생성되고 나서 호출됩니다.
function getBtn() {
  const btnMoreModal = document.querySelectorAll('.btn-more-modal');

  btnMoreModal.forEach(btn => {
    btn.addEventListener('click', () => {
      Modal.classList.toggle('open')
      console.log(btn.classList)
      if (Modal.classList.contains('open')) {
        if (btn.classList.contains('modal-my-edit')) {
          Modal.style.bottom = '-90px'
          btnOne.addEventListener('click', () => {
            alert_message("delete_edit");
            close_alert();
          })
          // close_modal();
        }
        
        else if (btn.classList.contains('modal-other-edit')) {
          Modal.style.bottom = '-140px'
          btnOne.textContent = "신고하기";
          btnOne.addEventListener('click', () => {
            alert_message("report_edit");
            close_alert();
          })
        }
  
        else if (btn.classList.contains('modal-product')){
          Modal.style.bottom = '-40px';
          btnOne.addEventListener('click', () => {
            alert_message("delete_product");
            close_alert();
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
      // else if (btn.classList.contains('modal-profile')){
      //   Modal.style.bottom = '-90px';
      //   btnOne.textContent = "설정 및 개인정보";
      //   btnTwo.textContent = "로그아웃";
      //   btnTwo.addEventListener('click', () => {
      //     alert_message("logout");
      //     close_alert();
      //     Alert_btnTwo.addEventListener('click', () => {
      //       localStorage.clear();
      //       window.location.href = "../pages/2.login.html";
      //     })
      //   })
      // }

      // else if (btn.classList.contains('modal-chat-room')){
      //   Modal.style.bottom = '-140px';
      //   btnOne.textContent = "채팅방 나가기";
      //   btnOne.href = "../pages/12.chat_list.html";
      // }
      // 여기까지 지승 테스트

      // temp = 0;
      //   if (temp == btn.classList[0]) {
      //     Modal.classList.remove(btn.classList[0])
      //     temp = 0;
      //   }
      //   else {
      //     Modal.classList.add(btn.classList[0]);
      //     temp = Modal.classList.value.split(" ")[1];
      //   }
        // Modal.classList.toggle('open')
  
        // if (Modal.classList.contains('open')) {
        //   if (btnMoreModal[0].classList.contains('modal-profile')) {
            // btnOne.innerHTML = "설정 및 개인정보";
            // btnTwo.innerHTML = "로그아웃";
            // Modal.style.bottom = '-90px';
            // Modal.classList.remove('modal-profile');
            // btnTwo.addEventListener('click', () => {
            //   alert_message("logout");
            //   close_alert();
            //   Alert_btnTwo.addEventListener('click', () => {
            //     localStorage.clear();
            //     window.location.href = "../pages/2.login.html";
            //   })
            // })
          // }
          // else if (Modal.classList.contains('modal-chat-room')) {
          //   btnOne.innerHTML = "채팅방 나가기";
          //   btnOne.href = "../pages/12.chat_list.html";
          //   open_modal(1);
          // }
          // else if (Modal.classList.contains('modal-other-comment')) {
          //   btnOne.innerHTML = "신고하기";
          //   btnOne.addEventListener('click', () => {
          //     alert_message("report_comment");
          //     close_alert();
          //   })
          //   open_modal(1);
          // }
          // else if (Modal.classList.contains('modal-my-comment')) {
          //   btnOne.innerHTML = "삭제";
          //   btnOne.addEventListener('click', () => {
          //     alert_message("delete_comment");
          //     close_alert();
          //   })
          //   open_modal(1);
          // }
          // else if (Modal.classList.contains('modal-other-edit')) {
          //   btnOne.innerHTML = "신고하기";
          //   btnOne.addEventListener('click', () => {
          //     alert_message("report_edit");
          //     close_alert();
          //   })
          //   open_modal(1);
          // }
          // else if (Modal.classList.contains('modal-my-edit')) {
          //   btnOne.innerHTML = "삭제";
          //   btnTwo.innerHTML = "수정";
          //   btnOne.addEventListener('click', () => {
          //     alert_message("delete_report");
          //     close_alert();
          //   })
          //   btnTwo.href = "../pages/9.addProduct.html"
          //   open_modal(2);
          // }
          // else if (Modal.classList.contains('modal-product')) {
          //   btnOne.innerHTML = "삭제";
          //   btnTwo.innerHTML = "수정";
          //   btnOne.addEventListener('click', () => {
          //     alert_message("delete_product");
          //     close_alert();
          //   })
          //   btnTwo.href = "../pages/9.addProduct.html"
          //   open_modal(3);
          // }
        // }
      // else {
      //   Modal.style.bottom = '-240px';
      // }
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
//게시글 상세
async function getPost() {
  const url = API_URL + ``;

}
//게시글 삭제
async function deletePost(post_id) {
  const url = API_URL + `/post/${post_id}`;
  const res = await fetch(url,{
    method:"DELETE",
    headers:{
        "Authorization" : `Bearer ${token}`,
        "Content-type" : "application/json"
    }
  })
}