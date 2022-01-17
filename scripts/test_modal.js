// function open_modal (num) {
//   if (num == 1) {
//     if (Modal.classList.contains('open')) {
//       Modal.style.bottom = '-140px';
//     }
//     else {
//       Modal.style.bottom = '-240px';
//     }
//   }
//   else if (num == 2) {
//     if (Modal.classList.contains('open')) {
//       Modal.style.bottom = '-90px';
//     }
//     else {
//       Modal.style.bottom = '-240px';
//     }
//   }
//   else {
//     if (Modal.classList.contains('open')) {
//       Modal.style.bottom = '-40px';
//     }
//     else if (num == 3) {
//       Modal.style.bottom = '-240px';
//     }
//   }
// }
function open_modal (num) {
  if (num == 1) {
    if (Modal.classList.contains('open')) {
      Modal.style.bottom = '-140px';
    }
  }
  else if (num == 2) {
    if (Modal.classList.contains('open')) {
      Modal.style.bottom = '-90px';
    }
  }
  else {
    if (Modal.classList.contains('open')) {
      Modal.style.bottom = '-40px';
    }
  }
}


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
  Alert_btnOne.addEventListener('click', () => {
    ModalAlert.style.display = "none";
    Modal.classList.remove('open');
  })
}

const btnMoreModal = document.getElementsByClassName('btn-more-modal');
const Modal = document.querySelector('.modal');
const btnOne = document.querySelector('.btn-one');
const btnTwo = document.querySelector('.btn-two');
const ModalAlert = document.querySelector('.modal-alert');
const Alert_msg = document.querySelector('.alert-message');
const Alert_btnOne = document.querySelector('.alert-btn-one');
const Alert_btnTwo = document.querySelector('.alert-btn-two');

for (let i = 0; i < btnMoreModal.length; i++) {
  let temp = 0;
  btnMoreModal[i].addEventListener('click', () => {
    if (temp == btnMoreModal[i].classList[0]) {
      Modal.classList.remove(btnMoreModal[i].classList[0]);
      temp = 0;
    }
    else {
      Modal.classList.add(btnMoreModal[i].classList[0]);
      temp = Modal.classList.value.split(" ")[1];
      // console.log(temp)
    }
    Modal.classList.toggle('open')

    if (Modal.classList.contains('open')) {
      if (Modal.classList.contains('modal-profile')) {
        btnOne.innerHTML = "설정 및 개인정보";
        btnTwo.innerHTML = "로그아웃";
        open_modal(2);
        btnTwo.addEventListener('click', () => {
          alert_message("logout");
          close_alert();
          Alert_btnTwo.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = "../pages/2.login.html";
          })
        })
        // window.addEventListener('click', () => {
        //   window.addEventListener('click', (e) => {
        //     console.log(e.target)
        //       if (e.target != (Modal)) {
        //           Modal.style.bottom = '-240px';
        //           console.log(btnMoreModal[i].classList[0])
        //           Modal.classList.remove(btnMoreModal[i].classList[0]);
        //           console.log(temp)
        //           temp = 0;
        //           Modal.classList.remove('open');
        //       }
        //   })
        // })
      }
      else if (Modal.classList.contains('modal-chat-room')) {
        btnOne.innerHTML = "채팅방 나가기";
        btnOne.href = "../pages/12.chat_list.html";
        open_modal(1);
      }
      else if (Modal.classList.contains('modal-other-comment')) {
        btnOne.innerHTML = "신고하기";
        btnOne.addEventListener('click', () => {
          alert_message("report_comment");
          close_alert();
        })
        open_modal(1);
      }
      else if (Modal.classList.contains('modal-my-comment')) {
        btnOne.innerHTML = "삭제";
        btnOne.addEventListener('click', () => {
          alert_message("delete_comment");
          close_alert();
        })
        open_modal(1);
      }
      else if (Modal.classList.contains('modal-other-edit')) {
        btnOne.innerHTML = "신고하기";
        btnOne.addEventListener('click', () => {
          alert_message("report_edit");
          close_alert();
        })
        open_modal(1);
      }
      else if (Modal.classList.contains('modal-my-edit')) {
        btnOne.innerHTML = "삭제";
        btnTwo.innerHTML = "수정";
        btnOne.addEventListener('click', () => {
          alert_message("delete_report");
          close_alert();
        })
        btnTwo.href = "../pages/9.addProduct.html"
        open_modal(2);
      }
      else if (Modal.classList.contains('modal-product')) {
        btnOne.innerHTML = "삭제";
        btnTwo.innerHTML = "수정";
        btnOne.addEventListener('click', () => {
          alert_message("delete_product");
          close_alert();
        })
        btnTwo.href = "../pages/9.addProduct.html"
        open_modal(3);
      }
    }
    // else {
    //   Modal.style.bottom = '-240px';
    // }
  })
}
// window.addEventListener('click', (e) => {
//   console.log(e.target)
//     if (e.target != Modal) {
//       window.addEventListener('click', (e) => {
//         Modal.style.bottom = '-240px';
//       })
//     }
// })
// window.addEventListener('click', (e) => {
//   console.log(e.target)
//   if (Modal.classList.contains('open')) {
//     if (e.target != Modal) {
//       window.addEventListener('click', (e) => {
//         Modal.style.bottom = '-240px';
//       })
//     }
//   }
// })
window.addEventListener('click', () => {
  window.addEventListener('click', (e) => {
    console.log(e.target)
      if (e.target != (Modal)) {
          Modal.style.bottom = '-240px';
        }
      })
    })
// 더보기버튼 클릭하면 open 클래스 생기고 모달창 열림
// 그와 동시에 e.target이 더보기버튼을 가리키므로 아래 함수 적용되어 모달창 자체가 닫힌 상태가 됨
// 따라서 아래 함수가 모달창 열린 다음에 한번더 클릭했을떄 발생하도록 해야함