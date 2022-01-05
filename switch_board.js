const free_b_btn = document.querySelector("#free_b_btn");
const secret_b_btn = document.querySelector("#secret_b_btn");
const info_b_btn = document.querySelector("#info_b_btn");
const prom_b_btn = document.querySelector("#prom_b_btn");
const sw_b_btn = document.querySelector("#sw_b_btn");
const fn = document.querySelectorAll(".header_notice_board button");
const b_containers = document.querySelectorAll(".b_conatiner");



function switch_board(event) {
    if(event.target.innerText == "자유게시판") {
        for(i=0; i<5 ; i++){
            if(!b_containers[i].classList.contains("hidden")){
                b_containers[i].classList.add("hidden");
            }
        }
        b_containers[0].classList.remove("hidden");
    }if(event.target.innerText == "비밀게시판") {
        for(i=0; i<5 ; i++){
            if(!b_containers[i].classList.contains("hidden")){
                b_containers[i].classList.add("hidden");
            }
        }
        b_containers[1].classList.remove("hidden");
    }if(event.target.innerText == "정보게시판") {
        for(i=0; i<5 ; i++){
            if(!b_containers[i].classList.contains("hidden")){
                b_containers[i].classList.add("hidden");
            }
        }
        b_containers[2].classList.remove("hidden");
        
    }if(event.target.innerText == "홍보게시판") {
        for(i=0; i<5 ; i++){
            if(!b_containers[i].classList.contains("hidden")){
                b_containers[i].classList.add("hidden");
            }
        }
        b_containers[3].classList.remove("hidden");
        
    }if(event.target.innerText == "SW게시판") {
        for(i=0; i<5 ; i++){
            if(!b_containers[i].classList.contains("hidden")){
                b_containers[i].classList.add("hidden");
            }
        }
        b_containers[4].classList.remove("hidden");
        
    }
    
}

if(fn) {
    for(i=0; i<5; i++){
        fn[i].addEventListener("click", switch_board);

    }
}