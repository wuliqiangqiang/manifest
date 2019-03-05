const query = require('../server/connection');
const { createSalt } = require('../util/bcrypt');
const { random } = require('../util/getRandom');
const path = require('path');
const { sendEmail } = require('../server/send_email');

exports.register = (ctx, next) => {
    return new Promise(async(resolve, reject) => {
        let { password, user_name, user_email, email_code } = ctx.request.body;

        password = password.replace(/\s/, '');
        user_name = user_name.replace(/\s/g, '');
        user_email = user_email.replace(/\s/, '');
        email_code = email_code.replace(/\s/g, '');

        //随机生成salt
        password = await createSalt(password).catch((err) => { console.log(err) });

        //数据库操作
        let ask = await query({
            sql: `SELECT * FROM user WHERE user_email = "${user_email}"`,
            promise: true
        }).catch((e) => {
            reject(e);
        });

        let active_code = random(false, 4);

        // console.log('ask', ask);
        let result = await registerProgress({
            ask,
            password,
            user_name,
            user_email,
            email_code,
            active_code
        }).catch((e) => {
            reject(e);
            console.log(e);
            return false;
        })

        if (result) {
            await sendVerifyEmail({
                ctx,
                user_email,
                active_code
            }).catch((e) => {
                reject(e);
                console.log(e);
            })
        }

        resolve({
            msg: 'success',
            code: 200,
            err: null
        })
    })
}


function sendVerifyEmail({ user_email, ctx, active_code } = opts) {
    //用本人管理员账号发送邮件给指定用户
    return new Promise((resolve, reject) => {
        let active_email = 'http://' + path.join(process.env.REMOTE_ADDR_ALL, 'email/verify_email') + '?' + 'email=' + user_email + '&' + 'code=' + active_code;
        console.log(active_email);
        sendEmail({
            title: '周报激活邮件',
            to: user_email,
            html: `<a href='${active_email}'>请点击链接，激活邮件，即可登录</a>`,
            cb: ({ err, response }) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(response);
                }
            }
        })
    })

}

function registerProgress({ ask, user_email, password, user_name, email_code, active_code } = obj) {
    return new Promise((resolve, reject) => {
        if (ask.val.length) {
            //用户已经激活成功
            if (ask.val[0].is_lively) {
                reject({
                    msg: '该用户已经存在'
                })
                return false;
            }
            //修改数据库
            query({
                sql: `UPDATE user SET ? WHERE user_email = "${user_email}"`,
                posts: Object.assign({ password, user_name, user_email, email_code }, {
                    create_time: new Date().getTime(),
                    active_code: active_code
                }),
                cb: ({ err, val }) => {
                    console.log('用户注册——修改成功');
                    // sendVerifyEmail({ user_email })
                    if (err) {
                        reject(err)
                    } else {
                        resolve(val)
                    }
                }
            })
        } else {
            //插入数据库
            query({
                posts: Object.assign({ password, user_name, user_email, email_code }, {
                    create_time: new Date().getTime(),
                    active_code: active_code
                }),
                sql: "INSERT INTO user SET ?",
                cb: ({ err, val }) => {
                    console.log('用户注册——添加成功');
                    // sendVerifyEmail({ user_email })
                    if (err) {
                        reject(err)
                    } else {
                        resolve(val)
                    }
                }
            })
        }
    })
}