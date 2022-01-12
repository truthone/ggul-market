function getInput() {
  console.log(document.querySelector("#login-cont-email").value)
  console.log(document.querySelector("#login-cont-pwd").value)
}
// 비동기로 동하는것을 명시해줘야 await을 할 수 있다!
async function login() {
  const email = document.querySelector("#login-cont-email").value
  const pw = document.querySelector("#login-cont-pwd").value
  const url = "http://146.56.183.55:5050"
  const loginData = {
          "user":{
                  "email": email,
                  "password": pw
                  }
          }
  
  const res = await fetch(url+'/user/login',{
      //메소드 구분
      method:"POST",
      //헤더
      headers:{
          "Content-type" : "application/json"
      },
      //이건 오브잭트를 문자열로 바꿔주는 부분
      body:JSON.stringify(loginData)
  })
  const json = await res.json()//외않됌? 포인트 res.json()도 비동기. await을 해줘야한다.
  if (json.user){
    localStorage.setItem("Token",json.user.token)
    location.href = "./4.home.html"
  }
  else {
    console.log('input값 클리어하기')
  }
  
}
const $loginBtn = document.querySelector('.login-submit')
$loginBtn.addEventListener("click",login)