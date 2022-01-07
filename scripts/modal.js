// 아직 더보기 항목 나타나는 것만 구현. 
const btn = document.querySelector('.btn-select');
const list = document.querySelector('.list-member');
btn.addEventListener('click', () => {
  btn.classList.toggle('on');
});
list.addEventListener('click', (event) => {
  if (event.target.nodeName === "BUTTON") {
    btn.innerText = event.target.innerText;
    btn.classList.remove('on');
  }
});