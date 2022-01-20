import {getFollowing, getFollower} from './api.js'

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