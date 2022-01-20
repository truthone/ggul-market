// home
if(localStorage.getItem("Token")){
    getFeed()
}
else{
    location.href = './2.login.html'
}

// const btn_like = document.querySelectorAll('.wrap-like-btn');
// const icon_heart = document.querySelectorAll('.icon_heart');

async function getFeed() {
    const token = localStorage.getItem("Token")
    const accountName = localStorage.getItem("AccountName")
    const url = API_URL + `/post/feed`
    const res = await fetch(url , {
        method:"GET",
        headers:{
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        }
    })
    const json = await res.json()

    // 게시물 없음
    if (!json.post){
      const feed = document.querySelector('.feed-cont')
      if (feed)
      feed.style.display = "block"
      return;
    }

    let idx = 0;
    let isMyprofile = false;
    for(let post of json.posts) {
        const authorAccount = post.author.accountname

        if (accountName == post.author.accountname) {
            isMyprofile = true;
        }
        else {
            isMyprofile = false;
        }
        const container = document.querySelector('.container');
        
        let imageArr = post.image.split(',')
        let imageLength = imageArr.length;
        let list = loadPost(idx, post, imageArr, imageLength, isMyprofile, authorAccount);
        if(container) 
          container.appendChild(list)
        
        if (imageLength > 1){
            handleImageScroll(++idx, imageLength)
        }
    }
    BtnLike();
    getBtn();
}

// // 게시글 좋아요
async function likePost(postId) {
  const url = API_URL + `/post/${postId}/heart`;
  const res = await fetch(url, {
    method:"POST",
    headers:{
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
    }
  })
  const data = await res.json();
}

// // 게시글 좋아요 취소
async function canclelikePost(postId) {
  const url = API_URL + `/post/${postId}/unheart`;
  const res = await fetch(url, {
    method:"DELETE",
    headers:{
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
    }
  })
  const data = await res.json();
}

    // 좋아요 버튼
function BtnLike() {
  let btn_like = document.getElementsByClassName('wrap-like-btn');
  let icon_heart = document.getElementsByClassName('icon-heart');
  let like_count = document.getElementsByClassName('like-count');

  for (let i = 0; i < btn_like.length; i++) {
    btn_like[i].addEventListener('click', () => {
        let postId = btn_like[i].classList[1];
        let HeartCount = btn_like[i].classList[2];
        let isHearted = btn_like[i].classList[3];
      console.log(isHearted)
      console.log(HeartCount)
      if (isHearted == "false") {
          likePost(postId);
          isHearted = "true"
          HeartCount = parseInt(HeartCount) + 1;
          btn_like[i].classList.remove(btn_like[i].classList[3]);
          btn_like[i].classList.remove(btn_like[i].classList[2]);
          btn_like[i].classList.add(HeartCount);
          btn_like[i].classList.add(isHearted);
          icon_heart[i].src = "../images/icon/icon-heart-active.png";
      }
      else {
          canclelikePost(postId);
          isHearted = "false"
          HeartCount = parseInt(HeartCount) - 1;
          btn_like[i].classList.remove(btn_like[i].classList[3]);
          btn_like[i].classList.remove(btn_like[i].classList[2]);
          btn_like[i].classList.add(HeartCount);
          btn_like[i].classList.add(isHearted);
          icon_heart[i].src = "../images/icon/icon-heart.png";
      }
      console.log(isHearted)
      console.log(HeartCount)
      like_count[i].innerHTML = HeartCount;
    })
  }
}