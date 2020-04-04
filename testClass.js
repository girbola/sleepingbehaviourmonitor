const fetch = require('node-fetch');
const User = require('./User/User');

const LearnJS = require('./LearnJS');

const ReadRaspberry = require('./Raspberry/ReadRaspberry');
const PropertiesReader = require('properties-reader');
const properties = new PropertiesReader('./data/iot.properties');
const https = require('https');

const fs = require('fs');

var readRaspberry = new ReadRaspberry();
// readRaspberry.readRaspberry(new Date());
var date1 = new Date();
// var user = new User();
// console.log('Date: ' + typeof date1);
User.status = 'Kili';
// console.log("user: " + User.status);
// // console.log(User.status);
// // LearnJS(User);
// console.log(User.status);

// fetchingData();

// console.log("kalaaa: " + readRaspberry.ray());

function fetchingData() {
	console.log('Testi');
	//  https://my.iot-ticket.com/api/v1/process/read/SnP7c1kZNBxmVk8q60Fm5?datanodes=sbm/weather/temperature,temperature_feels_like,timestamp,humidity&fromdate=1584720000&limit=50
	fetch(
		'https://my.iot-ticket.com/api/v1/process/read/SnP7c1kZNBxmVk8q60Fm5?datanodes=sbm/weather/Temperature&fromdate=1584720000&limit=30',
		{
			method: 'get',
			headers: {
				Authorization:
					'Basic ' +
					new Buffer.from(properties.get('rest.user') + ':' + properties.get('rest.password')).toString(
						'base64'
					),
				'Content-Type': 'application/json',
			},
		}
	)
		.then(function(response) {
			//response is plain encoded text
			if (response.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' + response.status);
				return;
			}
			//convert text to json
			response.json().then(function(data) {
				console.log('Dataaaa');
				data.datanodeReads.map((value, key) => {
					console.log('Valueee: ' + value);
					value.values.map((v, i) => {
						console.log('VVVVVVVVVVVVV: ' + v.v);
					});
				});
			});
		})
		.catch(function(err) {
			console.log('Fetch Error : ', err);
		});
}
function testSensors() {
	console.log('feels like: ' + properties.get('weather.feels_like_name'));
	// console.log("password: " + properties.get("rest.password"));
}
// print(date1);
function print(date) {
	// https://my.iot-ticket.com/api/v1/process/read/SnP7c1kZNBxmVk8q60Fm5?datanodes=sbm/weather/Temperature&fromdate=1584720000&limit=30

	var auth =
		'Basic ' +
		new Buffer.from(properties.get('rest.user') + ':' + properties.get('rest.password')).toString('base64');
	let options = {
		method: 'POST',
		hostname: properties.get('host'),
		port: 443,
		path: '/api/v1/process/read/SP7c1kZNBxmVk8q60Fm5',
		headers: {
			'Content-Type': 'application/json',
			Authorization: auth,
		},
	};
}
//https://stackoverflow.com/questions/54635382/infinite-async-loops-using-setinterval
async function execute1() {
	let i = 0;
	while (true) {
		await new Promise(resolve => setTimeout(resolve, 1000));
		
		i += 1;
		console.log('i exe: ' + i);
	}
}

async function execute2() {
	let i = 0;
	while (true) {
		await new Promise(resolve => setTimeout(resolve, 900));
		i += 1;
		console.log('i2 exe: ' + i);
	}
}

execute1();
execute2();
