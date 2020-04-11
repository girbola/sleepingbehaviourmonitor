function Weather() {}
const request = require('request');
const PropertiesReader = require('properties-reader');
const properties = new PropertiesReader('./data/iot.properties');
let https = require('https');
const fetch = require('node-fetch');

console.log('Updating weather');
let weatherDataArray_tmp = [];
const path = '/sbm/weather';

Weather.prototype.readWeatherData = async function(jsonArray, logger) {
	console.log('Json array lenght isssssssssssssssssssssssssssssss: ' + jsonArray.length);
	weatherDataArray_tmp = [];
	// async function get_Weather() {
	// 	try {
	// 		const response = await fetch('https://www.voacap.com/geo/weather.html?city=Turku');
	// 		console.log('Response::: ' + response.url);
	// 		const body = await response.text();
	// 		// console.log(json);
	// 		weatherDataArray_tmp(body);
	// 		return body;
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// }
	// fetch('https://www.voacap.com/geo/weather.html?city=Turku').then(function(r) {
	// 	weatherDataArray_tmp.push(r.text());
	// return r.text();
	// }).then(function(d) {
	// 	console.log("DDD: " + d);
	// });

	// get_Weather();

	// await fetch('https://www.voacap.com/geo/weather.html?city=Turku')
	// 		.then(response => {
	// 			if (response.ok) {
	// 				response.text();
	// 				console.log('Response was: ' + response);
	// 			} else {
	// 				console.error('Responce was: ' + response);
	// 			}
	// 		})
	// 		.then(body => {
	// 			weatherDataArray_tmp(body);
	// 			setDataToIOTTicket(weatherDataArray_tmp);
	// 		})
	// 		.catch(err => console.error(err));
	return new Promise(resolve => {
		request('https://www.voacap.com/geo/weather.html?city=Turku', function(err, response, body) {
			console.log('requesting');
			if (err) {
				logger.info('Responce is: ' + response);
				logger.info('error: ' + error);
			} else {
				weatherDataArray_tmp.push(body);
				console.log('======================================jsonArray length is: ' + jsonArray.length);
				setDataToIOTTicket(jsonArray);
				resolve(jsonArray.length);
			}
		});
		setTimeout
		console.log('requesting: ' + weatherDataArray_tmp.length);
	});
};

async function setDataToIOTTicket(jsonArray) {
	console.log('Setting data to IOT');
	let station = {};
	let temperature = {};
	let timeStamp = {};
	let temperature_feels_like = {};
	let pressure = {};
	let humidity = {};
	// let jsonArray = [];

	var weatherDataArray = JSON.parse(weatherDataArray_tmp);

	for (var i = 0; i < weatherDataArray.length; i++) {
		console.log('weather: ' + weatherDataArray[i]);

		if (weatherDataArray[i].station.includes('Turku')) {
			console.log('FOUND');
			station.name = properties.get('weather.station_name');
			station.v = weatherDataArray[i].station;
			station.path = properties.get('weather.path');
			console.log('station.name ' + station.name + ' station.v ' + station.v);

			timeStamp.name = properties.get('weather.timestamp_name');
			timeStamp.v = weatherDataArray[i].timestamp + ':00';
			timeStamp.path = properties.get('weather.path');
			console.log('tsmp: ' + timeStamp.name + ' timesvalue: ' + timeStamp.v);

			temperature.name = properties.get('weather.temperature_name');
			temperature.v = weatherDataArray[i].temperature;
			temperature.path = properties.get('weather.path');
			temperature.unit = properties.get('weather.temperature_unit');
			console.log('temperature: ' + temperature.name + ' temperature value: ' + temperature.v);

			temperature_feels_like.name = properties.get('weather.feels_like_name');
			temperature_feels_like.v = weatherDataArray[i].temperature_feels_like;
			temperature_feels_like.path = properties.get('weather.path');
			temperature_feels_like.unit = properties.get('weather.feels_like_unit');
			console.log(
				'temperature_feels_like: ' +
					temperature_feels_like.name +
					' temperature_feels_like value: ' +
					temperature_feels_like.v
			);

			pressure.name = properties.get('weather.pressure_name');
			pressure.v = weatherDataArray[i].pressure;
			pressure.path = properties.get('weather.path');
			pressure.unit = properties.get('weather.pressure_unit');
			console.log('pressure: ' + pressure.name + 'pressure value: ' + pressure.v);

			humidity.name = properties.get('weather.humidity_name');
			humidity.v = weatherDataArray[i].humidity;
			humidity.path = properties.get('weather.path');
			humidity.unit = properties.get('weather.humidity_unit');
			console.log('humidity name: ' + humidity.name + ' humidity value: ' + humidity.v);
			break;
		}
	}

	// readRaspberry.readRaspberry(new Date(), jsonArray);

	await jsonArray.push(station, timeStamp, temperature, temperature_feels_like, pressure, humidity);
	console.log('station END length: ' + jsonArray.length);
	logger.info("await jsonArray.push ended as planned. " + jsonArray.length);
}
module.exports = Weather;
