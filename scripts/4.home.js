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
            const heartCount = post.heartCount
            const hearted = post.hearted
            document.querySelector(".container").innerHTML+=`
            <div class="post-container">
                <img class="profileimg" src="${authorImage}"/>
                <div class="h">${authorAccount}</div>
                <div class="h">${authorName}</div>
                <div class="h">${content}</div>
                <div class="h">${commentCount}</div>
                <div class="${hearted ?"yes":"no"}">${hearted}</div>
                
            </div>                
            `
        });
    }
    getFeed()


