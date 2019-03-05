const router = require("koa-router")();

//请求
// const api = require("../api/api");
// router.use("/api", api.routes(), api.allowedMethods());

//页面路由
const main = {
  test: require("./main/test")
};

router.use("/", main.test.routes(), main.test.allowedMethods());

module.exports = router;
