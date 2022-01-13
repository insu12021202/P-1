const login_btn = document.querySelector('.login_btn');
const login_bg = document.querySelector('.login_bg');
const close_login_btn = document.querySelector('.close_login_btn');
const btn_to_login = document.querySelector('.btn_to_login');
const btn_to_register = document.querySelector('.btn_to_register');

function toggleLoginPopup() {
    login_bg.classList.toggle('hidden');
}

function postLoginData() {
    login_bg.classList.toggle('hidden');
}

login_btn.addEventListener('click', toggleLoginPopup);
close_login_btn.addEventListener('click', toggleLoginPopup);
btn_to_login.addEventListener('click', postLoginData);
btn_to_register.addEventListener('click', toggleLoginPopup);