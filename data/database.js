(function (database) {

  var mongodb = require("mongodb");
  var mongoUrl = "mongodb://localhost:27017/AFW2";
  var theDb = null;

  database.getDb = function (next) {
    if (!theDb) {
      // connect to db
      mongodb.MongoClient.connect(mongoUrl, function(err, db) {
        if (err) {
          next(err, null);
        } else {
          theDb = {
            db: db,
            notes: db.collection("notes"),
            systems: db.collection("systems"),
            parts: db.collection("parts")
          };
          next(null, theDb)
        }
      });
    } else {
      next(null, theDb);
    }
  }

})(module.exports);
