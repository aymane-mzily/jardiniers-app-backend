const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/logout", controller.logout);

  app.route("/login").get(controller.login).post(controller.loginPOST);

  app.post("/api/auth/register", controller.apiRegister);
  app.post("/api/auth/login", controller.apiLogin);
};