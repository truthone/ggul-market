let btn_like = document.querySelector('.wrap-like-btn');
let icon_heart = document.querySelector('.icon-heart');
let like_count = document.querySelector('.like-count');
let number = like_count.innerHTML;
let btn_check = 0;

btn_like.addEventListener('click', () => {
  if (btn_check == 0) {
    btn_check = 1;
    icon_heart.src = "../images/icon/icon-heart-active.png";
    number = parseInt(number) + 1;
  }
  else {
    btn_check = 0;
    icon_heart.src = "../images/icon/icon-heart.png";
    number = parseInt(number) - 1;
  }
  like_count.innerHTML = number;
})