const router = require("koa-router")();
const { login } = require("../api/api_login");
const { register } = require("../api/api_register");

//登录
router.post("/login", async (ctx, next) => {
  ctx.body = await login(ctx, next).catch(e => {
    return e;
  });
});

//注册
router.post("/register", async (ctx, next) => {
  ctx.body = await register(ctx, next).catch(e => {
    return {
      msg: e.msg ? e.msg : "注册失败，请检查邮箱格式、授权码",
      code: 300,
      err: e
    };
  });
});

module.exports = router;
