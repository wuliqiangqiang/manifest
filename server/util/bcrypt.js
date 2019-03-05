const bcrypt = require('bcrypt');
const saltRounds = 10; //生成salt的迭代次数

exports.createSalt = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                reject(err);
            } else {
                bcrypt.hash(password, salt, async(err, hash) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(hash);
                    }
                })
            }
        })
    })
}

/**
 * password:输入密码
 * encrypt:加密后的密码
 */

exports.compare = ({ password, encrypt } = obj) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, encrypt, (err, res) => {
            console.log('密码匹配结果', res);
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}