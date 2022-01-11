const container = document.querySelector('.container'); 

export default function renderPost(board_name) {
    if(container.childNodes[0]) {
        container.removeChild(container.childNodes[0]);
    }

    let post_page = document.createElement('div');
    post_page.className = 'post_page';

    let post_page_header = document.createElement('div');
    post_page_header.className = 'post_page_header';

    let post_board = document.createElement('span');
    post_board.className = 'post_board';
    post_board.innerText = board_name;

    post_page_header.appendChild(post_board);
    post_page.appendChild(post_page_header);

    let post_title_container = document.createElement('div');
    post_title_container.className = 'post_title_container';

    let post_title = document.createElement('span');
    post_title.className = 'post_title';
    post_title.innerText = '이것은 게시물의 제목입니다'; //게시글 제목은 데이터 받아와서 넣기

    let post_info = document.createElement('div');
    post_info.className = 'post_info';

    let post_author = document.createElement('span');
    post_author.className = 'post_author';
    post_author.innerText = '작성자'; // 작성자 데이터 넣기

    let post_time = document.createElement('span');
    post_time.className = 'post_time';
    post_time.innerText = '작성 시간'; // 작성 시간 데이터 넣기

    let post_views = document.createElement('span');
    post_views.className = 'post_views';
    post_views.innerText = '4'; // 좋아요 개수 데이터 넣기

    post_info.appendChild(post_author);
    post_info.appendChild(post_time);
    post_info.appendChild(post_views);

    post_title_container.appendChild(post_title);
    post_title_container.appendChild(post_info);

    post_page.appendChild(post_title_container);

    let post_content_container = document.createElement('div');
    post_content_container.className = 'post_content_container';

    let post_content = document.createElement('span');
    post_content.className = 'post_content';
    post_content.innerText = '게시물 내용'; // 게시물 내용 데이터 넣기

    post_content_container.appendChild(post_content);
    post_page.appendChild(post_content_container);

    let post_page_footer = document.createElement('div');
    post_page_footer.className = 'post_page_footer';

    let post_modify_btn = document.createElement('button');
    post_modify_btn.className = 'post_modify_btn';
    post_modify_btn.innerText = '수정하기';

    let post_delete_btn = document.createElement('button');
    post_delete_btn.className = 'post_delete_btn';
    post_delete_btn.innerText = '삭제하기';
    
    post_page_footer.appendChild(post_modify_btn);
    post_page_footer.appendChild(post_delete_btn);

    post_page.appendChild(post_page_footer);

    container.appendChild(post_page);

}