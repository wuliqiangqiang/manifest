const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const routers = require("./router/router");
const path = require("path");
const env =
  process.env.NODE_ENV === "development"
    ? require("./config/development")
    : require("./config/production");

// token过滤
// const { errorHandle } = require("./util/jwt-handler");
// const jwtKoa = require('koa-jwt');
// const filter = require('./routes/filter');
// const { secret } = require('./server/jwt');

// console.log(process.env);

onerror(app);

app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(json());

app.use(logger());
app.use(require("koa-static")(path.join(__dirname, `../`), env.static));

app.use(
  views(path.join(path.join(__dirname, `../`), `${env.views}`), {
    map: { hbs: "handlebars" },
    // options: {
    //     helpers: {
    //         uppercase: (str) => str.toUpperCase()
    //     },

    //     partials: {
    //         subTitle: './my-partial' // requires ./my-partial.hbs
    //     }
    // },
    extension: "hbs"
  })
);

// app.use(errorHandle);
// app.use(jwtKoa({ secret: secret, cookie: 'token' }).unless({ path: [/^\/login/, /^\/register/, /^\/api\/(login|register)$/, /^\/email/, /^\/guide$/] }));

app.on("error", (err, ctx) => {
  console.error("【错误】:", err, ctx);
});

// app.use(filter())

app.use(routers.routes(), routers.allowedMethods());

console.log("环境为:", process.env.NODE_ENV);

module.exports = app;

//todo 区分本地server 和 线上server
