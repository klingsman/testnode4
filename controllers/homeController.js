
// self-executing anonymous function (SEAF)

(function (homeController) {

  homeController.init = function (app) {
    app.get('/hello', function(req, res) {
      res.render("hello", {title: 'Hello'});
    });

    app.get('/world', function(req, res) {
      res.render("hello", {title: 'World'});
    });

    app.get('/json', function(req, res) {
      res.send({name: 'world', age: 47});
    })
  };

})(module.exports);
