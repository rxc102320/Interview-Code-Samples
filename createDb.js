//createDb.js
var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "admin",
	password: "*#4485R0cks"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
  var sql = "CREATE DATABASE IF NOT EXISTS twitDb";
  con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("DB created");
  });
});
