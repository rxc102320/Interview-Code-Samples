// stocktwitsApi.js
const st = require('stocktwits');
const async = require('async');

module.exports = {
	getTwits: function(string) {
		var result;
		function getData(){
			return new Promise((resolve, reject) => {
				st.get(string, function (err, res) {
					if (err){
						return reject();
					}
					else{
						result = res;
						resolve();
					}
				})
			});
		}
		var res = getData();
		return(res.then(function(){
			//returns the map with all the information
			console.log(result.remaining)
			return result
		}).catch(() => {
			console.log("Error in stocktwits API");
		}))
	}
}
