const fs = require('fs');

/**
 * Raspberry simulator
 */

var startDate = '2020-03-26';
var startTime = '15:18:00';

var endDate = '2020-03-26';
// var endDate = '2020-03-25';
var endTime = '17:51:00';

const illumination_min = 0;
const illumination_max = 3000;
const tempterature_min = 16;
const tempterature_max = 23;
const path = '/sbm/raspberry';

let temperatureArray = new Set();
let previousDate;
let jsonArray = [];
let cancel = false;
let recording = true;

// console.log(parseOnlyDate(new Date()));
// readFile('./data/raspberry/file.txt');

// startRaspberry(new Date(startDate + ' ' + startTime), new Date(endDate + ' ' + endTime));
function readFile(file) {
	fs.readFile(file, 'utf-8', function(err, data) {
		if (err) {
			console.error(err);
			return;
		}
		console.log(data);
	});
}
/*
 * parseOnlyDate 2020-03-25 15:18:00 returns 2020-03-25
 */

function parseOnlyDate(date) {
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();
	return '' + year + '-' + twoDigitConvert(month) + '-' + twoDigitConvert(day);
}

/*
 * parseOnlyDatePlusHour 2020-03-25 15:18:00 returns 2020-03-25 15:00:00
 */

function parseOnlyDatePlusHour(date) {
	if (Number(date)) {
		date = new Date(date);
	}
	if (date != NaN) {
		return new Date(
			date.getFullYear() +
				'-' +
				twoDigitConvert(date.getMonth()) +
				'-' +
				twoDigitConvert(date.getDate()) +
				' ' +
				twoDigitConvert(date.getHours()) +
				':' +
				'00' +
				':' +
				'00'
		).getTime();
	}

	return null;
}
/*
 * Converts integer number 0-9 for example to 09
 */
function twoDigitConvert(value) {
	if (value <= 9) {
		return '0' + value;
	}
	return '' + value;
}
function readRaspberry() {
	const jsonArray = [];
	illumination.name = 'illumination';
	illumination.v = randomIntFromInterval(illumination_min, illumination_max);
	illumination.path = path;
	illumination.unit = 'lx';

	temperature.name = 'temperature';
	temperature.v = randomIntFromInterval(tempterature_min, tempterature_max);
	temperature.path = path;
	temperature.unit = 'c';
	jsonArray.push(illumination, temperature);
}
function startRaspberry(sd, ed) {
	const startDate = Date.parse(sd);
	const endDate = Date.parse(ed);

	var illumination = {};
	var temperature = {};
	for (;;) {
		const currentDateTime = Date.parse(new Date());
		console.log('Starting?' + startDate + ' endDate ' + endDate + ' cuu: ' + currentDateTime);
		if (currentDateTime >= startDate && currentDateTime <= endDate) {
			console.log('Starting?');
			recording = true;
			while (true) {
				if (recording) {
					const currentDateTime = Date.parse(new Date());
					console.log('CurrentTime: ' + currentDateTime + ' starttime: ' + sd + ' endTime: ' + ed);
					illumination.name = 'illumination';
					illumination.v = randomIntFromInterval(illumination_min, illumination_max);
					illumination.path = path;
					illumination.unit = 'lx';

					temperature.name = 'temperature';
					temperature.v = randomIntFromInterval(tempterature_min, tempterature_max);
					
					temperature.path = path;
					temperature.unit = 'c';

					if (cancel) {
						break;
					}
					if (currentDateTime >= startDate && currentDateTime <= endDate) {
						temperatureArray.add(temperature.v);
					} else {
						calculateData();
						break;
					}
					wait(1000);
				}
			}
		}
		wait(1000);
	}
}
function calculateData() {
	console.log('calculating has stopped: ' + Math.min(...temperatureArray) + " MAX: " + Math.max(...temperatureArray) + " lenght of array: " + temperatureArray.size);
	recording = false;
}
function randomIntFromInterval(min, max) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function wait(ms) {
	var start = new Date().getTime();
	var end = start;
	while (end < start + ms) {
		end = new Date().getTime();
	}
}
// let d = dateFunctions.parseOnlyDate(new Date());
// console.log("d: " +d);
