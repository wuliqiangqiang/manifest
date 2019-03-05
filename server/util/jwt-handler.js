exports.errorHandle = (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            // ctx.body = {
            //     error: err.originalError ? err.originalError.message : err.message,
            // };
            console.log('jwt访问拒绝');
            ctx.redirect('/login')
        } else {
            throw err;
        }
    });
}