const express = require('express');
const ejs = require('ejs')
const app = express();

//ejs 사용 환경 구축
app.set('view engine', "ejs");

//정적 폴더 설정
app.use(express.static('frontend'));

//3000포트로 서버 열기
app.listen(3000, function(){
    console.log('listening on 3000');
})

//초기 페이지에 index.html 제공
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})

//자유게시판 url에 접근하면 자유게시판 ejs 파일 전송
app.get('/free_board', (req,res) => {
    res.render(__dirname + '/frontend/js/view/free_board.ejs');
})
//비밀게시판 url에 접근하면 비밀게시판 ejs 파일 전송
app.get('/secret_board', (req,res) => {
    res.render(__dirname + '/frontend/js/view/secret_board.ejs');
})
//정보게시판 url에 접근하면 정보게시판 ejs 파일 전송
app.get('/info_board', (req,res) => {
    res.render(__dirname + '/frontend/js/view/info_board.ejs');
})
//홍보게시판 url에 접근하면 홍보게시판 ejs 파일 전송
app.get('/prom_board', (req,res) => {
    res.render(__dirname + '/frontend/js/view/prom_board.ejs');
})
//SW게시판 url에 접근하면 SW게시판 ejs 파일 전송
app.get('/SW_board', (req,res) => {
    res.render(__dirname + '/frontend/js/view/sw_board.ejs');
})

app.get('/login', (req,res) => {
    res.render(__dirname + '/frontend/js/view/login.ejs');
})