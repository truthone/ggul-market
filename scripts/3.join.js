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
