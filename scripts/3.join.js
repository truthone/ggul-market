// join_email.html
const joinEmailInput = document.querySelector("#join-cont-email");
const joinPwdInput = document.querySelector("#join-cont-pwd");
const joinBtnNext = document.querySelector("#join-next");

console.log(joinEmailInput);

// 포커스를 잃었을 때 유효성 검사
joinEmailInput.addEventListener('focusout', () => {
  // console.log("email focus out");
  // 유효성 검사하는 코드 넣기
});

// 이미 가입된 이메일인 경우 경고
function getInput() {
  console.log(document.querySelector("#join-cont-email").value);
  console.log(document.querySelector("#join-cont-pwd").value);
};

// 서버에서 기존 유저 이메일 가져오기
async function getUserData() {
  const response = await fetch(`http://146.56.183.55:5050/user`);
  this.userData = await response.json();
};

console.log(getUserData());
// getUserData();

joinEmailInput.addEventListener('focusout', () => {
  // getInput();
  if(joinEmailInput.value === ''){

  }
});



// 비밀번호가 6자 미만인 경우 경고


// 유효성 검사를 통과할 경우 다음 버튼 활성화


// 다음 버튼 클릭 시 프로필 설정으로 이동


// 계정 ID 유효성 검사


// 계정 ID 중복 검사

