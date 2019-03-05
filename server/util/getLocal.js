const os = require('os');
const Mac = require('getmac');

exports.getLocalIp = () => {　　
    let interfaces = os.networkInterfaces();　
    for (let devName in interfaces) {　　　　
        let iface = interfaces[devName];　　　　　　
        for (let i = 0; i < iface.length; i++) {　　　　　　　　
            let alias = iface[i];　　　　　　　　
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {　　　　　　　　　　
                console.log(alias.address);　　　　
                return alias.address;
            }　　　　　　
        }　　
    }
}

exports.getHost = (ctx) => {
    let host = ctx.request.header.host;
    let port = host.match(/:.*/)[0];
    host = host.replace(port, '');
    return host
}

exports.getMac = () => {
    Mac.getMac((err, macAddress) => {
        return macAddress;
    })
}

exports.getClientIP = (ctx) => {
    let req = ctx.request;
    let ip = ctx.ip ||
        req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    let arr = ip.match(/(\d{1,3}\.){3}\d{1,3}/);
    return arr ? arr[0] : '';
}