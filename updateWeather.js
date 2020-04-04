const PropertiesReader = require('properties-reader');
const properties = new PropertiesReader('./data/iot.properties');
import fs from 'fs';

const ReadRaspberry = require('./Raspberry/ReadRaspberry');
var readRaspberry = new ReadRaspberry();
const request = require('request');
let https = require('https');
let weatherDataArray_tmp = [];

const path = '/sbm/weather';
//2020-03-24 20:00:00 - 2020-03-25 09:00:00
const date = '';
function reset() {
	weatherDataArray_tmp = [];
}
const updateWeather = async () => {
	console.log('Updating weather');
	let weatherDataArray_tmp = [];
	console.log('Updating weather');

	request('https://www.voacap.com/geo/weather.html?city=Turku', function(err, responce, body) {
		console.log('requesting');
		if (err) {
			console.log('Responce is: ' + responce);
			console.log('error: ' + error);
		} else {
			weatherDataArray_tmp.push(body);
			console.log('Responce is: ' + responce);
			setDataToIOTTicket();
		}
	});

	function setDataToIOTTicket() {
		console.log('Setting data to IOT');
		let station = {};
		let temperature = {};
		let timeStamp = {};
		let temperature_feels_like = {};
		let pressure = {};
		let humidity = {};
		let jsonArray = [];

		var weatherDataArray = JSON.parse(weatherDataArray_tmp);

		for (var i = 0; i < weatherDataArray.length; i++) {
			console.log('weather: ' + weatherDataArray[i]);

			if (weatherDataArray[i].station.includes('Turku')) {
				console.log('FOUND');
				station.name = properties.get('weather.station_name');
				station.v = weatherDataArray[i].station;
				station.path = properties.get('weather.path');

				timeStamp.name = properties.get('weather.timestamp_name');
				timeStamp.v = weatherDataArray[i].timestamp + ':00';
				timeStamp.path = properties.get('weather.path');

				temperature.name = properties.get('weather.temperature_name');
				temperature.v = weatherDataArray[i].temperature;
				temperature.path = properties.get('weather.path');
				temperature.unit = properties.get('weather.temperature_unit');

				temperature_feels_like.name = properties.get('weather.feels_like_name');
				temperature_feels_like.v = weatherDataArray[i].temperature_feels_like;
				temperature_feels_like.path = properties.get('weather.path');
				temperature_feels_like.unit = properties.get('weather.feels_like_unit');

				pressure.name = properties.get('weather.pressure_name');
				pressure.v = weatherDataArray[i].pressure;
				pressure.path = properties.get('weather.path');
				pressure.unit = properties.get('weather.pressure_unit');

				humidity.name = properties.get('weather.humidity_name');
				humidity.v = weatherDataArray[i].humidity;
				humidity.path = properties.get('weather.path');
				humidity.unit = properties.get('weather.humidity_unit');

				break;
			}
		}
	
		jsonArray.push(station, timeStamp, temperature, temperature_feels_like, pressure, humidity);
		console.log('Jsonarray: ' + JSON.stringify(jsonArray));

		let body = '';
		var auth =
			'Basic ' +
			new Buffer.from(properties.get('rest.user') + ':' + properties.get('rest.password')).toString('base64');
		let options = {
			method: 'POST',
			hostname: 'my.iot-ticket.com',
			port: 443,
			path: '/api/v1/process/write/SnP7c1kZNBxmVk8q60Fm5',
			headers: {
				'Content-Type': 'application/json',
				Authorization: auth,
			},
		};

		var req = https.request(options, function(response) {
			//When we receive data, we want to store it in a string
			response.on('data', function(chunk) {
				body += chunk;
			});
			//On end of the request, run what we need to
			response.on('end', function() {
				//Do Something with the data
				console.log(body);
			});
		});
		console.log('about to write req.write');
		req.write(JSON.stringify(jsonArray));
		req.end();
	}
};
export default updateWeather;
