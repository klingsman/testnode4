(function (data) {

  var seedData = require('./seedData');
  var database = require("./database");

  data.getNoteCategories = function(next) {
    //next(null, seedData.initialNotes);

    database.getDb(function (err, db) {
      if (err) {
        next(err, null);
      } else {
        db.notes.find().sort({ name: -1 }).toArray(function (err, results) {
          if (err) {
            next(err, null);
          } else {
            console.log("Executing getNoteCategories");
            next(null, results);
          }
        })
      }

    })

  };

  data.createNewCategory = function(categoryName, next) {
    database.getDb(function (err, db) {
      if (err) {
        next(err, null);
      } else {
        var cat = {
          name: categoryName,
          notes: []
        };
        db.notes.insert(cat, function (err) {
          if (err) {
            next(err);
          } else {
            next(null);
          }
        })
      }
    })
  };

  data.getNotes = function (categoryName, next) {
    database.getDb(function (err, db) {
      if (err) {
        next(err);
      } else {
        db.notes.findOne({ name: categoryName }, next);
      }
    });
  };

  data.addNote = function (categoryName, noteToInsert, next) {
    database.getDb(function (err, db) {
      if (err) {
        next(err);
      } else {
        console.log('In data.addNote: categoryName=' + categoryName);
        db.notes.update({ name: categoryName }, { $push: { notes: noteToInsert } }, next);
      }
    });
  };

  function seedDatabase() {
    database.getDb(function (err, db) {
      if (err) {
        console.log("Failed to seed database:" + err);
      } else {
        db.notes.count(function (err, count) {
          if (err) {
            console.log("Failed to retrieve database count");
          } else {
            if (count === 0) {
              console.log("Seeding the database");
              seedData.initialNotes.forEach(function (item) {
                db.notes.insert(item, function(err) {
                  if (err) {
                    console.log("Failed to insert note");
                  }
                })
              })
            } else {
              console.log("database already seeded");
            }

          }
        });
      }
    });
  }

  /*
  var systems = function () {
    var msnodesql = require("node-sqlserver-unofficial");
    var connString = "Driver={SQL Server Native Client 11.0}; Server=.; Database=AFW; Trusted_Connection={Yes}";
    var sql = "select * from Tables_System";
    msnodesql.query(connString, sql, function(err, results) {
      return results;
    });
  }
  */
  function seedDatabaseSystem() {
    database.getDb(function (err, db) {
      if (err) {
        console.log("Failed to seed database:" + err);
      } else {
        db.systems.count(function (err, count) {
          if (err) {
            console.log("Failed to retrieve database count");
          } else {
            if (count === 0) {
              console.log("Seeding the database - System");

              var msnodesql = require("node-sqlserver-unofficial");
              var connString = "Driver={SQL Server Native Client 11.0}; Server=.; Database=AFW; Trusted_Connection={Yes}";
              var sql = "select * from Tables_System";
              msnodesql.query(connString, sql, function (err, results) {
                results.forEach(function (item) {
                  db.systems.insert(item, function (err) {
                    if (err) {
                      console.log("Failed to insert system");
                    }
                  })
                })
              });
            }
          }
        })
      }
    })
  }

  seedDatabase();
  seedDatabaseSystem();

})(module.exports);
