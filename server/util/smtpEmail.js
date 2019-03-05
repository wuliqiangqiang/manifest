exports.smtp_host = email => {
    console.log(email);
    let host;
    if (email.indexOf('@qq') > -1) {
        host = 'smtp.qq.com';
    } else {
        host = 'smtp.exmail.qq.com'
    }

    return host;
}