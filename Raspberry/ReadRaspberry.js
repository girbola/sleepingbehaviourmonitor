function ReadRaspberry() {}
ReadRaspberry.prototype.readRaspberryData = function() {
	// let jsonArray = [];
	let illumination = {};
	let temperature = {};
	let wokeUpTimes = {};
	const path = '/sbm/raspberry';
	print(date);
	illumination.name = 'illumination';
	illumination.v = array[demoIllumination];
	illumination.path = path;
	illumination.unit = 'lx';
	const currentTemp = randomIntFromInterval(tempterature_min, tempterature_max);
	temperature.name = 'temperature';
	temperature.v = currentTemp;
	temperature.path = path;
	temperature.unit = 'c';

	wokeUpTimes.name = 'wokeUpTimes';
	wokeUpTimes.v = currentTemp == 17 ? (wokeUpTimes_counter += 1) : 0;
	wokeUpTimes.path = path;
	wokeUpTimes.unit = '';

	jsonArray.push(illumination, temperature, wokeUpTimes);
	var array = [];
	return wokeUpTimes_counter;
};
let array = [
	0,
	0,
	0,
	0,
	0,
	1000,
	2000,
	3000,
	4000,
	5000,
	6000,
	8000,
	10000,
	8000,
	7000,
	6000,
	5000,
	3000,
	1000,
	0,
	0,
	0,
	0,
	0,
];
let illumination = 0;
let temperature = 0;
let wokeUpTimes = 0;
let nightCounter;

let wokeUpTimes_timer = 0;
let wokeUpTimes_counter = 0;
let awakeTimer = 0;
let randomWakeUpTest = 0;
let isAwake = false;
let currentTemp = 17;

const tempterature_min = 17;
const tempterature_max = 30;

let currentDate = new Date();
let startDate;
let endDate;

const path = '/sbm/raspberry';
function ReadData() {}

function sleepingLogic() {
	if(User.status = 'awake') {
		awakeTotal += 1000;
	} else {
		sleepingTotal +=1000;
	}
}
function getSleepingTotal() {}
function getWokeUpsTotal() {}

function SynchronizeDataToIoT() {}
ReadRaspberry.prototype.updateRaspberryInformation = function(User) {
	let demoIllumination;
	if (date instanceof Date) {
		demoIllumination = date.getHours();
		date = date.getTime();
	} else {
		var d = new Date(date);
		demoIllumination = d.getHours();
	}

	console.log('demoillu: ' + demoIllumination + ' dateee ' + date);

	// let jsonArray = [];

	print(date);
	randomWakeUpTest = randomIntFromInterval(1, 100);

	if (isAwake) {
		awakeUpTimer += 1000;
		if (awakeUpTimer >= 10000) {
			isAwake = false;
		}
		totalWokeUpTime += awakeUpTimer;
	} else {
		if (randomWakeUpTest == 90) {
			currentTemp = randomIntFromInterval(tempterature_min, tempterature_min + 1);
			isAwake = true;
		} else {
			currentTemp = randomIntFromInterval(tempterature_min, tempterature_max);
		}
	}
	// currentTemp = randomIntFromInterval(tempterature_min, tempterature_max);
	if (temperature >= 30) {
		User.status = 'sleeping';
	} else if (temperature <= 20) {
		User.status = 'awake';
	}
	wokeUpTimes.v = currentTemp == 17 ? (wokeUpTimes_counter += 1) : 0;
	User.status = 'awake;';
};
ReadRaspberry.prototype.getJsonArray = function() {
	this.wokeUpTimes_counter += 3;
	return 3;
};
function randomIntFromInterval(min, max) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}
function print(date) {
	console.log('Printing date: ' + date);
}
module.exports = ReadRaspberry;
