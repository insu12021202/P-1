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

function createTr(table, board_name, response) {
    for(let i = 0; i < response.length; i++) {
        let post_num = response[i].id;
        let tr = document.createElement('tr');

        let td1 = createDom('td', 'list_no', String(i+1));
        let td2 = createDom('td', 'list_title', `${response[i].post_title}`)

        //게시글 제목이 클릭되면 showPost 실행
        td2.addEventListener('click', function(){
            showPost(board_name, post_num);
        });

        //만약 작성자 이름에 null이 있으면 '익명'으로 교체
        let user_name = response[i].post_author;
        if(response[i].post_author == null){
            user_name = '익명';
        }
        let td3 = createDom('td', 'list_author', `${user_name}`);
        let td4 = createDom('td', 'list_ptime', `${response[i].post_time.substring(0,10)}`);
        //만약 좋아요 개수가 null이면 0으로 표시
        let post_like = ''
        if(response[i].post_like == null){
            post_like = '0';
        }
        let td5 = createDom('td', 'list_like', `${post_like}`);

        let arr = [td1, td2, td3, td4, td5];
        arr.forEach((element)=> {
            tr.appendChild(element);
        })
        table.appendChild(tr);
    }
}

function createContainerHead(className, idName, board_name, response) {
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
    let th4 = createDom('th', null, '작성 날짜');
    content.appendChild(th4)
    let th5 = createDom('th', null, '좋아요');
    content.appendChild(th5)

    //table의 tr 만들기
    createTr(content, board_name, response);

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

function renderBoard(board_id, response) {
    // /게시판 url로 오면 게시판 데이터 받아오기
    $.ajax({
        type :'GET',
        url : `/${board_id}`,
        data : {board_name : board_id},
        dataType: 'json',
        success: function(response){
            //container에 내용물이 있으면 내용물을 먼저 지우기
        if(container.childNodes[0]) {  
            container.removeChild(container.childNodes[0]);
            }
    
        switch (board_id) {
            case '': //메인 페이지
                goToHome();
                break;
            case 'free_board': //자유게시판
                createContainerHead('free_b_container', 'free_board', '자유게시판', response);
                break;
            case 'secret_board': //비밀게시판
                createContainerHead('secret_b_container', 'secret_board', '비밀게시판', response);
                break;
            case 'info_board': //정보게시판
                createContainerHead('info_b_container', 'info_board', '정보게시판', response);
                break;
            case 'prom_board': //홍보게시판
                createContainerHead('prom_b_container', 'prom_board', '홍보게시판', response);
                break;
            case 'sw_board': //SW게시판
                createContainerHead('sw_b_container', 'sw_board', 'SW게시판', response);
                break;
            case 'post_page': //게시글 작성
                showWrite();
                break;
        }   //만약 게시글 주소를 가지고 있으면 showPost에 post_num 전달해서 그리기
            if(board_id.includes('free_board/post')){
                showPost('자유게시판',board_id.substr(-1));
            }if(board_id.includes('secret_board/post')){
                showPost('비밀게시판',board_id.substr(-1));
            }if(board_id.includes('info_board/post')){
                showPost('정보게시판',board_id.substr(-1));
            }if(board_id.includes('prom_board/post')){
                showPost('홍보게시판',board_id.substr(-1));
            }if(board_id.includes('sw_board/post')){
                showPost('SW게시판',board_id.substr(-1));
            }
        }
    })
    
}

//pushState로 저장해놨던 data를 기반으로 페이지 앞으로 가기, 뒤로 가기가 발생했을 때 renderBoard 함수 실행
window.onpopstate = function(e) {
    let location_path = location.pathname;
    renderBoard(location_path.substring(1,));
}


//클릭된 게시판의 이름에 따라 게시판 이동
function switchboard(e){
    if(container.childNodes[0]) {
        container.removeChild(container.childNodes[0]);
    }
    let board_name = e.target.id;
    //해당 게시판의 게시글들을 데이터베이스에서 받아오기
    pushUrl(board_name);
    renderBoard(board_name);
}


//게시글 보여주기
function showPost(board_name, post_num) {
    if(container.childNodes[0]) {
        container.removeChild(container.childNodes[0]);
    }
    //해당 게시물의 종류와 번호를 url에 추가
    //서버에 요청해서 해당 게시글 데이터 받아오기
    let board_name_en = '';
    switch (board_name) {
        case '자유게시판':
            board_name_en = 'free_board';
            break;
        case '비밀게시판':
            board_name_en = 'secret_board';
            break;
        case '정보게시판':
            board_name_en = 'info_board';
        break;
        case '홍보게시판':
            board_name_en = 'prom_board';
        break;
        case 'SW게시판':
            board_name_en = 'sw_board';
        break;
    }
    $.ajax({
        type: "GET",
        url:`/${board_name_en}/post${post_num}`,
        dataType: 'json',
        success: (response)=>{
            //서버로부터 받아온 게시글 데이터를 renderPost에 넘겨주기
            switch (board_name_en) {
                case 'free_board':
                    pushUrl(`${board_name_en}/post${post_num}`);
                    renderPost('자유게시판', response);
                    break;
                case 'secret_board':
                    pushUrl(`${board_name_en}/post${post_num}`);
                    renderPost('비밀게시판', response);
                    break;
                case 'info_board':
                    pushUrl(`${board_name_en}/post${post_num}`);
                    renderPost('정보게시판', response);
                    break;
                case 'prom_board':
                    pushUrl(`${board_name_en}/post${post_num}`);
                    renderPost('홍보게시판', response);
                    break;
                case 'sw_board':
                    pushUrl(`${board_name_en}/post${post_num}`);
                    renderPost('SW게시판', response);
                    break;
            }
        },
        error: (log)=>{console.log(log)}
    });
    

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


