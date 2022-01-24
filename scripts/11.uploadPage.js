import { API_URL, ACCOUNT_NAME, TOKEN, POST_ID } from "./constants.js";


let oldImgStorage = []; // 기존 이미지 src 저장소
let currentImgStorage = []; // 현재 총 이미지 스토리지
let newImgNames = ""; // 변환된 이미지이름(들) 저장소
let oldImgNames = ""; // 받아온 변환된 이미지이름 문자열.

let submitState = false;

const uploadBtn = document.querySelector("#save-btn");


// textarea 높이 자동 조절.
textarea = document.querySelector(".textarea-input");
textarea.addEventListener('input', textareaResize, false);

function textareaResize() {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
  activeUploadBtn();
}

// 기존 게시물 수정 

async function setCurrentData() {
  const textareaElement = document.querySelector(".textarea-input");
  const postImgList = document.querySelector(".upload-img-list");

  const response = await fetch(`${API_URL}/post/${POST_ID}`, {
    headers: {
      "Authorization": "Bearer " + TOKEN,
      "Content-type": "application/json"
    }
  });
  const postData = await response.json();
  textareaElement.value = postData.post.content;

  // 기존 이미지 가져와서 달아주기.
  oldImgNames = postData.post.image;
  oldImgStorage = oldImgNames.split(',', 3); // 이미지 최대 3장 까지 : 현재 이미지 10장까지 올리는 사람이 있음
  if (oldImgStorage) {
    for (i in oldImgStorage) {
      let imgItem = `
            <li class="imgItem">
              <button type="button" class="btn-close">
                <img src="../images/x.png" alt="" class="x">
              </button>
              <img src="${oldImgStorage[i]}" alt="" />
            </li>`;
      postImgList.insertAdjacentHTML("beforeend", imgItem);
      activeUploadBtn();
    }
  }
  activeUploadBtn();
}

// 새로 선택한 이미지 미리보기 처리
function uploadImg() {
  const imgInput = document.querySelector("#feedImgInput");
  const postImgList = document.querySelector(".upload-img-list");
  const postImgListItem = document.querySelectorAll(".upload-img-list li");

  imgInput.addEventListener("change", (e) => {
    currentImgStorage.push(imgInput.files[0]);
    if (currentImgStorage.length >= 4) {
      alert("이미지는 최대 3개까지 업로드할 수 있습니다.");
      currentImgStorage.pop();
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (postImgListItem.length < 4) {
          let imgItem = `
          <li class="imgItem">
            <button type="button" class="btn-close">
              <img src="../images/x.png" alt="" class="x">
            </button>
            <img src="${e.target.result}" alt="" / >
          </li>`;
          postImgList.insertAdjacentHTML("beforeend", imgItem);
          activeUploadBtn();
        }
      }
      reader.readAsDataURL(e.target.files[0]);
    }
    activeUploadBtn();
  });
}

// 이미지 삭제 버튼 동작

function deleteImg(){
  const imgList = document.querySelector(".upload-img-list");
  
  imgList.addEventListener("click", (e) => {
    const postImgListItem = document.querySelectorAll(".upload-img-list li");
    for(let idx = 0 ; idx < e.currentTarget.children.length; idx++){
      if (e.target === imgList.children[idx].firstElementChild.firstElementChild){
        currentImgStorage.splice(idx,1);
        postImgListItem[idx].remove();
        return;
      }
    }
  })
}

// 업로드 하기 위한 이미지 변환 
async function getImgSrc(formData) {
  let name = [];
  try {
    const response = await fetch(`${API_URL}/image/uploadfiles`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    for (let i of data) {
      name.push(`${API_URL}/${i["filename"]}`);
    }
    if (name.length > 1) {
      return name.join(",")
    } else {
      return name[0];
    }
  } catch (err) {
    console.log(err);
  }
}

// 업로드 버튼 기능
function postUpload() {
  let uploadImgNames = '';
  const textareaElement = document.querySelector(".textarea-input");

  uploadBtn.addEventListener("click", async event => {
    if (this.submitState) {

      // 업로드 전 이미지 변환하기 
      if (currentImgStorage.length > 0) {
        const imgFormData = new FormData();

        currentImgStorage.forEach((item, idx) => {
          if (typeof (item) == "string") {

            uploadImgNames = item;
            if ((item.length + 1) != idx) uploadImgNames += ',';

          } else {
            imgFormData.append("image", item)
          }
        });

        uploadImgNames += await getImgSrc(imgFormData).then(result => {
          return result;
        })
      }

      //헤더, 바디 설정
      headers = {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + TOKEN
      }
      body = JSON.stringify({
        "post": {
          "content": textareaElement.value,
          "image": uploadImgNames
        }
      })

      // 기존 게시물 수정이면
      if (POST_ID) {
        fetch(`${API_URL}/post/${POST_ID}`, {
            method: "PUT",
            headers,
            body
          })
          // .then(res => res.json())
          .then(data => {
            if (data) {
              dataReset();
              href("/6.profile.html");
            }
          })
          .catch(err => console.log(err));
      } else { // 새 게시물 업로드이면
        fetch(`${API_URL}/post`, {
            method: "POST",
            headers,
            body
          })
          // .then(res => res.json())
          .then(data => {
            if (data) {
              dataReset();
              href("/6.profile.html");
            }
          })
          .catch(err => console.log(err));
      }
    }
  });
}

function dataReset() {
  const inputs = document.querySelectorAll("INPUT");
  const textarea = document.querySelector("TEXTAREA");
  
  localStorage.setItem('postId', '');
  
  // 텍스트, 이미지값 초기화
  inputs.forEach(item => {
    item.value = "";
    textarea.value = "";
    if (item.getAttribute("type") == "file") {
      const imgList = document.querySelector(".upload-img-list");
      removeAllChildNodes(imgList);
      oldImgStorage = [];
      currentImgStorage = [];
    }
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function href(pageName) {
  const routeTag = document.createElement('a');
  routeTag.id = "routeTag";
  routeTag.href = `/pages${pageName}`;
  document.querySelector(".container").appendChild(routeTag);
  document.querySelector("#routeTag").click();
}
//업로드 유효 검사
function activeUploadBtn() {
  console.log("active")
  const textareaElement = document.querySelector(".textarea-input");
  const imgList = document.querySelectorAll(".upload-img-list li");
  const uploadBtn = document.querySelector("#save-btn");

  if ((textareaElement.value.length != 0) || (imgList.length >= 1)) {
    uploadBtn.classList.remove("disabled");
    submitState = true;
  } else {
    uploadBtn.classList.add("disabled");
    submitState = false;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  deleteImg();  
  uploadImg();
  setCurrentData();
})