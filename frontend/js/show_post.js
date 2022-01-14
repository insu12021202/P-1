import createDom from "./create_dom.js";
import postModify from "./post_modify.js";
import postDelete from "./post_delete.js";
const container = document.querySelector('.container'); 

export default function renderPost(board_name, response) {
    let data_post_board = response[0].post_board;
    let data_post_num = response[0].id;
    let data_post_title = response[0].post_title;
    let data_post_author = response[0].post_author;
    let data_post_content = response[0].post_content;
    let data_post_time = response[0].post_time.substring(0,10);
    let data_post_like = response[0].post_like;
    if(data_post_like == null) {
        data_post_like = '0';
    };
    if(container.childNodes[0]) {
        container.removeChild(container.childNodes[0]);
    }

    let post_page = createDom('div', 'post_page');
    let post_page_header = createDom('div', 'post_page_header');
    let post_board = createDom('span','post_board',board_name);

    post_page_header.appendChild(post_board);
    post_page.appendChild(post_page_header);

    let post_title_container = createDom('div', 'post_title_container');

    let post_title = createDom('span', 'post_title', `${data_post_title}`);
    //게시글 제목은 데이터 받아와서 넣기

    let post_info = createDom('div', 'post_info');

    let post_author = createDom('span', 'post_author', `${data_post_author}`);
    // 작성자 데이터 넣기

    let post_time = createDom('span', 'post_time', `${data_post_time}`);
    // 작성 시간 데이터 넣기

    let post_views = createDom('span', 'post_views', `${data_post_like}`);
     // 좋아요 개수 데이터 넣기

    post_info.appendChild(post_author);
    post_info.appendChild(post_time);
    post_info.appendChild(post_views);

    post_title_container.appendChild(post_title);
    post_title_container.appendChild(post_info);

    post_page.appendChild(post_title_container);

    let post_content_container = createDom('div', 'post_content_container');

    let post_content = createDom('span', 'post_content', `${data_post_content}`);
    // 게시물 내용 데이터 넣기

    post_content_container.appendChild(post_content);
    post_page.appendChild(post_content_container);

    let post_page_footer = createDom('div', 'post_page_footer');
    let post_modify_btn = createDom('button', 'post_modify_btn', '수정하기');
    // 수정하기 버튼을 클릭하면 postModify 실행
    post_modify_btn.addEventListener('click', ()=>{
        postModify(data_post_num, data_post_board, data_post_author);
    });
    let post_delete_btn = createDom('button', 'post_delete_btn', '삭제하기');
    // 삭제하기 버튼을 클릭하면 postDelete 실행
    post_delete_btn.addEventListener('click', ()=>{
        postDelete(data_post_author);
    })
    post_page_footer.appendChild(post_modify_btn);
    post_page_footer.appendChild(post_delete_btn);

    post_page.appendChild(post_page_footer);

    container.appendChild(post_page);

}
