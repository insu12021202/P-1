import pushUrl from "./switch_board.js";
import showModify from "./show_modify.js";
const user_name = document.querySelector('.login_btn');

export default function postModify(data_post_num, data_post_board, data_post_author) {
    //게시글의 작성자일 때만 수정하기가 가능하도록 설정
    if(data_post_author == user_name.innerText){
        console.log(data_post_num, data_post_board);
        //수정하기 버튼이 눌리면 pushUrl로 URL부터 설정
        pushUrl(`modify`);
        //게시글의 data_post_num으로 database에 있는 해당 게시글을 가져오기
        $.ajax({
            type: "POST",
            url:`/modify`,
            data: {
                data_post_num : data_post_num,
                data_post_board : data_post_board
            },
            dataType: 'json',
            success: (response)=>{
                showModify(response);
            },
            error: (log)=>{console.log(log)}
        });
    }
    else{
        window.alert('게시글의 작성자가 아닙니다.');
    }
}