import pushUrl from "./switch_board.js";
import createDom from "./create_dom.js";

const btn_to_register = document.querySelector('.btn_to_register');
const container = document.querySelector('.container');

function goToRegister() {
    if(container.childNodes[0]) {  
        container.removeChild(container.childNodes[0]);
        }
    pushUrl('register');
    renderRegister();
}

function renderRegister() {
    if(container.childNodes[0]) {  
        container.removeChild(container.childNodes[0]);
        }
    let register = createDom('div', 'register');
    // register_header
    let register_header = createDom('div', 'register_header');
    let register_title = createDom('span', 'register_title', '회원 가입');
    let register_help = createDom('span', 'register_help', '양식에 맞추어 회원 정보를 입력해주세요.');
    register_header.appendChild(register_title);
    register_header.appendChild(register_help);

    // register_container
    let register_container = createDom('div', 'register_container');
    let register_name = createDom('input', 'register_name');
    register_name.setAttribute('placeholder', '이름');
    let register_id = createDom('input', 'register_id');
    register_id.setAttribute('placeholder', '아이디');
    register_container.appendChild(register_name);
    register_container.appendChild(register_id);

    // register_footer
    let register_footer = createDom('div', 'register_footer');
    let register_btn = createDom('button', 'register_btn', '회원 가입');

    //회원가입 버튼 클릭시 서버로 회원가입 데이터 전송
    register_btn.addEventListener('click', ()=>{
        $.ajax({
            type: "POST",
            url:'/register',
            data: {
                user_name : register_name.value,
                user_id : register_id.value
            },
            dataType: 'json',
            success: (response)=>{
                if(response.success == 'success'){
                    window.alert('회원가입이 완료되었습니다. 다시 로그인 해주세요.');
                }
            },
            error: (log)=>{console.log(log)}
        });
        //데이터 전송이 되면 이전 화면으로 돌아가게끔 설정
        window.history.back();
    })

    register_footer.appendChild(register_btn);

    // register에 모두 append
    let arr = [register_header, register_container, register_footer];
    arr.forEach((element) => {
        register.appendChild(element);
    })
    container.appendChild(register);
}

btn_to_register.addEventListener('click', goToRegister);

