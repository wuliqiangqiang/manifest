const { XZEC, XZE } = require('../config/email');
const nodemailer = require('nodemailer');
const { smtp_host } = require('../util/smtpEmail');

exports.sendEmail = ({ title, to, cc, html, code, from, cb } = opts) => {
    //授权邮箱
    let smtpConfig = {
        host: smtp_host(from ? from : XZE),
        port: 465,
        auth: {
            user: from ? from : XZE, //授权邮箱
            pass: code ? code : XZEC //授权号
        }
    };
    let transporter = nodemailer.createTransport(smtpConfig);
    let option = {
        from: from ? from : XZE,
        to: to ? to : XZE,
        cc: cc ? cc : '',
        subject: title,
        html: html
    }
    transporter.sendMail(option, (err, response) => {
        if (err) {
            console.log("邮箱stmp失败: ", err);
        } else {
            console.log("邮箱stmp成功: ", response);
        }
        cb & cb({ err, response });
    });
}