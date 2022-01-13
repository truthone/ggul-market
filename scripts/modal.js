function open_modal (num) {
  Modal.classList.toggle('open')
  if (num == 1) {
    if (Modal.classList.contains('open')) {
      Modal.style.bottom = '-140px';
    }
    else {
      Modal.style.bottom = '-240px';
    }
  }
  else if (num == 2) {
    if (Modal.classList.contains('open')) {
      Modal.style.bottom = '-90px';
    }
    else {
      Modal.style.bottom = '-240px';
    }
  }
  else {
    if (Modal.classList.contains('open')) {
      Modal.style.bottom = '-40px';
    }
    else if (num == 3) {
      Modal.style.bottom = '-240px';
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

const btnMoreModal = document.querySelector('.btn-more-modal');
const Modal = document.querySelector('.modal');
const btnOne = document.querySelector('.btn-one');
const btnTwo = document.querySelector('.btn-two');
const ModalAlert = document.querySelector('.modal-alert');
const Alert_msg = document.querySelector('.alert-message');
const Alert_btnOne = document.querySelector('.alert-btn-one');
const Alert_btnTwo = document.querySelector('.alert-btn-two');

btnMoreModal.addEventListener('click', () => {
  if (Modal.classList.contains('modal-profile')) {
    btnOne.innerHTML = "설정 및 개인정보";
    btnTwo.innerHTML = "로그아웃";
    btnTwo.addEventListener('click', () => {
      alert_message("logout");
      close_alert();
      Alert_btnTwo.addEventListener('click', () => {
        // 로그아웃 됩니다
        localStorage.clear();
        window.location.href = "../pages/2.login.html";
      })
    })
    open_modal(2);
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
})