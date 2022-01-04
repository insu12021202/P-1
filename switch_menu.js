const fn = document.querySelector("#fn");
const sn = document.querySelector("#sn");
const infon = document.querySelector("#infon");
const pn = document.querySelector("#pn");
const swn = document.querySelector("#swn");
const notice_name = document.querySelector(".notice_name");

function goToMenu(event){
    let name = event.target.innerText;
    notice_name.innerText = name;
}

sn.addEventListener("click", goToMenu);
fn.addEventListener("click", goToMenu);
infon.addEventListener("click", goToMenu);
pn.addEventListener("click", goToMenu);
swn.addEventListener("click", goToMenu);