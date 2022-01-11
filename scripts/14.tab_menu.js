let btn_home = document.querySelector('.tab-menu-home');
let btn_chat = document.querySelector('.tab-menu-chat');
let btn_profile = document.querySelector('.tab-menu-profile');
let home_icon = document.querySelector('.home-icon');
let chat_icon = document.querySelector('.chat-icon');
let profile_icon = document.querySelector('.profile-icon');
let home_text = document.querySelector('.home-text');
let chat_text = document.querySelector('.chat-text');
let profile_text = document.querySelector('.profile-text');


btn_home.addEventListener('click', () => {
    home_text.style.color = "#F26E22";
    home_icon.src = "../images/icon/icon-home-fill.png";
    chat_text.style.color = "#767676";
    chat_icon.src = "../images/icon/icon-message-circle.png";
    profile_text.style.color = "#767676";
    profile_icon.src = "../images/icon/icon-user.png";
})

btn_chat.addEventListener('click', () => {
    home_text.style.color = "#767676";
    home_icon.src = "../images/icon/icon-home.png";
    chat_text.style.color = "#F26E22";
    chat_icon.src = "../images/icon/icon-message-circle-fill.png";
    profile_text.style.color = "#767676";
    profile_icon.src = "../images/icon/icon-user.png";
})

btn_profile.addEventListener('click', () => {
    home_text.style.color = "#767676";
    home_icon.src = "../images/icon/icon-home.png";
    chat_text.style.color = "#767676";
    chat_icon.src = "../images/icon/icon-message-circle.png";
    profile_text.style.color = "#F26E22";
    profile_icon.src = "../images/icon/icon-user-fill.png";
})

// btn_home.addEventListener('click', () => {
//     if (btn_home.classList.contains('activ')){
//         btn_chat.classList.remove('activ');
//         btn_profile.classList.remove('activ');
//     }
//     else {
//         btn_chat.classList.add('activ');
//         home_text.style.color = "#F26E22";
//         home_icon.src = "../images/icon/icon-home-fill.png";
//     }
// })