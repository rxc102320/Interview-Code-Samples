// sentimentApi.js
const Sentiment = require('sentiment');
const async = require('async');
var sentiment = new Sentiment();
module.exports = {
	analyzeTwit: function(string, sent) {
		var result;
		function getData(){
			return new Promise((resolve, reject) => {
				sentiment.analyze(string, function (err, res) {
					if (err){
						return reject();
					}
					else{
						if (sent == null){
							result = res.score;
						}
						else if (sent == 'Bullish'){
							if (res.score == 0){
								result = 5;
							}
							else if(res.score < 0){
								result = res.score * -1;
							}
							else if(res.score > 0){
								result = res.score + 1;
							}
						}
						else if (sent == 'Bearish'){
							if (res.score == 0){
								result = -5;
							}
							else if(res.score < 0){
								result = res.score - 1;
							}
							else if(res.score > 0){
								result = res.score * -1;
							}
						}
						resolve()
					}
				})
			});
		}
		var res = getData();
		return(res.then(function(){
			return new Promise((resolve, reject)=>{return resolve(result)})
		}).catch(() => {
			console.log("Error in sentiment API");
		}))
	}
}