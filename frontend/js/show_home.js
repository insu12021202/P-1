import pushUrl from "./switch_board.js";
const container = document.querySelector('.container');

//메인 페이지를 그려주는 함수
export default function goToHome() {
    pushUrl('');
    const home_bg = document.createElement('div');
    const home_img = document.createElement('img');
    home_img.setAttribute("src", "../images/home.png");
    home_img.setAttribute("width", '100%');
    home_img.setAttribute("height", '100%');
    home_bg.appendChild(home_img);
    container.appendChild(home_bg);
}