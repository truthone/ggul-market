import {loadUserData, checkUserIdValid, updateProfile, profileImage} from './api.js'

// profile_modification.html
const uAccount = document.querySelector('#user-id');
const btnSave = document.querySelector('.profile-save');
const profileWarn = document.querySelector('.profile-warn');

loadUserData();
document.querySelector("#upload-profile").addEventListener("change", profileImage)
btnSave.addEventListener('click', updateProfile);

// // 계정 ID 포커스 잃었을때 유효성 검사
uAccount.addEventListener('focusout', async () => {
  const userId = uAccount.value;
  // console.log(userId);
  const regExp = new RegExp('^[a-zA-Z0-9_.]+$');

  const validUserId = await checkUserIdValid(userId);
  // console.log(validUserId);
  if(!validUserId && userId != '' && regExp.test(userId) == true) {
    profileWarn.classList.remove('txt-hide');
    profileWarn.classList.remove('on');
    profileWarn.innerText = "* 사용 가능한 아이디 입니다.";
    btnSave.disabled = false;
    btnSave.classList.remove('disabled');
  } 
  else if (!regExp.test(userId)) {
    profileWarn.classList.remove('txt-hide');
    profileWarn.classList.add('on');
    profileWarn.innerText = "* 영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.";
    btnSave.disabled = true;
    btnSave.classList.add('disabled');
  }
  else {
    profileWarn.classList.remove('txt-hide');
    profileWarn.classList.add('on');
    profileWarn.innerText = "* 이미 사용중인 아이디 입니다.";
    btnSave.disabled = true;
    btnSave.classList.add('disabled');
  }
});

