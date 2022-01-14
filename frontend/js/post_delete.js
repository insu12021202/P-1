const user_name = document.querySelector('.login_btn');

export default function postDelete(post_author) {
    if(post_author == user_name.innerText){
        const url = location.pathname; 
        $.ajax({
            type: "DELETE",
            url:`${url}`,
            data: {
            },
            dataType: 'json',
            success: (response)=>{
                window.alert(response.success);
                history.back();
            },
            error: (log)=>{console.log(log)}
        });
    }
    else{
        window.alert('작성자가 아닙니다');
    }
    
}