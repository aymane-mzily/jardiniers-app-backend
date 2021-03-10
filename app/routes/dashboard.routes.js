const controller = require("../controllers/dashboard.controller");
const uploader = require("../helpers/uploader");
const { authDashboard } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/", [authDashboard.adminLoginChecker], controller.index);
  app.get("/add", [authDashboard.adminLoginChecker], controller.add);
  app.post("/add_gardener", [authDashboard.adminLoginChecker, uploader.upload.single('image')], controller.addPOST);
  app.get("/gardener/:id", [authDashboard.adminLoginChecker], controller.edit);
  app.post("/gardener/edit/:id", [authDashboard.adminLoginChecker, uploader.upload.single('image')], controller.editPOST);
  app.post("/gardener/delete/:id", controller.delete);
};