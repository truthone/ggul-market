import {login} from './api.js';

const loginEmailInput = document.querySelector("#login-cont-email");
const loginPwdInput = document.querySelector("#login-cont-pwd");
const loginSubmit = document.querySelector(".login-submit");


// 입력을 완료한 경우 버튼 활성화
// 아이디 입력
if(loginEmailInput)
loginEmailInput.addEventListener("input", function() {
  if(loginEmailInput.value === '' && loginPwdInput === '') {
    loginSubmit.disabled = true;
  } else if(loginEmailInput.value === '' || loginPwdInput.value === '') {
    loginSubmit.disabled = true;
  } else {
    loginSubmit.disabled = false;
    loginSubmit.classList.remove('disabled');
  }
});

// 비밀번호 입력
if(loginPwdInput)
loginPwdInput.addEventListener("input", function() {
  if(loginEmailInput.value === '' && loginPwdInput === '') {
    loginSubmit.disabled = true;
  } else if(loginEmailInput.value === '' || loginPwdInput.value === '') {
    loginSubmit.disabled = true;
  } else {
    loginSubmit.disabled = false;
    loginSubmit.classList.remove('disabled');
  }
});

const $loginBtn = document.querySelector('.login-submit')
if($loginBtn){
  $loginBtn.addEventListener("click",login)
}
