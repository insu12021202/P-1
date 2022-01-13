const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

//정적 폴더 설정
app.use(express.static('frontend'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dudlstn908!',
    database: 'express_db'
});
//Express 서버와 MySQL 연동 확인
con.connect(function(err) {
    if(err) throw err;
    console.log('Connectd');
})

//3000포트로 서버 열기
app.listen(3000, function(){
    console.log('listening on 3000');
})

//초기 페이지에 index.html 제공
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})

//login url로 post 받으면 database에 저장되어 있는 id와 비교
app.post('/', (req, res) => {
    let login_id = req.body.user_id;
    let istrue = false;
    let user_nickname = '';
    const sql = `SELECT user_id,user_name FROM express_db.users;`
    con.query(sql, function(err, result, feild) {
        if(err) throw err;
        result.forEach((element) => {
            if(element.user_id == login_id) {
                user_nickname = element.user_name;
                istrue = true;
            }
        });
        res.send({'istrue' : istrue,
    'user_name' : user_nickname});
    })
})

app.post('/post_page', (req, res) => {
    let title = req.body.title;
    let author = req.body.author;
    let content = req.body.description;
    let board = req.body.board;
    const sql = `INSERT INTO express_db.posts (post_title,post_content,post_board,post_time,post_author) VALUES('${title}','${content}','${board}',NOW(),'${author}')`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        res.send({success : 'success'});
    })
})

app.post('/register', (req, res) => {
    let user_name = req.body.user_name;
    let user_id = req.body.user_id;

    const sql = `INSERT INTO express_db.users (user_id,user_name) VALUES('${user_id}','${user_name}');`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        res.send({success : 'success'});
    })
})

app.get('/free_board', (req, res) => {
    const sql = `SELECT * FROM express_db.posts WHERE post_board ='자유게시판'`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        res.send(result);
    })
})

app.get('/secret_board', (req, res) => {
    const sql = `SELECT * FROM express_db.posts WHERE post_board ='비밀게시판'`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        res.send(result);
    })
})

app.get('/info_board', (req, res) => {
    const sql = `SELECT * FROM express_db.posts WHERE post_board ='정보게시판'`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        res.send(result);
    })
})

app.get('/prom_board', (req, res) => {
    const sql = `SELECT * FROM express_db.posts WHERE post_board ='정보게시판'`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        res.send(result);
    })
})

app.get('/sw_board', (req, res) => {
    const sql = `SELECT * FROM express_db.posts WHERE post_board ='SW게시판'`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        res.send(result);
    })
})