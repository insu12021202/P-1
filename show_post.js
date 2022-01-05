const list_title = document.querySelector(".list_title");
const post_page = document.querySelector(".post_page");

function showPost(){
    container.classList.add("hidden");
    post_page.classList.remove("hidden");
}

list_title.addEventListener("click", showPost);