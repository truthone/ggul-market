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




// login API 부분입니다.
function getInput() {
  console.log(document.querySelector("#login-cont-email").value)
  console.log(document.querySelector("#login-cont-pwd").value)
}

const $loginBtn = document.querySelector('.login-submit')
$loginBtn.addEventListener("click",login)

async function login() {
  const email = document.querySelector("#login-cont-email").value
  const pw = document.querySelector("#login-cont-pwd").value
  const loginData = {
          "user":{
                  "email": email,
                  "password": pw
                  }
          }
  try {
    const res = await fetch(API_URL+'/user/login',{
      //메소드 구분
      method:"POST",
      //헤더
      headers:{
          "Content-type" : "application/json"
      },
      //이건 오브잭트를 문자열로 바꿔주는 부분
      body:JSON.stringify(loginData)
  })
  const json = await res.json() // res.json()도 비동기. await을 해줘야한다.
  const token = json.user.token
  console.log(json.user)
  localStorage.setItem("Token", token)
  localStorage.setItem("AccountName", json.user.accountname)
  localStorage.setItem("Id", json.user._id)
  location.href = "./4.home.html"
  }
  catch(err){
    console.log('로그인 실패. input을 초기화합니다.')
    document.querySelector(".login-warn").classList.add("on");
    loginEmailInput.value = null;
    loginPwInput.value = null;
  }
}