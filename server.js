const express = require('express');
const app = express();

//정적 폴더 설정
app.use(express.static('frontend'));

//3000포트로 서버 열기
app.listen(3000, function(){
    console.log('listening on 3000');
})

//초기 페이지에 index.html 제공
app.get('/*', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})
