import {
  TOKEN
} from '../scripts/constants.js'

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

const Modal = document.querySelector('.modal');

function alert_message(option) {
  const Alert_msg = document.querySelector('.alert-message');
  const Alert_btnOne = document.querySelector('.alert-btn-one');
  const Alert_btnTwo = document.querySelector('.alert-btn-two');
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

function close_alert() {

  const ModalAlert = document.querySelector('.modal-alert');
  topModal.style.bottom = '-240px';
  Alert_btnOne.addEventListener('click', () => {
    ModalAlert.style.display = "none";
    Modal.classList.remove('open');
    topModal.classList.remove('open');
  })
}



// 버튼이 동적으로 생성되고 나서 호출됩니다.
async function getBtn() {
  const btnOne = document.querySelector('.btn-one');
  const btnTwo = document.querySelector('.btn-two');
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
            window.location.href = "../pages/09.addProduct.html";
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
      } else {
        Modal.style.bottom = '-240px';
      }
    })
  });
}


if (document.querySelector('.top-btn-more-modal'))
  const topbtnMoreModal = document.querySelector('.top-btn-more-modal');
  const topModal = document.querySelector('.top-modal');
  const topbtnOne = document.querySelector('.top-btn-one');
  const topbtnTwo = document.querySelector('.top-btn-two');
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