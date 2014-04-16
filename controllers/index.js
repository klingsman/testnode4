(function (controller) {

  var homeController = require("./homeController");

  controller.init = function (app) {
    homeController.init(app);
  };

})(module.exports);