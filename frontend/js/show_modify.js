import createDom from "./create_dom.js";
const container = document.querySelector('.container');

export default function showModify(response) {
    if(container.childNodes[0]) {  
        container.removeChild(container.childNodes[0]);
        }

    let data_post_title = response[0].post_title;
    let data_post_author = response[0].post_author;
    let data_post_content = response[0].post_content;
    let data_post_num = response[0].id;

    let write_page = createDom('div', 'write_page');
    let write_page_header = createDom('div', 'write_page_header');
    let write_title = createDom('div', 'write_title');

    let write_input = document.createElement('input');
    write_input.setAttribute('name', 'write_title');
    write_input.setAttribute('type', 'textarea');
    //작성해놨던 제목을 넣어놓기
    write_input.setAttribute('value', `${data_post_title}`);

    write_title.appendChild(write_input);
    write_page_header.appendChild(write_title);
    write_page.appendChild(write_page_header);

    //choose_board
    let choose_board = createDom('div', 'choose_board');

    let choose_board_select = document.createElement('select');
    choose_board_select.id = 'choose_board';
    choose_board_select.setAttribute('name', 'choose_board');

    let free_board = createDom('option', null, '자유게시판')
    free_board.setAttribute('value', '자유게시판');
    
    let secret_board = createDom('option', null, '비밀게시판')
    secret_board.setAttribute('value', '비밀게시판');

    let info_board = createDom('option', null, '정보게시판')
    info_board.setAttribute('value', '정보게시판');

    let prom_board = createDom('option', null, '홍보게시판')
    prom_board.setAttribute('value', '홍보게시판');  

    let sw_board = createDom('option', null, 'SW게시판')
    sw_board.setAttribute('value', 'SW게시판'); 

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
    //입력해놨던 내용 넣어놓기
    write_content_textarea.innerText = `${data_post_content}`;
    
    write_content.appendChild(write_content_textarea);
    write_page.appendChild(write_content);

    let write_page_footer = createDom('div', 'write_page_footer');

    let write_submit_btn = createDom('button', 'write_submit_btn', '글쓰기')
    //글쓰기 버튼을 누르면 /post_page로 POST 요청 보냄 (게시글 내용 전송)
    write_submit_btn.addEventListener('click', ()=>{
       let user_name = data_post_author;

        $.ajax({
            type: "PUT",
            url:'/modify',
            data: {title: write_input.value,
                    author: user_name,
                    board: choose_board_select.value,
                    description: write_content_textarea.value,
                    post_num : data_post_num
            },
            dataType: 'json',
            success: (response)=>{
                if(response.success == 'success'){
                    window.alert('성공적으로 수정되었습니다.');
                }
            },
            error: (log)=>{console.log(log)}
        });
        //데이터 전송이 되면 이전 화면으로 돌아가게끔 설정
        window.history.back();
    })
        
    write_page_footer.appendChild(write_submit_btn);
    write_page.appendChild(write_page_footer);

    container.appendChild(write_page);
}