// **7. 팔로워, 팔로잉 목록**
// - 사용자 프로필 페이지에서 팔로워 및 팔로잉 수를 클릭하면 나타나는 페이지입니다.
// - 목록은 사용자 프로필 사진, 이름, 계정 ID, 팔로우(또는 취소) 버튼으로 구성됩니다.

const accountName = localStorage.getItem("Target")
const token = localStorage.getItem("Token")
const id = localStorage.getItem("Id")
initPage();
function initPage() {
  const tit_txt = document.querySelector('.tit-follow')
  let option = ''
	if (location.search != '') {
    option = location.search.replace('?', '');
    option = option.split('?')
	}
  if (option[1] === "follower"){
    getFollower(option[0])
  }
  else if (option[1] === "following") {
    getFollowing(option[0])
    tit_txt.textContent = "Following"
  }
  else {
    history.back();
  }
}

// API
async function getFollowing(accountName) {
  // const url = API_URL + `/profile/${accountName}/following`
  const url = API_URL + `/profile/${accountName}/following?limit=Number&skip=Number`
  const res = await fetch(url,{
      method:"GET",
      headers:{
          "Authorization" : `Bearer ${token}`,
          "Content-type" : "application/json"
      }
  })
  const followingList = document.querySelector('.lst-follower')
  const json = await res.json()

  for (let following of json) {
    let follow = getFollowProfile(following);
    followingList.appendChild(follow)
  }
  followingCheck()
}

async function getFollower(accountName) {
  // const url = API_URL + `/profile/${accountName}/follower?limit=2`
  const url = API_URL + `/profile/${accountName}/follower`
  const res = await fetch(url,{
      method:"GET",
      headers:{
          "Authorization" : `Bearer ${token}`,
          "Content-type" : "application/json"
      }
  })
  const followerList = document.querySelector('.lst-follower')
  const json = await res.json()

  for (let follower of json) {
    let follow = getFollowProfile(follower);
    followerList.appendChild(follow)
  }
  followingCheck()
}

function getFollowProfile(target) {
  const goURL = `6.profile.html?${target.accountname}`
  let state = target.follower.includes(id)?`<li><button type="button" class="S-button btn activ btn-follower_view_follow" id=${target.accountname}>취소</button></li>`:`<li><button type="button" class="S-button btn btn-follower_view_follow" id=${target.accountname}>팔로우</button></li>`;
  let follow = document.createElement('article');
    follow.classList = 'box-profile'
    follow.innerHTML = `<ul class="wrap-profile">
    <li>
      <a href=${goURL}><img src=${target.image} onerror="this.src='../images/basic-profile-img.png';" alt="기본프로필 소형" class="basic-profile"></a>
    </li>
    <li>
      <a href=${goURL}>
        <ul class="wrap-right">
          <li class="user-name">${target.username}</li>
          <li class="user-id">@ ${target.accountname}</li>
        </ul>
      </a>
    </li>
    ${state}
  </ul>`

  return follow
}

// - 내가 팔로우 한 사용자일 경우 취소 버튼이, 내가 팔로우 하지 않은 사용자일 경우에는 팔로우 버튼이 표시됩니다. 단, 팔로우 기능은 구현하지 않습니다. 버튼의 변화만 구현하세요.

function followingCheck(){
  const btnFollowCancel = document.querySelectorAll('.btn-follower_view_follow');

  btnFollowCancel.forEach(btn => 
  btn.addEventListener("click", () => {
    btn.classList.toggle('activ')
    console.log(btn.id)
    if (btn.classList.contains('activ')){
      btn.textContent="취소";
      follow(btn.id)
    }
    else {
      btn.textContent="팔로우";
      unfollow(btn.id)
    }
  })
)
}