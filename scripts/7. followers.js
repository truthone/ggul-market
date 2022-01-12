// **7. 팔로워, 팔로잉 목록**

// - 사용자 프로필 페이지에서 팔로워 및 팔로잉 수를 클릭하면 나타나는 페이지입니다.
// - 목록은 사용자 프로필 사진, 이름, 계정 ID, 팔로우(또는 취소) 버튼으로 구성됩니다.
// - 내가 팔로우 한 사용자일 경우 취소 버튼이, 내가 팔로우 하지 않은 사용자일 경우에는 팔로우 버튼이 표시됩니다. 단, 팔로우 기능은 구현하지 않습니다. 버튼의 변화만 구현하세요.

const btnFollowCancel = document.querySelectorAll('.btn-follower_view_follow');

btnFollowCancel.forEach(btn => 
  btn.addEventListener("click", () => {
    btn.classList.toggle('activ')
    if (btn.classList.contains('activ')){
      btn.textContent="취소";
    }
    else {
      btn.textContent="팔로우";
    }
  })
)

// API
async function getProfile() {
  const url = "http://146.56.183.55:5050/profile/chowonbeom"
  const token = localStorage.getItem("Token")
  const res = await fetch(url,{
      method:"GET",
      headers:{
          "Authorization" : `Bearer ${token}`,
          "Content-type" : "application/json"
      }
  })
  // console.log(res);
  const json = await res.json()
  console.log(json)
  console.log(json[0])
  console.log("=-=-=-=-=-=-=-이 위는 개인프로필 정보입니다.=-=-=-=-=-=-=-=-=-=-=-=")
}

getProfile()
async function getFollowing() {
  const url = "http://146.56.183.55:5050/profile/chowonbeom/following"
  const token = localStorage.getItem("Token")
  const res = await fetch(url,{
      method:"GET",
      headers:{
          "Authorization" : `Bearer ${token}`,
          "Content-type" : "application/json"
      }
  })
  console.log(res);
  const json = await res.json()
  console.log(json)
  console.log("=-=-=-=-=-=-=-이 위는 팔로잉리스트 정보입니다.=-=-=-=-=-=-=-=-=-=-=-=")

}
async function getFollow(accountname) {
  const url = `http://146.56.183.55:5050/profile/${accountname}/follower?limit=2`
  const token = localStorage.getItem("Token")
  const res = await fetch(url,{
      method:"GET",
      headers:{
          "Authorization" : `Bearer ${token}`,
          "Content-type" : "application/json"
      }
  })
  console.log(res);
  const json = await res.json()
  console.log(json)
  console.log("=-=-=-=-=-=-=-이 위는 팔로워리스트 정보입니다.=-=-=-=-=-=-=-=-=-=-=-=")

}
getFollowing()
getFollow("chowonbeom")