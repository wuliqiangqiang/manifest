const router = require("koa-router")();

router.get("/", async (ctx, next) => {
  // let { user_email, user_name, user_id, admin } = ctx.state.user;
  // await ctx.render('index', {
  //     user_name,
  //     user_email,
  //     user_id,
  //     admin
  //     // version: _version
  // })
  await ctx.render("main/test/test.hbs");
});

module.exports = router;
