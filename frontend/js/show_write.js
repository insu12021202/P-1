import createDom from "./create_dom.js";
const container = document.querySelector('.container');

export default function showWrite() {
    if(container.childNodes[0]) {  
        container.removeChild(container.childNodes[0]);
        }

    let write_page = createDom('div', 'write_page');
    let write_page_header = createDom('div', 'write_page_header');
    let write_title = createDom('div', 'write_title');

    let write_input = document.createElement('input');
    write_input.setAttribute('type', 'textarea');
    write_input.setAttribute('placeholder', '제목을 입력하세요');

    write_title.appendChild(write_input);
    write_page_header.appendChild(write_title);
    write_page.appendChild(write_page_header);

    //choose_board
    let choose_board = createDom('div', 'choose_board');

    let choose_board_select = document.createElement('select');
    choose_board_select.id = 'choose_board';
    choose_board_select.setAttribute('name', 'choose_board');

    let free_board = createDom('option', null, '자유게시판')
    free_board.setAttribute('value', 'free_board');
    
    let secret_board = createDom('option', null, '비밀게시판')
    secret_board.setAttribute('value', 'secret_board');

    let info_board = createDom('option', null, '정보게시판')
    info_board.setAttribute('value', 'info_board');

    let prom_board = createDom('option', null, '홍보게시판')
    prom_board.setAttribute('value', 'prom_board');  

    let sw_board = createDom('option', null, 'SW게시판')
    sw_board.setAttribute('value', 'sw_board'); 

    let arr = [free_board, secret_board, info_board, prom_board, sw_board];
    arr.forEach((element) => {
        choose_board_select.appendChild(element);
    })

    choose_board.appendChild(choose_board_select);
    write_page_header.appendChild(choose_board);

    let write_content = createDom('div', 'write_content');

    let write_content_textarea = document.createElement('textarea');
    write_content_textarea.setAttribute('name', 'write_content');
    write_content_textarea.setAttribute('cols', '30');
    write_content_textarea.setAttribute('rows', '10');
    write_content_textarea.setAttribute('placeholder', '내용을 입력하세요');
    
    write_content.appendChild(write_content_textarea);
    write_page.appendChild(write_content);

    let write_page_footer = createDom('div', 'write_page_footer');

    let write_submit_btn = createDom('button', 'write_submit_btn', '글쓰기')

    write_page_footer.appendChild(write_submit_btn);
    write_page.appendChild(write_page_footer);

    container.appendChild(write_page);
}



