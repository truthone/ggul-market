let btn_like = document.getElementsByClassName('wrap-like-btn');
let icon_heart = document.getElementsByClassName('icon-heart');
let like_count = document.getElementsByClassName('like-count');
let btn_check = Array.from({length: btn_like.length}, () => 0);
let number = new Array();
for (let i = 0; i < like_count.length; i++) {
  number[i] = like_count[i].innerHTML;
}


for (let i = 0; i <btn_like.length; i++) {
  btn_like[i].addEventListener('click', () => {
    if (btn_check[i] == 0) {
      btn_check[i] = 1;
      icon_heart[i].src = "../images/icon/icon-heart-active.png";
      number[i] = parseInt(number[i]) + 1;
    }
    else {
      btn_check[i] = 0;
      icon_heart[i].src = "../images/icon/icon-heart.png";
      number[i] = parseInt(number[i]) - 1;
    }
    like_count[i].innerHTML = number[i];
  })
}