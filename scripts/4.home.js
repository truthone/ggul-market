// home
if(localStorage.getItem("Token")){
    getFeed()
}
else{
    location.href = './2.login.html'
}




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
    // console.log(json)

    // 게시물 없음
    if (json.post == []){
        const feed = document.querySelector('feed-cont')
        feed.classList.remove('no-cont');
        return
    }

    let idx = 0;
    let isMyprofile = false;
    for(let post of json.posts) {
        // const authorimg = post.author.image
        const authorAccount = post.author.accountname
        // const authorName = post.author.username
        // const commentCount = post.commentCount
        // const content = post.content
        // const image = post.image
        // const heartCount = post.heartCount
        // const hearted = post.hearted
        // console.log(hearted)
        // console.log(heartCount)

        // let id = post.id;
        // postId = post.id;
        // console.log(postId)
        
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
        // console.log(post.id)
        container.appendChild(list)
        
        if (imageLength > 1){
            handleImageScroll(++idx, imageLength)
        }
        
    }
    getBtn();
    BtnLike();
    // console.log(postId)
}
// let btn_like = document.getElementsByClassName('.wrap-like-btn');
// let icon_heart = document.getElementsByClassName('.icon-heart');
// let like_count = document.getElementsByClassName('.like-count');
const btn_like = document.querySelectorAll('.wrap-like-btn');
const icon_heart = document.querySelectorAll('.icon_heart');
//좋아요
function BtnLike () {
    // console.log(hearted)
    btn_like.forEach(btn => {
        btn.addEventListener('click', () => {
            if (hearted == false) {
              hearted = true;
              icon_heart.src = "../images/icon/icon-heart-active.png";
              heartCount = parseInt(heartCount) + 1;
            }
            else {
              hearted = false;
              icon_heart.src = "../images/icon/icon-heart.png";
              heartCount = parseInt(heartCount) - 1;
            }
          })
    })
}