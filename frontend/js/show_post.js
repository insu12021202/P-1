import createDom from "./create_dom.js";
const container = document.querySelector('.container'); 

export default function renderPost(board_name) {
    if(container.childNodes[0]) {
        container.removeChild(container.childNodes[0]);
    }

    let post_page = createDom('div', 'post_page');
    let post_page_header = createDom('div', 'post_page_header');
    let post_board = createDom('span','post_board',board_name);

    post_page_header.appendChild(post_board);
    post_page.appendChild(post_page_header);

    let post_title_container = createDom('div', 'post_title_container');

    let post_title = createDom('span', 'post_title', '이것은 게시물의 제목입니다!');
    //게시글 제목은 데이터 받아와서 넣기

    let post_info = createDom('div', 'post_info');

    let post_author = createDom('span', 'post_author', '작성자');
    // 작성자 데이터 넣기

    let post_time = createDom('span', 'post_time', '작성 시간');
    // 작성 시간 데이터 넣기

    let post_views = createDom('span', 'post_views', '5');
     // 좋아요 개수 데이터 넣기

    post_info.appendChild(post_author);
    post_info.appendChild(post_time);
    post_info.appendChild(post_views);

    post_title_container.appendChild(post_title);
    post_title_container.appendChild(post_info);

    post_page.appendChild(post_title_container);

    let post_content_container = createDom('div', 'post_content_container');

    let post_content = createDom('span', 'post_content', '게시물의 내용입니다.');
    // 게시물 내용 데이터 넣기

    post_content_container.appendChild(post_content);
    post_page.appendChild(post_content_container);

    let post_page_footer = createDom('div', 'post_page_footer');
    let post_modify_btn = createDom('button', 'post_modify_btn', '수정하기');
    let post_delete_btn = createDom('button', 'post_delete_btn', '삭제하기');
    
    post_page_footer.appendChild(post_modify_btn);
    post_page_footer.appendChild(post_delete_btn);

    post_page.appendChild(post_page_footer);

    container.appendChild(post_page);

}
