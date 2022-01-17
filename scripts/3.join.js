// join_email.html
const joinEmailInput = document.querySelector("#join-cont-email");
const joinPwdInput = document.querySelector("#join-cont-pwd");
const joinBtnNext = document.querySelector(".join-next");
const emailWarnTxt = document.querySelector(".login-email-warn");
const pwdWarnTxt = document.querySelector(".login-pwd-warn");


// 포커스를 잃었을 때 유효성 검사
joinEmailInput.addEventListener('focusout', async () => {
  const email = joinEmailInput.value;
  const pw = joinPwdInput.value;
    const validEmail = await checkEmailValid(email);
    if(validEmail) {
      emailWarnTxt.classList.remove('txt-hide','login-warn');
      emailWarnTxt.innerText = "* 사용 가능한 이메일 입니다.";
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

// 이메일 중복체크
async function checkEmailValid(email) {
  const res = await fetch(`http://146.56.183.55:5050/user/emailvalid`, {
    method:"POST",
    headers: {
            "Content-Type": "application/json",
        },
    body:JSON.stringify({
        "user":{
                "email":email
        }
    })
  });
  const json = await res.json();
  return json.message == "사용 가능한 이메일 입니다." ? true : false
}

// 다음 버튼 클릭시 프로필 설정
joinBtnNext.addEventListener('click', () => {
  document.querySelector('#setProfile').style.display = "block";
  document.querySelector('#emailJoinin').style.display = "none";
});
// dev code
document.querySelector('#setProfile').style.display = "block";
document.querySelector('#emailJoinin').style.display = "none";


// join_membership
const joinUserIdInput = document.querySelector('#user-id');
  
// 프로필 이미지 업로드
async function imageUpload(files){
  const formData = new FormData();
  formData.append("image", files[0]);//formData.append("키이름","값")
  const res = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
      method: "POST",
      body : formData
  })
  const data = await res.json()
  // console.log(data);
  const productImgName = data["filename"];
  return productImgName
}

async function profileImage(e) {
  const files = e.target.files
  const result = await imageUpload(files)
  document.querySelector('.profile-img').src = `http://146.56.183.55:5050/`+result
  // console.log(result)
}
document.querySelector("#upload-profile").addEventListener("change",profileImage)


// 계정 ID 중복검사
async function checkUserIdValid(accountname) {
  const url = `http://146.56.183.55:5050/user/searchuser/?accountname=${accountname}`;
  const res = await fetch(url, {
    method:"GET",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("Token"),
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  console.log(json);
  // return json.message == "사용 가능한 아이디 입니다." ? true : false
}

const profileWarn = document.querySelector('.profile-warn');

// 계정 ID 포커스 잃었을때 유효성 검사
joinUserIdInput.addEventListener('focusout', async () => {
  const userId = joinUserIdInput.value;
  const regExp = new RegExp('^[a-zA-Z0-9_.]+$');

  const validUserId = await checkUserIdValid(userId);
  console.log(validUserId);
  if(validUserId) {
    profileWarn.classList.remove('txt-hide','login-warn');
    profileWarn.innerText = "* 사용 가능한 ID입니다.";
  } else if (!regExp.test(userId)) {
    profileWarn.innerText = "* 영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.";
    profileWarn.classList.remove('txt-hide');
    profileWarn.classList.add('on');
  }
  else {
    profileWarn.innerText = "* 이미 사용 중인 ID입니다.";
    profileWarn.classList.remove('txt-hide');
    profileWarn.classList.add('on');
  }
});