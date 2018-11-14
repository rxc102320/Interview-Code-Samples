// initializeTwitDb.js
var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "admin",
	password: "*#4485R0cks",
	database: "twitDb"
});

con.connect(function(err){
  var sql = "CREATE TABLE IF NOT EXISTS bitcoin(ID INT NOT NULL, date DATETIME, twit varchar(511) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL, sentiment INT, PRIMARY KEY (ID))";
  con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("Table bitcoin created");
  });
  var sql = "CREATE TABLE IF NOT EXISTS ethereum(ID INT NOT NULL, date DATETIME, twit varchar(511) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL, sentiment INT, PRIMARY KEY (ID))";
  con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("Table ethereum created");
  });
  var sql = "CREATE TABLE IF NOT EXISTS litecoin(ID INT NOT NULL, date DATETIME, twit varchar(511) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL, sentiment INT, PRIMARY KEY (ID))";
  con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("Table litecoin created");
  });
});