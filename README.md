# Interview-Code-Samples

googleTrends
- This module utilizes the google-trends-api available through NPM in node.js.
- trendsAPI.js makes calls to the RESTful google-trends-api 
- trendsApp.js makes a call to trendsModule.js to obtain a map with the necessary information for a cryptotrends application I've been working on for my senior design project. 
- trendsModule.js acts as the controller between trendsAPI.js and trendsApp.js. It fetches the JSON from trendsApi.js and then parses the information and organiizes it using a map containing an array of information. It then sends this map to trendsApp.js

setDb
- This module creates a mysql database (createDB.js) and initializes the required tables (initializetwitDb.js)
- destroy.js is used to clear the table entries in the database

stocktwitsAnalysis
- 
