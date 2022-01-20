import {checkEmailValid, imageUpload, checkUserIdValid, join} from './api.js';
import { API_URL } from './constants.js';

const joinEmailInput = document.querySelector("#join-cont-email");
const joinPwdInput = document.querySelector("#join-cont-pwd");
const joinBtnNext = document.querySelector(".join-next");
const emailWarnTxt = document.querySelector(".login-email-warn");
const pwdWarnTxt = document.querySelector(".login-pwd-warn");
const joinBtnSubmit = document.querySelector(".submit-btn");

// 포커스를 잃었을 때 유효성 검사
// 이메일 형식 유효성 검사
joinEmailInput.addEventListener('focusout', async () => {
  const email = joinEmailInput.value;
  const regExp = new RegExp('^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+');
  // console.log(regExp);
  // console.log(regExp.test(email));
  // console.log(email);

    const validEmail = await checkEmailValid(email);
    if(validEmail && email != '' && regExp.test(email) == true) {
      emailWarnTxt.classList.remove('txt-hide','login-warn');
      emailWarnTxt.innerText = "* 사용 가능한 이메일 입니다.";
    }
    else if(!regExp.test(email)) {
      emailWarnTxt.classList.remove('txt-hide');
      emailWarnTxt.classList.add('on');
      emailWarnTxt.innerText = "* 이메일 형식이 아닙니다.";
    }
    else {
      emailWarnTxt.innerText = "* 이미 가입된 이메일 주소입니다.";
      emailWarnTxt.classList.remove('txt-hide');
      emailWarnTxt.classList.add('on');
    }
});

joinPwdInput.addEventListener('focusout', async () => {
  const pw = joinPwdInput.value;
  if(pw === '') {
    pwdWarnTxt.classList.remove('txt-hide');
    pwdWarnTxt.classList.add('on');
  } else if(pw.length>5) {
    joinBtnNext.classList.remove('disabled');
    joinBtnNext.disabled = false;
    pwdWarnTxt.classList.add('txt-hide');
  } else {
    pwdWarnTxt.innerText = "* 비밀번호는 6자 이상이어야 합니다.";
    pwdWarnTxt.classList.remove('txt-hide');
    pwdWarnTxt.classList.add('on');
  }
});

// 다음 버튼 클릭시 프로필 설정
joinBtnNext.addEventListener('click', () => {
  document.querySelector('#setProfile').style.display = "block";
  document.querySelector('#emailJoinin').style.display = "none";
});

// join_membership
const joinUserIdInput = document.querySelector('#user-id');
const profileWarn = document.querySelector('.profile-warn');

async function profileImage(e) {
  const url = API_URL + `/${result}`
  const files = e.target.files
  const result = await imageUpload(files)
  document.querySelector('.profile-img').src = url
}
document.querySelector("#upload-profile").addEventListener("change",profileImage)

// 계정 ID 포커스 잃었을때 유효성 검사
joinUserIdInput.addEventListener('focusout', async () => {
  const userId = joinUserIdInput.value;
  const regExp = new RegExp('^[a-zA-Z0-9_.]+$');

  const validUserId = await checkUserIdValid(userId);
  // console.log(validUserId);
  if(!validUserId && userId != '' && regExp.test(userId) == true) {
    profileWarn.classList.remove('txt-hide');
    profileWarn.classList.remove('on');
    profileWarn.innerText = "* 사용 가능한 아이디 입니다.";
  } else if (!regExp.test(userId)) {
    profileWarn.classList.remove('txt-hide');
    profileWarn.classList.add('on');
    profileWarn.innerText = "* 영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.";
  }
  else {
    profileWarn.classList.remove('txt-hide');
    profileWarn.classList.add('on');
    profileWarn.innerText = "* 이미 사용중인 아이디 입니다.";
  }
});

joinBtnSubmit.addEventListener('click', join);