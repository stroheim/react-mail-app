import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as nodemailer from 'nodemailer';
import * as multer from 'multer';
import * as fs from 'fs';
import * as mail from './mail';
import db from './db';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

db.connect();

app.use('/dist', express.static('dist'));

const historyController = db.controllers && db.controllers.History;
if (historyController) {
    // app.get("/api/find", historyController.find);
    app.get("/api/find", (req, res) => {
        setTimeout(function () {
            historyController.find(req, res);
        }, 2000);
    });
}

// メール送信
app.post("/api/send", (req, res) => {
    res.contentType("application/json");
    console.log(req.body);
    var mailOptions = mail.createMailModel(req.body);

    // 5秒 待機させる
    setTimeout(() => {
        mail.doSendMail(req, res, mailOptions);
        historyController.add(req, res);
    }, 3000);
});

// 添付ファイルアップロード
const upload = multer({ dest: "upload" });
app.post("/api/upload", upload.single("file"), (req, res) => {
    var file = req.file;
    // console.log(file);
    console.log(`originalname: ${file.originalname}`);
    console.log(`path: ${file.path}`);
    var jsonResponse = {
        originalname: file.originalname,
        mimetype: file.mimetype,
        filename: file.filename,
        path: file.path
    };
    setTimeout(() => {
        res.send(JSON.stringify(jsonResponse));
    }, 2000);
    // res.send(JSON.stringify(jsonResponse));
});

//アップロード済みの添付ファイルを削除する
app.delete("/api/attachment", (req, res) => {
    var target = "upload/" + req.query.path;
    console.log("deleteTarget -> %s", target);
    setTimeout(() => {
        fs.unlink(target, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send(JSON.stringify({ processSuccess: false, message: "ファイル削除に失敗しました" }));
            }
            res.status(200).send(JSON.stringify({ processSuccess: true, message: "" }));
        });
    }, 2000);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
});

app.listen(3030, '0.0.0.0', (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Listening at http://localhost:3030");
});

