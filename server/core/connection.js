/**
 * 前端用法
 * var query = require('...');
 * query({
 *  sql:查询语句
 *  opts:查询参数
 *  cb:(err,val,fileds)=>{
 *      //成功回调
 *  }
 * })
 */

const DATA_TABLES = 'user';
const mysql = require('mysql');

const pool = mysql.createPool({
    host: '193.112.9.101',
    user: 'root',
    password: 'Leafilike123.',
    //port: '3306',
    database: 'test',
    // charset: '连接字符集（默认 ’UTF8_GENERAL_CI’，注意字符集的字母都要大写）',
    // localAddress: '此IP用于TCP连接（可选）',
    // socketPath: '连接到unix域路径，当使用 host 和 port 时会被忽略',
    // timezone: '时区（默认 ’local’）',
    // connectTimeout: '连接超时（默认 不限制；单位:毫秒） ',
    // stringifyObjects: '是否序列化对象（默认 ’false’ ；与安全相关https://github.com/felixge/node-mysql/issues/501）',
    // typeCast: '是否将列值转化为本地JavaScript类型值 （默认 true）',
    // queryFormat: '自定义query语句格式化方法 https://github.com/felixge/node-mysql#custom-format',
    // supportBigNumbers: '数据库支持bigint或decimal类型列时，需要设此option为true （默认 false）',
    // bigNumberStrings: 'supportBigNumbers和bigNumberStrings启用 强制bigint或decimal列以JavaScript字符串类型返回（默认 false）',
    // dateStrings: '强制timestamp, datetime, data类型以字符串类型返回，而不是JavaScript Date类型（默认 false）',
    // debug: '开启调试（默认 false）',
    // multipleStatements: '是否许一个query中有多个MySQL语句 （默认 false）',
    // flags: '用于修改连接标志，更多详情:',
    // https: '//github.com/felixge/node-mysql#connection-flags',
    // ssl: '使用ssl参数（与crypto.createCredenitals参数格式一至）或一个包含ssl配置文件名称的字符串，目前只捆绑Amazon RDS的配置文件',
});

const query = (opts) => {
    let { promise } = opts;
    if (promise) {
        return async_getConnection(opts);
    } else {
        return getConnection(opts)
    }
}

function getConnection(opts) {
    let { sql, posts, cb } = opts;
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('数据库查询发生错误' + '\n');
            cb && cb({ err });
        } else {
            connection.query(sql, posts, (err, val, fields) => {
                //释放链接
                connection.release();
                //启动回调
                console.log('数据库操作成功');
                cb && cb({ err, val, fields })
            })
        }
    })
}

function async_getConnection(opts) {
    let { sql, posts } = opts;
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('数据库查询发生错误' + '\n');
                reject(err);
            } else {
                connection.query(sql, posts, (err, val, fields) => {
                    //释放链接
                    connection.release();
                    //启动回调
                    //promise 控制
                    if (err) {
                        console.log('数据库查询发生错误' + '\n');
                        reject(err);
                    } else {
                        console.log('数据库操作成功');
                        resolve({ err, val, fields });
                    }
                })
            }
        })
    })
}

module.exports = query;