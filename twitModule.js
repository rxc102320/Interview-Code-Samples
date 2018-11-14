//twitSentimentModule.js
const stocktwits = require('./stocktwitsApi.js');
const sentiment = require('./sentimentApi.js');
const db = require('./dbAPI.js')
const async = require('async');
var strings = ['streams/symbol/btc.x', 'streams/symbol/eth.x', 'streams/symbol/ltc.x']
var terms = ['bitcoin', 'ethereum', 'litecoin']
var tempMap = new Map();
var twitMap = new Map();
var term = '';

//var strings = ['streams/symbol/btc.x']
//var terms = ['bitcoin']
db.connect();

function fn60sec() {
    var promise = getData(strings);
	promise.then(function(){
		console.log("stocktwits data returned successfully...\n");
	}).then(async function(){
		await getSent(twitMap);
	}).then(function(){
		insertValues();
		//db.getSize()
	}).then(function(){
		getTableCount();
		//getValues();
	}).catch(function(){console.log('Error')})
	}
fn60sec();
setInterval(fn60sec, 60*1000);


// This function gets the twit data from all the currencies and returns a promise
function getData(strings){
	console.log("Getting stocktwits data...")
	promises = strings.map(function(string){
		return new Promise((resolve, reject) => {
			var result = getTwitData(string).then((result) => {
				if (string == 'streams/symbol/btc.x'){
					term = 'bitcoin';
				}
				else if (string == 'streams/symbol/eth.x'){
					term = 'ethereum';
				}
				else if (string == 'streams/symbol/ltc.x'){
					term = 'litecoin';
				}
				tempMap.set(term, result);
				resolve();
			})
		});
	});
	return(Promise.all(promises)
	.then(function(){
		setTwitMap()
	}).catch(function(){
		console.log("Getting stocktwits data failed...");
		return new Promise((resolve, reject) => {return reject()});
	}))
}

// This function gets each currency twit data from stocktwitsAPI
async function getTwitData(string){
	let json = await stocktwits.getTwits(string);
	return json;
}

// This function calls getSentiment() to get the sentiment values for each currency
async function getSent(map) {
	promises = terms.map((term)=>{
		return new Promise((resolve, reject) => {
			var result = getSentiment(map.get(term), term).then((result) => {
				resolve();
			})
		});
	});
	return(Promise.all(promises))
}


// This function calls getSentimentData() to get the sentiment values for the given currency
function getSentiment(termMap, term){
	console.log("Getting sentiment data...")
	var count = 0;
	var array = []
	var newValues = [];
	var i = 0;
	termMap.forEach((value)=> {
		array[i] = value;
		i++;
	})
	proms = array.map(function(value){
		return new Promise((resolve, reject) => {
			var result = getSentimentData(value).then((result) => {
				termMap.set(result[0], result);
				resolve();
			}).catch(function(){
				console.log('error')
			})
		});
	});
	return(Promise.all(proms)
	.then(function(){
		twitMap.set(term, termMap);
		console.log("Sentiment data returned successfully...");
	}).catch(function(){
		console.log("Getting sentiment data failed...")
		return new Promise((resolve, reject) => {return reject()});
	}))
}

// This function gets the sentiment value from each twit using sentimenAPI
async function getSentimentData(val){
	var array = []
	let score = await sentiment.analyzeTwit(val[2], val[3]);
	for (var i = 0; i < 5; i++){
		if (i == 4){
			array[i] = score
		}
		else {
			array[i] = val[i];
		}
	}
	return array;
}

// This function sets the twitMap containing all the information for all currencies
function setTwitMap(){
	for (var i = 0; i < terms.length; i++){
		twitMap.set(terms[i], setMapValues(tempMap.get(terms[i])));
	}
}

// This function sets the array containing all the individual maps for each currency
function setMapValues(res){
	var map = new Map();
	for (var i = 0; i < res.body.messages.length; i++){
		map.set(res.body.messages[i].id, setTwitArray(res.body.messages[i]));
	}
	return map;
}

// This function sets the array of values for each twit and stors it into a map using its id as key
function setTwitArray(res){
	var array = [];
	array[0] = res.id;
	array[1] = res.created_at.replace(/T/g,' ').replace(/Z/g,'');
	array[2] = res.body.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");;
	if(res.entities.sentiment == null){
		array[3] = res.entities.sentiment;
	}
	else{
		array[3] = res.entities.sentiment.basic;
	}
	return array;
}

function getTableCount(){
	for (var i = 0; i < terms.length; i++){
		db.getCount(terms[i]);
	}
}

function getValues(){
	for (var i = 0; i < terms.length; i++){
		db.retrieveAll(terms[i]);
	}
}

function insertValues(){
	console.log("Inserting values");
	for (var i = 0; i < terms.length; i++){
		twitMap.get(terms[i]).forEach((value)=>{
			db.insert(terms[i], value);
		})
	}
	console.log("Values inserted");
}

function printToConsole(){
	for (var i = 0; i < terms.length ;i++){
		console.log(terms[i]);
		twitMap.get(terms[i]).forEach((value)=>{
			console.log('ID:\t\t' + value[0]);
			console.log('Date:\t\t' + value[1]);
			console.log('Body:\t\t' + value[2]);
			console.log('Sentiment:\t' + value[3]);
			console.log('Sent Score:\t' + value[4]);
			console.log();
		})
	}
}



