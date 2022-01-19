// profile_modification.html
const uName = document.querySelector('#user-name');
const uAccount = document.querySelector('#user-id');
const uIntro = document.querySelector('#user-intro');
const uImg = document.querySelector('.profile-img');
const btnSave = document.querySelector('.profile-save');
const profileWarn = document.querySelector('.profile-warn');
const accountName = localStorage.getItem("AccountName");

// 기존 데이터 불러오기
async function loadUserData() {
  const token = localStorage.getItem("Token")
  const userAccount = localStorage.getItem("AccountName")
  // console.log();
  const res = await fetch(`http://146.56.183.55:5050/user`, {
    method:"PUT",
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json",
    },
    body:JSON.stringify({
        "user":{
          "username": uName,
          "accountname": userAccount,
          "intro": uIntro,
          "image": uImg
      }
    })
  });
  const json = await res.json();
  console.log(json);
  uImg.src = json["user"]["image"];
  uName.value = json["user"]["username"];
  uAccount.value = json["user"]["accountname"];
  uIntro.value =json["user"]["intro"];
}
loadUserData();


// 프로필 이미지 업로드
async function imageUpload(files){
  const formData = new FormData();
  formData.append("image", files[0]);
  const res = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
      method: "POST",
      body : formData
  })
  const data = await res.json()
  const productImgName = data["filename"];
  return productImgName
}

async function profileImage(e) {
  const files = e.target.files
  const result = await imageUpload(files)
  uImg.src = `http://146.56.183.55:5050/`+result
}
document.querySelector("#upload-profile").addEventListener("change",profileImage)


// 계정 ID 중복검사
async function checkUserIdValid(accountname) {
  const url = `http://146.56.183.55:5050/user`;
  const res = await fetch(url, {
    method:"GET",
  });
  const json = await res.json();
  console.log(json);
  for(let item of json) {
    if(accountname == accountName) {
      return false;
      break;
    } else if(accountname == item["accountname"]) {
      return true;
      break;
    }
  }
}

// // 계정 ID 포커스 잃었을때 유효성 검사
uAccount.addEventListener('focusout', async () => {
  const userId = uAccount.value;
  // console.log(userId);
  const regExp = new RegExp('^[a-zA-Z0-9_.]+$');

  const validUserId = await checkUserIdValid(userId);
  // console.log(validUserId);
  if(!validUserId && userId != '') {
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

// 서버로 전달
async function updateProfile() {
  const name = uName.value;
  const id = uAccount.value;
  const intro = uIntro.value;
  const imgUrl = uImg.src;
  const token = localStorage.getItem("Token");

  try {
    const res = await fetch("http://146.56.183.55:5050/user", {

                method: "PUT",
                headers: {
                  "Authorization" : `Bearer ${token}`,
                  "Content-type" : "application/json",
                },
                body : JSON.stringify({
                    "user": {
                        "username": name,
                        "accountname": id,
                        "intro": intro,
                        "image": imgUrl,
                    }
                })
            })
    // 로컬스토리지에 있는 accountName 업데이트
    localStorage.setItem("AccountName", id);
    const json = await res.json()
    console.log(res);

    // 버튼 누르면 프로필로 이동
    location.href = './6.profile.html'
  }
  catch(err) {
    alert(err)
  }
}
btnSave.addEventListener('click', updateProfile);
