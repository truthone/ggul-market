
tempStorage = [];
submitState = false;
uploadBtn = document.querySelector("#save-btn");

textarea = document.querySelector(".textarea-input");
textarea.addEventListener('input', textareaResize, false);

function textareaResize() {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
  activeUploadBtn();
}

function uploadImg() {
  const imgInput = document.querySelector("#feedImgInput");
  const postImgList = document.querySelector(".upload-img-list");
  const postImgListItem = document.querySelectorAll(".upload-img-list li");

  imgInput.addEventListener("change", (e) => {
    tempStorage.push(imgInput.files[0]);

    if(tempStorage.length >= 4) {
      alert("이미지는 최대 3개까지 업로드할 수 있습니다.");
      tempStorage.pop();
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
          if(postImgListItem.length < 4) {
            let imgItem = `
            <li>
              <button type="button" class="btn-close">
                <img src="../images/x.png" alt="" class="x">
              </button>
              <img src="${e.target.result}" alt="" />
            </li>`;
            postImgList.insertAdjacentHTML("beforeend", imgItem);
            deleteImg();
            activeUploadBtn();
          }
        }
      reader.readAsDataURL(e.target.files[0]);
    }
    activeUploadBtn();
});

}



function deleteImg () {
  const postImgListItem = document.querySelectorAll(".upload-img-list li");
  const deleteBtn = document.querySelectorAll(".btn-close");

  deleteBtn.forEach((button, idx) => {
    button.addEventListener("click", () => {
      postImgListItem[idx].remove();
      tempStorage.splice(idx, 1);
      activeUploadBtn();
    });
  });
}

async function getImgSrc(formData) {
  let name = [];
  try {
      const response = await fetch("http://146.56.183.55:5050/image/uploadfiles", {
          method: "POST",
          body : formData
      });

      const data = await response.json();

      for(let i of data) {
          name.push(`http://146.56.183.55:5050/${i["filename"]}`);
      }
      if(name.length > 1) {
          return name.join(",")
      } else {
          return name[0];
      }
  } catch (err) {
      console.log(err);
  }
}

function postUpload() {
  uploadBtn.addEventListener("click", async event => {
    console.log("업로드 버튼 클릭")
    if (this.submitState) {
      console.log("업로드 버튼 실행")
      const textareaElement = document.querySelector(".textarea-input");
      const imgFormData = new FormData();
      let imgNames = "";
  
      if(tempStorage.length > 0) {
        tempStorage.forEach(item => {
          imgFormData.append("image", item);
        });
        imgNames = await getImgSrc(imgFormData).then(result => { return result; });
      }
  
      fetch("http://146.56.183.55:5050/post",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : 'Bearer ' + localStorage.getItem("Token")
        },
        body : JSON.stringify({
          "post": {
              "content": textareaElement.value,
              "image": imgNames
          }
        })
      })
      .then(res => res.json())
      .then(data => {
        if(data) {
          dataReset();
          href("/6.profile.html");
        }
      })
      .catch(err => console.log(err));
    }
  });
}

function dataReset() {
  const inputs = document.querySelectorAll("INPUT");
  inputs.forEach(item => {
    item.value = "";

    if (item.getAttribute("type") == "file") {
      const imgList = document.querySelector(".upload-img-list");
      tempStorage = [];
      removeAllChildNodes(imgList);
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

function activeUploadBtn() {
  console.log("active")
  const textareaElement = document.querySelector(".textarea-input");
  const imgList = document.querySelectorAll(".upload-img-list li");
  const uploadBtn = document.querySelector("#save-btn");
  if ((textareaElement.value.length != 0) || (imgList.length >= 1)) {
    console.log("업로드버튼 액티브 true")
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
});