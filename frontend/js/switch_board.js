import renderPost from "./show_post.js";

const fn = document.querySelectorAll('.fn');
const container = document.querySelector('.container');
const body = document.body;
const logo = document.querySelector('.logo');
const list_title = document.querySelector('.list_title');

//해당 게시판의 이름에 따라 url을 설정하고 pushState로 data와 url 저장
function pushUrl(name) {
    let url = location.origin + `/${name}`;
    let state = {data : name};
    history.pushState(state, null, url);
}

function createTr(table, board_name) {
    for (let i = 1; i < 11; i++) {
        let tr = document.createElement('tr');
        
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        td2.addEventListener('click', renderPost);
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');

        td1.className = 'list_no';
        td1.innerText = String(i);

        td2.className = 'list_title';
        td2.innerText = `여기는 ${board_name}입니다`

        td3.className = 'list_author';
        td3.innerText = '여인수';

        td4.className = 'list_ptime';
        td4.innerText = '2022-01-04';

        td5.className = 'list_like';
        td5.innerText = '4';

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        table.appendChild(tr);
    }
}

function createContainerHead(className, idName, board_name) {
    let board_container = document.createElement('div');
    board_container.className = className;
    let content_name = document.createElement('div');
    content_name.className = 'content_name';
    let notice_name = document.createElement('span');
    notice_name.innerText = board_name;
    notice_name.className = 'notice_name';
    content_name.appendChild(notice_name);
    board_container.appendChild(content_name);
    container.appendChild(board_container);

    //table 요소 만들고 선언
    let content = document.createElement('table');
    content.className = 'content';
    content.id = idName;
    board_container.appendChild(content);

    //table의 th만들기
    let th1 = document.createElement('th');
    th1.innerText = 'No';
    content.appendChild(th1)
    let th2 = document.createElement('th');
    th2.innerText = '제목';
    content.appendChild(th2)
    let th3 = document.createElement('th');
    th3.innerText = '작성자';
    content.appendChild(th3)
    let th4 = document.createElement('th');
    th4.innerText = '작성시간';
    content.appendChild(th4)
    let th5 = document.createElement('th');
    th5.innerText = '좋아요';
    content.appendChild(th5)

    //table의 tr 만들기
    createTr(content, board_name);

    //content의 footer 만들기
    let content_footer = document.createElement('div');
    content_footer.className = 'content_footer';

    let page_ctr_btn = document.createElement('div');
    page_ctr_btn.className = 'page_ctr_btn';

    let pre_page_btn = document.createElement('button');
    pre_page_btn.className = "pre_page_btn";
    //나중에 이 버튼에 이벤트 리스너 추가해서 이전 페이지가 있으면 넘어갈 수 있게 설정해야 함
    pre_page_btn.innerText = '＜';

    let page_num_btn = document.createElement('button');
    page_num_btn.className = "page_num_btn";
    //나중에 이 번호가 몇 번째 페이지 번호인지 알 수 있게 설정해야 함
    page_num_btn.innerText = '1';

    let post_page_btn = document.createElement('button');
    post_page_btn.className = "post_page_btn";
    //나중에 이 버튼에 이벤트 리스너 추가해서 이후 페이지가 있으면 넘어갈 수 있게 설정해야 함
    post_page_btn.innerText = '＞';

    page_ctr_btn.appendChild(pre_page_btn);
    page_ctr_btn.appendChild(page_num_btn);
    page_ctr_btn.appendChild(post_page_btn);

    let write_btn = document.createElement('button');
    write_btn.className = 'write_btn';
    write_btn.innerText = '글쓰기';
    write_btn.addEventListener('click', () => {
        console.log('글쓰기 버튼 클릭됨');
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

//메인 페이지를 그려주는 함수
function goToHome() {
    pushUrl('');
    if(container.childNodes[0]) {
        container.removeChild(container.childNodes[0]);
    }
    const home_bg = document.createElement('div');
    const home_img = document.createElement('img');
    home_img.setAttribute("src", "../images/home.png");
    home_img.setAttribute("width", '100%');
    home_img.setAttribute("height", '100%');
    home_bg.appendChild(home_img);
    container.appendChild(home_bg);
}

function showPost(event) {
    //해당 게시물의 종류와 번호를 url에 추가
    let board_name = event.target.parentNode.parentNode.id;
    let post_num = event.target.parentNode.firstChild.innerText;
    pushUrl(`${board_name}/post${post_num}`);
    renderPost();

}

//각 게시판 버튼에 이벤트 추가
fn.forEach(element => 
    element.addEventListener('click', switchboard)
);
//로고 버튼에 메인 페이지로 갈 수 있는 이벤트 추가
logo.addEventListener('click', goToHome);


