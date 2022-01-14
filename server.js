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

    //board가 한글이므로 영어 표현식으로 바꿔서 board_en에 담아주기
    let board_en = swtichBoardLanguage(board);
    
    const sql = `INSERT INTO express_db.${board_en} (post_title,post_content,post_board,post_time,post_author) VALUES('${title}','${content}','${board}',NOW(),'${author}')`;
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
//각 게시판에 접근하면 해당 게시판에 있는 모든 게시글을 보내준다.
app.get('/free_board', (req, res) => {
    const sql = `SELECT * FROM express_db.free_board`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        res.send(result);
    })
})
app.get('/secret_board', (req, res) => {
    const sql = `SELECT * FROM express_db.secret_board`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        res.send(result);
    })
})
app.get('/info_board', (req, res) => {
    const sql = `SELECT * FROM express_db.info_board`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        res.send(result);
    })
})
app.get('/prom_board', (req, res) => {
    const sql = `SELECT * FROM express_db.prom_board`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        res.send(result);
    })
})
app.get('/sw_board', (req, res) => {
    const sql = `SELECT * FROM express_db.sw_board`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        res.send(result);
    })
})

app.get('/:board_name/:post_num', (req, res)=>{
    let board_name = req.params.board_name;
    let post_num = req.params.post_num.substring(4,);
    
    const sql = `SELECT * FROM express_db.${board_name} WHERE id=${post_num}`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        res.json(result);
    })
})

//게시글 삭제 요청
app.delete('/:board_name/:post_num', (req, res)=> {
    let board_name = req.params.board_name;
    let post_num = req.params.post_num.substring(4,);

    const sql = `DELETE FROM ${board_name} WHERE id=${post_num};`
    con.query(sql, function(err, result) {
        if(err) throw err;
        res.json({success: '삭제가 완료되었습니다.'});
    })
})
//게시물 수정에 필요한 데이터 요청
app.post('/modify', (req, res) => {
    let post_num = req.body.data_post_num;
    let post_board = req.body.data_post_board;
    //post_board가 한글이므로 영어로 바꾸기
    let board_en = swtichBoardLanguage(post_board);

    const sql = `SELECT * FROM express_db.${board_en} WHERE id=${post_num}`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        res.json(result);
    })
})
// 게시물 수정 요청
app.put('/modify', (req, res) => {
    let board = req.body.board;
    let board_en = swtichBoardLanguage(board);
    
    let title = req.body.title;
    let author = req.body.author;
    let content = req.body.description;
    let post_num = req.body.post_num;
    const sql = `UPDATE express_db.${board_en} SET post_title = '${title}', post_author = '${author}', post_content = '${content}' WHERE id=${post_num}`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        res.json({success : 'success'});
    })
})

function swtichBoardLanguage(name) {
    switch (name) {
        case '자유게시판':
            return 'free_board';
        case '비밀게시판':
            return 'secret_board';
        case '정보게시판':
            return 'info_board';
        case '홍보게시판':
            return 'prom_board';
        case 'SW게시판':
            return 'sw_board';
    }
}
