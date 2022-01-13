const login_popup_container = document.querySelector('#login_popup_container');
const login_id = document.querySelector('#login_id');
const login_btn = document.querySelector('.login_btn');
const btn_to_login = document.querySelector('.btn_to_login');

function LoginPost() {
    $.ajax({
        type: "POST",
        url:'/',
        data: {user_id :login_id.value},
        dataType: 'json',
        success: (text)=>{
            if(text.istrue === true){
                login_btn.innerText = text.user_name;
                login_btn.style.cursor = 'default';
            }
            else{
                window.alert('아이디 불일치');
            }
        },
        error: (log)=>{console.log(log)}
    });
}
   
btn_to_login.addEventListener('click', LoginPost);

