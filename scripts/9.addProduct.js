// import {
//   href,
//   setTitle,
//   textCounting,
//   historyBack
// } from '../../utils/index.js';

// export default class Product {
// constructor(id = "", type = "") {
//   this.rootElement = document.querySelector("#app");
//   this.mainElement = Product.createMainElement();
//   this.productImgName = "";
//   this.userId = localStorage.getItem("account");
//   this.type = type;
//   this.productId = id;
//   this.productData = {};
// }

// // 메인 엘리먼트 생성
// static createMainElement() {
//   const mainElement = document.createElement("MAIN");
//   mainElement.classList.add("main");
//   mainElement.classList.add("product-register-main");

//   return mainElement;
// }
const mainElement = document.querySelector(".container");
// 상품 정보 가져오기
async function getProductData() {
  const response = await fetch(`http://146.56.183.55:5050/product/detail/${this.productId}`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("access-token")
    }
  });
  this.productData = await response.json();
}

// 첨부된 이미지 나타나기
function postProductImg() {
  console.log("첨부된 이미지 나타내기")
  const imgInput = document.querySelector("#productImgInput");
  const productImgBox = document.querySelector("#product-img-box");
  let productImgElement = document.querySelector("#product-img-box img");

  imgInput.addEventListener("change", (e) => {
    this.productImgName = "";

    if (!productImgElement) {
      productImgElement = document.createElement("img");
      productImgBox.append(productImgElement);
    }

    if (e.target.files && e.target.files[0]) {
      imgInput.setAttribute("data-state", 1);
      let reader = new FileReader();

      reader.onload = (e) => {
        productImgElement.src = e.target.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    }

    const formData = new FormData();
    formData.append("image", imgInput.files[0]);

    fetch(`http://146.56.183.55:5050/image/uploadfile`, {
        method: "POST",
        body: formData
      })
      .then((res) => res.json())
      .then((data) => {
        this.productImgName = data["filename"];
        console.log("파일이름 받아옴요")
        btnActive();
      })
      .catch((err) => console.err(err));
  });
}

// 현재 상품 정보 세팅
async function setCurrentData() {
  console.log("현재 상품 정보 세팅")
  const productName = document.querySelector("#productNameInput");
  const productPrice = document.querySelector("#priceInput");
  const storeLink = document.querySelector("#storeLinkInput");
  const productImgInput = documenthis.querySelector("#productImgInput");
  const productImgBox = document.querySelector("#product-img-box")

  const productImgElement = document.createElement("img");
  productImgBox.append(productImgElement);

  await this.getProductData();

  const data = this.productData["product"];
  this.productImgName = data["itemImage"];
  productImgElement.src = this.productImgName;
  productName.value = data["itemName"];
  productPrice.value = data["price"];
  storeLink.value = data["link"];

  productImgInput.setAttribute("data-state", 1);
  productName.setAttribute("data-state", 1);
  productPrice.setAttribute("data-state", 1);
  storeLink.setAttribute("data-state", 1);

  this.btnActive();
}

// 상품 정보 서버로 전송 - 업로드
async function postProductData() {
  console.log("상품 정보 서버로 전송 - 업로드")
  const saveBtn = document.querySelector("#save-btn");
  // saveBtn.addEventListener("click", async () => {
    if (!saveBtn.classList.contains("disabled")) {
      const productName = document.querySelector("#productNameInput");
      const productPrice = document.querySelector("#priceInput");
      const storeLink = document.querySelector("#storeLinkInput");
      // const productImgName = 
      console.log(`productImgName : ${this.productImgName}`)

      const price = parseInt(productPrice.value.replaceAll(",", ""), 10);
      const response = await fetch(`http://146.56.183.55:5050/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem("access-token")
        },
        body: JSON.stringify({
          "product": {
            "itemName": productName.value,
            "price": price,
            "link": storeLink.value,
            "itemImage": `http://146.56.183.55:5050/${this.productImgName}`
          }
        })
      });

      const data = await response.json();

      if (data) {
        this.dataReset();
        href("/6.profile.html");
      }
    }
  // });
}

function href(pageName) {
  const routeTag = document.createElement('a');
  routeTag.id = "routeTag";
  routeTag.href = `http://127.0.0.1:5500/pages${pageName}`;
  document.querySelector(".container").appendChild(routeTag);
  document.querySelector("#routeTag").click();
}

