import renderPost from "./show_post.js";
import goToHome from "./show_home.js";
import showWrite from "./show_write.js";
import createDom from "./create_dom.js";

const fn = document.querySelectorAll('.fn');
const container = document.querySelector('.container');
const logo = document.querySelector('.logo');

//해당 게시판의 이름에 따라 url을 설정하고 pushState로 data와 url 저장
export default function pushUrl(name) {
    let url = location.origin + `/${name}`;
    let state = {data : name};
    history.pushState(state, null, url);
}

function createTr(table, board_name) {
    for (let i = 1; i < 11; i++) {
        let tr = document.createElement('tr');

        let td1 = createDom('td', 'list_no', String(i));
        let td2 = createDom('td', 'list_title', `여기는 ${board_name}입니다`)
        td2.addEventListener('click', showPost);
        let td3 = createDom('td', 'list_author', '여인수');
        let td4 = createDom('td', 'list_ptime', '2022-01-04');
        let td5 = createDom('td', 'list_like', '4');

        let arr = [td1, td2, td3, td4, td5];
        arr.forEach((element)=> {
            tr.appendChild(element);
        })
        table.appendChild(tr);
    }
}

function createContainerHead(className, idName, board_name) {
    let board_container = createDom('div', className);
    let content_name = createDom('div', 'content_name');
    let notice_name = createDom('span', 'notice_name', board_name);

    content_name.appendChild(notice_name);
    board_container.appendChild(content_name);
    container.appendChild(board_container);

    //table 요소 만들고 선언
    let content = createDom('table', 'content');
    content.id = idName;
    board_container.appendChild(content);

    //table의 th만들기
    let th1 = createDom('th', null, 'No');
    content.appendChild(th1)
    let th2 = createDom('th', null, '제목');
    content.appendChild(th2)
    let th3 = createDom('th', null, '작성자');
    content.appendChild(th3)
    let th4 = createDom('th', null, '작성 시간');
    content.appendChild(th4)
    let th5 = createDom('th', null, '좋아요');
    content.appendChild(th5)

    //table의 tr 만들기
    createTr(content, board_name);

    //content의 footer 만들기
    let content_footer = createDom('div', 'content_footer');

    let page_ctr_btn = createDom('div', 'page_ctr_btn');

    let pre_page_btn = createDom('button', 'pre_page_btn', '＜');
    //나중에 이 버튼에 이벤트 리스너 추가해서 이전 페이지가 있으면 넘어갈 수 있게 설정해야 함

    let page_num_btn = createDom('button', 'page_num_btn', '1')
    //나중에 이 번호가 몇 번째 페이지 번호인지 알 수 있게 설정해야 함

    let post_page_btn = createDom('button', 'post_page_btn', '＞');
    //나중에 이 버튼에 이벤트 리스너 추가해서 이후 페이지가 있으면 넘어갈 수 있게 설정해야 함

    page_ctr_btn.appendChild(pre_page_btn);
    page_ctr_btn.appendChild(page_num_btn);
    page_ctr_btn.appendChild(post_page_btn);

    //글쓰기 버튼에 이벤트 리스너 추가해서 클릭되면 URL 추가하고 showWrite 호출
    let write_btn = createDom('button', 'write_btn', '글쓰기');
    write_btn.addEventListener('click', () => {
        pushUrl('post_page');
        if(container.childNodes[0]) {  
            container.removeChild(container.childNodes[0]);
            }
        showWrite();
    })

    content_footer.appendChild(page_ctr_btn);
    content_footer.appendChild(write_btn);

    board_container.appendChild(content_footer);
}

function renderBoard(board_id) {
    //container에 내용물이 있으면 내용물을 먼저 지우기
    if(container.childNodes[0]) {  
    container.removeChild(container.childNodes[0]);
    }

    switch (board_id) {
        case '': //메인 페이지
            goToHome();
            break;
        case 'free_board': //자유게시판
            createContainerHead('free_b_container', 'free_board', '자유게시판');
            break;
        case 'secret_board': //비밀게시판
            createContainerHead('secret_b_container', 'secret_board', '비밀게시판');
            break;
        case 'info_board': //정보게시판
            createContainerHead('info_b_container', 'info_board', '정보게시판');
            break;
        case 'prom_board': //홍보게시판
            createContainerHead('prom_b_container', 'prom_board', '홍보게시판');
            break;
        case 'sw_board': //SW게시판
            createContainerHead('sw_b_container', 'sw_board', 'SW게시판');
            break;
        case 'post_page': //게시글 작성
            showWrite();
            break;
    }
}

//pushState로 저장해놨던 data를 기반으로 페이지 앞으로 가기, 뒤로 가기가 발생했을 때 renderHtml 함수 실행
window.onpopstate = function() {
    let location_path = location.pathname;
    renderBoard(location_path.substring(1,));
}


//클릭된 게시판의 이름에 따라 게시판 이동
function switchboard(e){
    if(container.childNodes[0]) {
        container.removeChild(container.childNodes[0]);
    }
    let board_name = e.target.id;
    pushUrl(board_name);
    renderBoard(board_name);
}


//게시글 보여주기
function showPost(event) {
    if(container.childNodes[0]) {
        container.removeChild(container.childNodes[0]);
    }
    //해당 게시물의 종류와 번호를 url에 추가
    let board_name = event.target.parentNode.parentNode.id;
    let post_num = event.target.parentNode.firstChild.innerText;
    switch (board_name) {
        case 'free_board':
            pushUrl(`${board_name}/post${post_num}`);
            renderPost('자유게시판');
            break;
        case 'secret_board':
            pushUrl(`${board_name}/post${post_num}`);
            renderPost('비밀게시판');
            break;
        case 'info_board':
            pushUrl(`${board_name}/post${post_num}`);
            renderPost('정보게시판');
            break;
        case 'prom_board':
            pushUrl(`${board_name}/post${post_num}`);
            renderPost('홍보게시판');
            break;
        case 'sw_board':
            pushUrl(`${board_name}/post${post_num}`);
            renderPost('SW게시판');
            break;
    }

}

//홈페이지 보여주기
function show_home_page() {
    if(container.childNodes[0]) {
        container.removeChild(container.childNodes[0]);
    }
    goToHome();
}

//각 게시판 버튼에 이벤트 추가
fn.forEach(element => 
    element.addEventListener('click', switchboard)
);
//로고 버튼에 메인 페이지로 갈 수 있는 이벤트 추가
logo.addEventListener('click', show_home_page);


