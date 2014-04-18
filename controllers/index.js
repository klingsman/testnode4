(function (controller) {

  var homeController = require("./homeController");
  var notesController = require("./notesController");

  controller.init = function (app) {
    homeController.init(app);
    notesController.init(app);
  };

})(module.exports);