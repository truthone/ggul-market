const accountName = localStorage.getItem("AccountName")
const token = localStorage.getItem("Token")
const wrapProfile = document.querySelector('.res-search');

async function getAccount(searching) {
  while (wrapProfile.firstChild) {
    wrapProfile.removeChild(wrapProfile.firstChild);
  }
  const key = searching.value;
  const url = API_URL + `/user/searchuser/?keyword=${key}`;
  // 계정 정보가 없을 때
  if(!accountName){
    return
  }
  try {
    const res = await fetch(url,{
    method:"GET",
    headers:{
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
      }
    })
    const json = await res.json()
    json.forEach(person => {
      let profile = getMiniProfile(person)
      wrapProfile.appendChild(profile)
      wrapProfile.style.height = "100%";
    });
  }
  catch(err){
    console.log(err)
  }
}