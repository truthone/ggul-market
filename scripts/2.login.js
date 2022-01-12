// login-email.html
const loginEmailInput = document.querySelector("#login-cont-email");
const loginPwInput = document.querySelector("#login-cont-pwd");
const loginSubmit = document.querySelector(".login-submit");

// Uncaught TypeError: Cannot read properties of undefined (reading 'toString')
// console.log(loginEmailInput.value);

// 입력을 완료한 경우 버튼 활성화
// 아이디 입력
loginEmailInput.addEventListener("input", function() {
  if(loginEmailInput.value === '' && loginPwInput === '') {
    loginSubmit.disabled = true;
  } else if(loginEmailInput.value === '' || loginPwInput.value === '') {
    loginSubmit.disabled = true;
  } else {
    loginSubmit.disabled = false;
    loginSubmit.classList.remove('disabled');
  }
});

// 비밀번호 입력
loginPwInput.addEventListener("input", function() {
  if(loginEmailInput.value === '' && loginPwInput === '') {
    loginSubmit.disabled = true;
  } else if(loginEmailInput.value === '' || loginPwInput.value === '') {
    loginSubmit.disabled = true;
  } else {
    loginSubmit.disabled = false;
    loginSubmit.classList.remove('disabled');
  }
});


// 입력을 완료한 경우 버튼 활성화
// function btnActive()  {
//   const target = document.getElementsByClassName('login-submit');
//   target.disabled = false;
//   // document.querySelector('.btn').remove('.disabled');
// }

// const v = document.getElementById('login-cont-email');
// if(v != '') {
//   btnActive();
// }

// id, pw 유효성 검사

// email 오류 시 on class 추가