const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const multerUpload = require('./file.middleware')
const { Book, sequelize } = require('./model');
require('dotenv').config();
const PORT = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000

app.set("view engine", "html");

nunjucks.configure('views', {
    express: app
});

app.use(express.static('uploads'))
app.use(express.urlencoded({extended : true}));

app.get('/', async (req, res) => {
    const imageList = await Book.findAll();
    res.render('index.html', {
        imageList
    });
    // 데이터 베이스에서 전체 목록 가져오기
    // index.html 페이지 응답 내보내고 전체 목록 값 같이 보내기
});

app.get('/uploads/:filename', async(req, res) => {
    const filename = req.params.filename
    
    const imageList = await Book.findOne({
        where: { filename:  filename  }  
    });

    console.log(imageList);
    
    res.render("view.html",{
        imageList
    });
    // view.html 응답 보내세요.
});

app.post('/upload', multerUpload.single('file'), async (req, res) => {
    // req.file로 filename, path 꺼냄.
    // 파일 정보를 데이터베이스에 저장.
    // 루트로 리다이텍트
    try{
        const { filename, path } = req.file;
        await Book.create({filename, path})
        // console.log(req.fule);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.send('파일 업로드 실패')
    }
});


app.listen(PORT, async () => {
    await sequelize.sync({force: false});
    console.log(`Server running on http://localhost:${PORT}`);
});


