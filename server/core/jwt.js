const jwt = require('jsonwebtoken');
const demo_secret = 'demo_secret';

exports.signToken = (result) => {
    return new Promise((resolve, reject) => {
        try {
            const token = jwt.sign(result, demo_secret);
            console.log('获取token成功，token：', token)
            resolve(token);
        } catch (e) {
            reject(e);
        }
    })
}

exports.secret = demo_secret;