
// self-executing anonymous function (SEAF)

(function (homeController) {

  var data = require('../data');

  homeController.init = function (app) {
    app.get('/hello', function(req, res) {

      data.getNoteCategories(function(err, results) {
        res.render("hello", {title: 'Hello', error: err, categories: results});
      });

    });

    app.get('/world', function(req, res) {

      data.getNoteCategories(function(err, results) {
        res.render("hello", {title: 'World', error: err, categories: results});
      })
    });

    app.get('/json', function(req, res) {
      res.send({name: 'world', age: 47});
    })
  };

})(module.exports);
