import * as express from 'express';
import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import * as fs from 'fs';


export function createMailModel(requestBody: any) {
    var mailOptions: nodemailer.SendMailOptions = {};
    mailOptions.from = requestBody.fromAddress;
    mailOptions.to = requestBody.toAddress;
    mailOptions.subject = requestBody.subject;
    mailOptions.text = requestBody.messageBody;
    if (requestBody.hasAttachment) {
        mailOptions.attachments = requestBody.attachments;
    }
    return mailOptions;
}

class SendMailResult {
    processSuccess: boolean;
    message: string;

}

export function doSendMail(req: express.Request, res: express.Response, mailOptions: nodemailer.SendMailOptions) {
    var setting = JSON.parse(fs.readFileSync("./smtp.config.json", "utf8"));

    //SMTPの接続
    var smtp = nodemailer.createTransport(smtpTransport(setting));
    var processSuccess = true;
    //メールの送信
    smtp.sendMail(mailOptions, function (err, info) {
        //送信に失敗したとき
        if (err) {
            console.log("送信失敗");
            console.log(err);
            processSuccess = false;
        }
        //SMTPの切断
        smtp.close();

        var result = new SendMailResult();
        result.processSuccess = processSuccess;
        console.log(processSuccess);
        if (processSuccess) {
            result.message = "成功";
            res.status(200).send(JSON.stringify(result));
        } else {
            result.message = "失敗";
            res.status(500).send(JSON.stringify(result));
        }
    });
}