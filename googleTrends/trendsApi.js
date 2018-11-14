// trendsAPI.js
const googleTrends = require('google-trends-api');
module.exports = {
	getTrends: function (startDate, endDate, region, term){
		var parsedResult;
		function getData(){
			return new Promise((resolve, reject) => {
				googleTrends.interestOverTime({keyword: term, startTime: startDate, endTime: endDate, geo: region, granularTimeResolution: true}, 
					function(err, results) {
						if (err){ 
							return reject();
						}
						else {
							parsedResult = JSON.parse(results);
							if (parsedResult.default.timelineData.length == 0){
								return reject();
							}
							resolve();
						}
					}
				);
			});
		}
		var res = getData();
		return(res.then(function(){
			//returns the map with all the information
			return parsedResult
		}).catch(() => {
			console.log("Not enough data for search term");
		}))
	}
}
