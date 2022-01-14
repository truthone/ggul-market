// home feed API 입니다
// home
const container = document.querySelector('.container');
    if(localStorage.getItem("Token")){
        getFeed()
    }
    else{
        location.href = './2.login.html'
    }

    // async function likePost(postId) {
    //     const res = await fetch(API_URL+"/post/${postId}/heart", {
    //         method: "POST",
    //         headers:{
    //             "Authorization" : `Bearer ${token}`,
    //             "Content-type" : "application/json"
    //         }
    //     });
    //     const data = await res.json();

    //     return data;
    // }

    // async function cancleLikePost(postId) {
    //     const res = await fetch(API_URL+"/post/${postId}/unheart", {
    //         method: "DELETE",
    //         headers:{
    //             "Authorization" : `Bearer ${token}`,
    //             "Content-type" : "application/json"
    //         }
    //     });
    //     const data = await res.json();
    //     return data;
    // }

    async function getFeed() {
        const token = localStorage.getItem("Token")
        const res = await fetch(API_URL+"/post/feed",{
            method:"GET",
            headers:{
                "Authorization" : `Bearer ${token}`,
                "Content-type" : "application/json"
            }
        })
        const json = await res.json()
        const posts = json.posts
        //forEach문으로 받아온 데이터 전부 살펴보면서 그려주는 부분
        posts.forEach(post => {
            const authorImage = post.author.image
            const authorAccount = post.author.accountname
            const authorName = post.author.username
            const commentCount = post.commentCount
            const content = post.content
            const image = post.image
            const heartCount = post.heartCount
            const hearted = post.hearted
            const date = post.createdAt.slice(0, 10).split('-')
            const id = post.id

            // console.log(post.id)
            // console.log(post.heartCount)
            // console.log(post.hearted)
            // console.log(post.hearted)
            // const icon_heart = document.querySelector(".icon-heart");
            // if (post.hearted == true) {
            //     icon_heart.src = "../images/icon/icon-heart-active.png";          
            // }



            
            if (post.image) {
                document.querySelector(".container").innerHTML+=`
                <section class="feed-cont has-cont">
                  <h2 class="txt-hide">팔로워 피드</h2>
                    <article class="home-post">
                        <h5 class="txt-hide">피드 게시글</h5>
                        <ul class="wrap-profile">
                        <li>
                            <img src=${post.author.image} alt="기본프로필 소형" class="basic-profile">
                        </li>
                        <li>
                            <ul class="wrap-right">
                            <li class="user-name">${post.author.username}</li>
                            <li class="user-id">@ ${post.author.accountname}</li>
                            </ul>
                        </li>
                        </ul>
                    <div class="main-feed">
                        <p class="txt-feed">${post.content}</p>
                        <img src=${post.image} alt="피드 이미지" class="img-feed">
                        <ul class="wrap-reaction">
                            <li class="wrap-like-btn">
                            <button type="button"><img src="../images/icon/icon-heart.png" alt="빈 하트 아이콘" class="icon-heart"></button>
                            <span class="like-count">${post.heartCount}</span>
                            </li>
                            <li>
                            <a href="#10.html">
                                <img src="../images/icon/icon-message-circle.png" alt="댓글 이미지" class="chat-icon-message-circle">
                            </a>
                                <span>${post.commentCount}</span>
                            </li>
                        </ul>
                        <small class="txt-date">${date[0]}년 ${date[1]}월 ${date[2]}일</small>
                    </div>
                <article>
            </section>
            `
            }
            else {
                document.querySelector(".container").innerHTML+=`
                <section class="feed-cont has-cont">
                  <h2 class="txt-hide">팔로워 피드</h2>
                    <article class="home-post">
                        <h5 class="txt-hide">피드 게시글</h5>
                        <ul class="wrap-profile">
                        <li>
                            <img src=${post.author.image} alt="기본프로필 소형" class="basic-profile">
                        </li>
                        <li>
                            <ul class="wrap-right">
                            <li class="user-name">${post.author.username}</li>
                            <li class="user-id">@ ${post.author.accountname}</li>
                            </ul>
                        </li>
                        </ul>
                    <div class="main-feed">
                        <p class="txt-feed">${post.content}</p>
                        <ul class="wrap-reaction">
                            <li class="wrap-like-btn">
                            <button type="button"><img src="../images/icon/icon-heart.png" alt="빈 하트 아이콘" class="icon-heart"></button>
                            <span class="like-count">${post.heartCount}</span>
                            </li>
                            <li>
                            <a href="#10.html">
                                <img src="../images/icon/icon-message-circle.png" alt="댓글 이미지" class="chat-icon-message-circle">
                            </a>
                                <span>${post.commentCount}</span>
                            </li>
                        </ul>
                        <small class="txt-date">${date[0]}년 ${date[1]}월 ${date[2]}일</small>
                    </div>
                <article>
            </section>
            `
            }
            const icon_heart = document.querySelector(".icon-heart");
            
            // if (post.hearted == true) {
            //     icon_heart.src = "../images/icon/icon-heart-active.png";    
            // }
            console.log(post.hearted)
            console.log(icon_heart)
            // const icon_heart = document.getElementsByClassName("icon-heart");
            // for (let i = 0; i <icon_heart.length; i++) {
            //     if (post.hearted[i] == true) {
            //         icon_heart[i].src = "../images/icon/icon-heart-active.png";          
            //     }
            // }
        });
    }
    getFeed();
    
    // const likeBtn = document.querySelector(".wrap-like-btn");
    // const like_count = document.querySelector(".like-count");
    // this.likeBtnEvent(likeBtn, item);
    // if (item["hearted"]) {
    //     likeBtn.classList.add("like-active");
    // }



    // function likeBtnEvent(element, item) {
    //     const likeCount = element.querySelector(".like-count");
    //     const id = item["id"];

    //     let data = {};

    //     element.addEventListener("click", async () => {
    //         if(element.classList.contains("like-active")){
    //             element.classList.remove("like-active");
    //             data = await this.cancleLikePost(id);
    //             likeCount.textContent = data["post"]["heartCount"];
    //             await this.getPostData();
    //         } else {
    //             element.classList.add("like-active");
    //             data = await this.likePost(id);
    //             likeCount.textContent = data["post"]["heartCount"];
    //             await this.getPostData();
    //         }
    //     })
    // }



    // let btn_like = document.getElementsByClassName('wrap-like-btn');
    // let icon_heart = document.getElementsByClassName('icon-heart');
    // btn_like.addEventListener('click', () => {
    //     if (post.hearted == false) {
    //         icon_heart.src = "../images/icon/icon-heart.png"
    //         post.hearted == true;
    //     }
    //     else {
    //         icon_heart.src = "../images/icon/icon-heart-active.png";
    //         post.hearted == false;
    //     }
    // })


    // let btn_like = document.getElementsByClassName('wrap-like-btn');
    // let icon_heart = document.getElementsByClassName('icon-heart');
    // let like_count = document.getElementsByClassName('like-count');
    // let btn_check = Array.from({length: btn_like.length}, () => 0);
    // let number = new Array();
    // for (let i = 0; i < like_count.length; i++) {
    //     number[i] = like_count[i].innerHTML;
    // }
    
    
    // for (let i = 0; i <btn_like.length; i++) {
    //   btn_like[i].addEventListener('click', () => {
    //     if (btn_check[i] == 0) {
    //       btn_check[i] = 1;
    //       icon_heart[i].src = "../images/icon/icon-heart-active.png";
    //       number[i] = parseInt(number[i]) + 1;
    //     }
    //     else {
    //       btn_check[i] = 0;
    //       icon_heart[i].src = "../images/icon/icon-heart.png";
    //       number[i] = parseInt(number[i]) - 1;
    //     }
    //     like_count[i].innerHTML = number[i];
    //   })
    // }


    
    


