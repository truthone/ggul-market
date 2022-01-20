import {ACCOUNT_NAME} from './constants.js'
import {getFollowingList, getProfile} from './api.js';

let targetAccount = ACCOUNT_NAME;
let isMyprofile = false;
initPage();
getProfile(targetAccount, isMyprofile)
function initPage() {
  getFollowingList()
	if (location.search != '') {
    targetAccount = location.search.replace('?', '');
	}
  // 로그인 정보와 프로필이 일치
  if (ACCOUNT_NAME == targetAccount) {
    isMyprofile = true;
  }
  document.querySelector('.cont-followers').href=`7.followers.html?${targetAccount}?follower`
  document.querySelector('.cont-followings').href=`7.followers.html?${targetAccount}?following`
}

const btnViewList = document.querySelector('#toggle-list'); // 목록형 버튼
const btnViewAlbum = document.querySelector('#toggle-album'); // 앨범형 버튼
const viewList = document.querySelector('.list-post') // 목록형 보기
const viewAlbum = document.querySelector('.grid-post') // 앨범형 보기

// 목록형, 앨범형 토글
function toggleView(show, hide) {
  show.firstChild.classList.toggle('off-view')
  show.firstChild.classList.toggle('on-view')
  show.lastChild.classList.toggle('on-view')
  show.lastChild.classList.toggle('off-view')

  hide.firstChild.classList.toggle('on-view')
  hide.firstChild.classList.toggle('off-view')
  hide.lastChild.classList.toggle('off-view')
  hide.lastChild.classList.toggle('on-view')
}

btnViewList.addEventListener('click', () => {
  if (btnViewList.firstChild.classList.contains('off-view')) {
    toggleView(btnViewList, btnViewAlbum);
    viewList.style.display = "block";
    viewAlbum.style.display = "none";
  }
})

btnViewAlbum.addEventListener('click', () => {
  if (btnViewAlbum.firstChild.classList.contains('off-view')) {
    toggleView(btnViewAlbum, btnViewList);
    viewAlbum.style.display = "grid";
    viewList.style.display = "none";
  }
})
