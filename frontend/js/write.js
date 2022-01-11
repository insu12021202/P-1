const container = document.querySelector('.container');

export default function showWrite() {
    if(container.childNodes[0]) {  
        container.removeChild(container.childNodes[0]);
        }

    let write_page = document.createElement('div');
    write_page.className = 'write_page';
    
    let write_page_header = document.createElement('div');
    write_page_header.className = 'write_page_header';

    let write_title = document.createElement('div');
    write_title.className = 'write_title';

    let write_input = document.createElement('input');
    write_input.setAttribute('type', 'textarea');
    write_input.setAttribute('placeholder', '제목을 입력하세요');

    write_title.appendChild(write_input);
    write_page_header.appendChild(write_title);
    write_page.appendChild(write_page_header);

    //choose_board
    let choose_board = document.createElement('div');
    choose_board.className = 'choose_board';

    let choose_board_select = document.createElement('select');
    choose_board_select.id = 'choose_board';
    choose_board_select.setAttribute('name', 'choose_board');

    let free_board = document.createElement('option');
    free_board.setAttribute('value', 'free_board');
    free_board.innerText = '자유게시판';

    let secret_board = document.createElement('option');
    secret_board.setAttribute('value', 'secret_board');
    secret_board.innerText = '비밀게시판';

    let info_board = document.createElement('option');
    info_board.setAttribute('value', 'info_board');
    info_board.innerText = '정보게시판';

    let prom_board = document.createElement('option');
    prom_board.setAttribute('value', 'prom_board');
    prom_board.innerText = '홍보게시판';

    let sw_board = document.createElement('option');
    sw_board.setAttribute('value', 'sw_board');
    sw_board.innerText = 'SW게시판';

    choose_board_select.appendChild(free_board);
    choose_board_select.appendChild(secret_board);
    choose_board_select.appendChild(info_board);
    choose_board_select.appendChild(prom_board);
    choose_board_select.appendChild(sw_board);

    choose_board.appendChild(choose_board_select);
    write_page_header.appendChild(choose_board);

    //write_content
    let write_content = document.createElement('div');
    write_content.className = 'write_content';

    let write_content_textarea = document.createElement('textarea');
    write_content_textarea.setAttribute('name', 'write_content');
    write_content_textarea.setAttribute('cols', '30');
    write_content_textarea.setAttribute('rows', '10');
    write_content_textarea.setAttribute('placeholder', '내용을 입력하세요');
    
    write_content.appendChild(write_content_textarea);
    write_page.appendChild(write_content);

    //write_page_footer
    let write_page_footer = document.createElement('div');
    write_page_footer.className = 'write_page_footer';

    let write_submit_btn = document.createElement('button');
    write_submit_btn.className = 'write_submit_btn';
    write_submit_btn.innerText = '글쓰기';

    write_page_footer.appendChild(write_submit_btn);
    write_page.appendChild(write_page_footer);

    container.appendChild(write_page);
}