// 상품 정보 서버로 전송 - 수정
function editProductData(saveBtn) {
  console.log("상품 정보 서버로 전송 -수정")
  saveBtn.addEventListener("click", async () => {
    if (!saveBtn.classList.contains("disabled")) {
      const productName = document.querySelector("#productNameInput");
      const productPrice = document.querySelector("#priceInput");
      const storeLink = document.querySelector("#storeLinkInput");

      const price = parseInt(productPrice.value.replaceAll(",", ""), 10);
      const response = await fetch(`http://146.56.183.55:5050/product/${this.productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem("access-token")
        },
        body: JSON.stringify({
          "product": {
            "itemName": productName.value,
            "price": price,
            "link": storeLink.value,
            "itemImage": this.productImgName
          }
        })
      });

      const data = await response.json();

      if (data) {
        this.dataReset();
        href("/profile");
      }
    }
  });
}

// 상품 정보 전송 후 데이터 리셋
function dataReset() {
  console.log("상품 정보 전송 후 데이터 리셋vv")
  const inputs = document.querySelectorAll("INPUT");
  inputs.forEach((item) => {
    item.value = "";

    if (item.getAttribute("type") == "file") {
      const imgTag = document.querySelector("#product-img-box img");
      imgTag.remove();
      this.productImgName = "";
    }
  });
}

// input 입력 또는 포커스 잃을 때 이벤트 발생
function inputEvent() {
  console.log("input 입력 또는 포커스 잃을 때 이벤트 발생")
  const inputs = document.querySelectorAll(".input-container input");

  inputs.forEach((item) => {
    item.addEventListener("blur", () => {
      this.checkValidation(item);
      this.btnActive();
    });
  });

  inputs.forEach((item) => {
    item.addEventListener("input", () => {
      this.checkValidation(item);
      this.btnActive();
    });
  });

  this.checkPriceValue();
}

// 유효성 검사
function checkValidation(element) {
  console.log("유효성 검사")
  let value = element.value;
  let inputId = element.getAttribute("id");

  if (value.length != 0) {
    if (inputId == "productNameInput") {
      if (value.length > 1) {
        element.setAttribute("data-state", 1);
      }
    }

    if (inputId == "priceInput") {
      element.setAttribute("data-state", 1);
    }

    if (inputId == "storeLinkInput") {
      console.log("판매링크 검사 ")
      const urlReg = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi;

      if (urlReg.test(value)) {
        element.setAttribute("data-state", 1);
      } else {
        element.setAttribute("data-state", 0);
      }
    }
  } else {
    element.setAttribute("data-state", 0);
  }
}

// 상품 가격 체크 이벤트
function checkPriceValue() {
  console.log("상품 가격 체크 이벤트")
  const priceInput = document.querySelector("#priceInput");

  // 입력될 때 숫자 이외에 다른 문자(특수문자 포함) 입력되지 않도록 합니다.
  priceInput.addEventListener("input", () => {
    priceInput.value = priceInput.value.replace(/[^\0-9]/g, '');
    priceInput.value = priceInput.value.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi, '');
  });

  // 입력 후 포커스를 잃으면 입력된 가격이 원단위로 표시됩니다.
  // priceInput.addEventListener("blur", () => {
  //   priceInput.value = priceInput.value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  // });
}

// input value 체크
function inputValueCheck() {
  console.log("input value 체크")
  const inputs = document.querySelectorAll("form input");

  let valueState = true;
  let addState = 0;

  inputs.forEach((item) => {
    let dataState = parseInt(item.getAttribute("data-state"), 10);

    addState += dataState;
  });

  if (inputs.length == addState) {
    valueState = true;
  } else {
    valueState = false;
  }

  return valueState;
}

// 저장 버튼 이벤트
function btnActive() {
  console.log('저장 버튼 이벤트')
  let state = this.inputValueCheck();
  console.log(`btnActive state: + ${state}`)
  const saveBtn = document.querySelector("#save-btn")
  let btnState = saveBtn.classList.contains("disabled");

  if (state) {
    if (btnState) {
      saveBtn.classList.remove("disabled");
    }
  } else {
    if (!btnState) {
      saveBtn.classList.add("disabled");
    }
  }
}

// function render() {
//   if (this.type == "edit") {
//     setTitle("상품 정보 수정");
//   } else {
//     setTitle("상품 등록");
//   }
//   this.setElement();

//   return [this.createHeader(), this.mainElement];
// }
// }

function clickImgBtn() {
  console.log("click")
  const imgInput = document.querySelector("#productImgInput")
  imgInput.click();
  postProductImg();
}

window.addEventListener("DOMContentLoaded", () => {
  inputEvent()
  postProductImg()
});