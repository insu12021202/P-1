const container = document.querySelector(".container");
const write_page = document.querySelector(".write_page");
const write_btn = document.querySelector(".write_btn");
const write_submit_btn = document.querySelector(".write_submit_btn");


function openWritePage(){
    container.classList.add("hidden");
    write_page.classList.remove("hidden");
}

function closeWritePage(){
    container.classList.remove("hidden");
    write_page.classList.add("hidden");
}

write_btn.addEventListener("click", openWritePage);
write_submit_btn.addEventListener("click", closeWritePage);