const fn = document.querySelectorAll('.fn');
const container = document.querySelector('.container');
let parser = new DOMParser();

//pushState로 저장해놨던 data를 기반으로 페이지 앞으로 가기, 뒤로 가기가 발생했을 때 fetchPage 함수 실행
window.onpopstate = function(e) {
    fetchPage(e.state.data);
}

//해당 게시판의 이름에 따라 url을 설정하고 pushState로 data와 url 저장
function pushUrl(name) {
    let url = location.origin + `/${name}`;
    let state = {data : name};
    history.pushState(state, null, url);
}

//ajax를 이용해 게시판의 url로 접근하면 서버에서 데이터를 받아와 index.html의 container에 그리기
function fetchPage(name) {
    $.ajax({ 
        url : location.origin + '/' + name,
        type : 'GET'
    }).done(function(data){
        container.innerHTML = data;
    });
}

//클릭된 게시판의 이름에 따라 게시판 이동
function switchboard(e){
    let board_name = e.target.id;
    pushUrl(board_name);
    fetchPage(board_name);
}

//각 게시판 버튼에 이벤트 추가
fn.forEach(element => 
    element.addEventListener('click', switchboard)
);

