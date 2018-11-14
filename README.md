# Interview-Code-Samples

googleTrends
- This module utilizes the google-trends-api available through NPM in node.js
- trendsAPI.js makes calls to the RESTful google-trends-api to get the information of current google trends
- trendsApp.js makes a call to trendsModule.js to obtain a map with the necessary information for a cryptotrends application I've been working on for my senior design project. 
- trendsModule.js acts as the controller between trendsAPI.js and trendsApp.js. It fetches the JSON from trendsApi.js and then parses the information and organiizes it using a map containing an array of information. It then sends this map to trendsApp.js

setDb
- This module creates a mysql database (createDB.js) and initializes the required tables (initializetwitDb.js)
- destroy.js is used to clear the table entries in the database

stocktwitsAnalyisis
- This module utilizes the sentiment and stocktwits APIs available through NPM in node.js
- stocktwitsAPI.js makes continious calls to the REStful stocktwits API to get the last 30 twits regarding a specified symbol.
- sentimentAPI.js makes calls to the RESTful sentiment API to perform sentiment analysis of the given string.
- twitModule.js acts as the controller between the two previous files. It retrives the stocktwit data using stocktwitsAPI.js and then calls sentimentAPI.js to analyze the twit for sentiment. Lastly, it stores all this information in the mySQL database initialized in setDb module. 

All these modules will be used on website I'm currently working on that will analyze cryptocurrency trends and predict whether or not you should invest in each currency. 
