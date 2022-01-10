login_btn = document.querySelector('.login_btn');
login_bg = document.querySelector('.login_bg');
close_login_btn = document.querySelector('.close_login_btn');
btn_to_login = document.querySelector('.btn_to_login');

function toggleLogin() {
    login_bg.classList.toggle('hidden');
}

function postLoginData() {
    login_bg.classList.toggle('hidden');
}

login_btn.addEventListener('click', toggleLogin);
close_login_btn.addEventListener('click', toggleLogin);
btn_to_login.addEventListener('click', postLoginData);