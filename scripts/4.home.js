// home feed API 입니다
// home
const container = document.querySelector('.container');
    if(localStorage.getItem("Token")){
        getFeed()
    }
    else{
        location.href = './2.login.html'
    }

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
            

            // for(let post of json.post){
            //     const imageArr = post.image.split(',')
            //     let images = ''
            //     for (let image of imageArr){
            //       images += `<img src=${image} alt="피드 이미지" class="img-feed">`
            //     }
            

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
                            <span>12</span>
                        </li>
                    </ul>
                    <small class="txt-date">${date[0]}년 ${date[1]}월 ${date[2]}일</small>
                </div>
            <article>
        </section>
        `
        });
    }
    getFeed()


