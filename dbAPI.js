var mysql = require('mysql');
var con;
module.exports = {
	connect: function(){
			con = mysql.createConnection({
			host: "localhost",
			user: "admin",
			password: "*#4485R0cks",
			database: "twitDb"
		});
		con.connect(function(err) {
		  if (err) throw err;
		  console.log("Connected!");
		})
	},
	
	insert: function(term, array){
		var sql = "INSERT INTO " + term + " (ID, date, twit, sentiment) VALUES ('";
		sql += array[0] + "', '" + array[1] + "', '" + array[2] + "', '" + array[4] + "') ";
		sql += "ON DUPLICATE KEY UPDATE date = '" + array[1] + "', twit = '" + array[2] + "', sentiment = '" + array[4] + "';";
		con.query(sql, function (err, result) {
			if (err) throw err;
		});
	},
	
	getCount: function(term){
		var sql = "SELECT COUNT(*) FROM " + term
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log(result);
		});
	},
	
	getSize: function(){
		var sql = "SELECT table_schema AS 'Database', SUM(data_length + index_length) / 1024 / 1024 AS 'Size (MB)' FROM information_schema.TABLES GROUP BY table_schema"
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log(result);
		});
	},
	
	retrieveAll: function(term){
		console.log(term)
		var sql = "SELECT * FROM " + term;
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log(result);
			return result;
		});
	},
	
	destroy: function(){
		var sql = "DROP TABLE bitcoin";
		con.query(sql, function (err, result) {
			if (err) throw err;
				console.log("Table bitcoin dropped");
		});
		var sql = "DROP TABLE ethereum";
		con.query(sql, function (err, result) {
			if (err) throw err;
				console.log("Table ethereum dropped");
		});
		var sql = "DROP TABLE litecoin";
		con.query(sql, function (err, result) {
			if (err) throw err;
				console.log("Table litecoin dropped");
		});
	}
	
}