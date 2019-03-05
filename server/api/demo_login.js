const query = require('../server/connection');
const { compare } = require('../util/bcrypt');
const { getHost } = require('../util/getLocal')
const { signToken } = require('../server/jwt');
// const { promisify } = require('util');

exports.login = (ctx, next) => {
    return new Promise(async(resolve, reject) => {
        let { password, user_email } = ctx.request.body;
        let result = await query({
            promise: true,
            sql: `SELECT * FROM user WHERE user_email = "${user_email}"`,
        }).catch((err) => {
            console.log(err);
            return false;
        })

        if (result.val.length == 0) {
            resolve({
                code: 403,
                err: true,
                msg: '邮箱或密码不正确'
            })
        }

        let encrypt = result.val[0].password;

        let { email_code, user_name, user_id, admin, is_lively, cc, to } = result.val[0];

        if (!is_lively) {
            reject({
                code: 403,
                err: true,
                msg: '邮箱未激活请重新注册激活'
            })
        }

        let result_pwd = await compare({
            password,
            encrypt
        })

        if (result_pwd) {
            //判断激活状态

            //设置token，返回给客户端，让客户端保存
            let token = await signToken({
                user_email,
                email_code,
                user_name,
                user_id,
                admin,
                cc,
                to
            });

            // 给客户端设置cookie
            ctx.cookies.set(
                'token',
                token, {
                    domain: process.env.REMOTE_ADDR, // 写cookie所在的域名  //todo
                    // maxAge: 10 * 60 * 1000, // cookie有效时长
                    // expires: new Date('2017-02-15'), // cookie失效时间
                    httpOnly: false, // 是否只用于http请求中获取
                    overwrite: false // 是否允许重写
                }
            )

            resolve({
                msg: 'success',
                code: 200,
                token: token
            })

        } else {
            resolve({
                msg: 'fail',
                code: 200,
                err: '邮箱或密码不正确'
            })
        }

    })

}