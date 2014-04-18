
// self-executing anonymous function (SEAF)
//
// install msnodesql
// npm install node-sqlserver-unofficial --save
//
// install mongodb
// npm install mongodb --save

(function (homeController) {

  var data = require('../data');
  var msnodesql = require("node-sqlserver-unofficial");
  var connString = "Driver={SQL Server Native Client 11.0}; Server=.; Database=AFW; Trusted_Connection={Yes}";

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

    app.get('/api/sql', function(req, res) {
      var sql = "select * from Tables_System";
      msnodesql.query(connString, sql, function(err, results) {
        res.send(results);
      });

    })

    app.get('/system', function(req, res) {
      var sql = "select * from Tables_System";
      msnodesql.query(connString, sql, function(err, results) {
        res.render('system', {title: 'system', error: err, systems: results});
      });

    })

    app.get('/part/partialsearch/:key', function(req, res) {
      var sql = "select PartSystemCode,PartAssemblyCode,PartCode,PartDescr from Tables_SystemAssemblyPart where PartDescr like '%" + req.params.key + "%' order by PartSystemCode,PartAssemblyCode,PartCode";
      msnodesql.query(connString, sql, function (err, results) {
        res.render('part', {title: 'part', error: err, parts: results});
        //res.send(results);
      });
    });

    app.post('/newCategory', function (req, res) {
      console.log('In newCategory');
      var categoryName = req.body.categoryName;
      data.createNewCategory(categoryName, function(err) {
        if (err) {
          res.redirect("/");
        } else {
          res.redirect('/notes/'+categoryName);
          //res.redirect("/");
        }
      });
      console.log(categoryName);
    });

  };

})(module.exports);
