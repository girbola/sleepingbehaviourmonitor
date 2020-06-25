const fetch = require('node-fetch');
const request = require('request');

async function execute1() {
	let i = 0;
	while (true) {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		i += 1;
		console.log('i exe: ' + i);
	}
}

async function execute2() {
	let i = 0;
	while (true) {
		await new Promise((resolve) => setTimeout(resolve, 900));
		i += 1;
		console.log('i2 exe: ' + i);
	}
}

// execute1();
// execute2();
function twoDigitConvert(value) {
	if (value <= 9) {
		return '0' + value;
	}
	return '' + value;
}
function getHoursFromDate(date) {
	let hour = date.getHours();

	if (date.getMinutes() >= 31) {
		if (hour + 1 != 24) {
			return date.getHours() + 1;
		}
		return 0;
	}
	console.log('Round up: ');
	return date.getHours();
}

// var d = getHoursFromDate(new Date('2020-04-10T' + 22 + ':31:54.681'));
// console.log(' d: ' + d);

async function getWeather(city) {
	return new Promise((resolve) => {
		setTimeout(() => {
			request('https://www.voacap.com/geo/weather.html?city=' + city, function (error, response, body) {
				console.log('requesting: ' + response);
				console.log('error: ' + error);
				if (error) {
					resolve(null);
				} else {
					// console.log('Body found: ' + body);
					resolve(body);
				}
			});
		}, 4000);
	});
}

async function weatherTest() {
	const result = await getWeather('Helsinki');
	console.log('Result were: ' + typeof result);
	if (result != null) {
		if (result.includes('No such city:')) {
			console.log('City were not valid');
		} else {
			console.log('City FOUDN!: ');
		}
		console.log('Resutl: ' + result.includes('No such city:') ? 'yes' : 'no');
	} else {
		console.log('Result were null!');
	}
}
weatherTest();
