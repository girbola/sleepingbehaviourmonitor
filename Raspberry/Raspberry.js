const SleepingBehaviourMonitor = require('../SleepingBehaviourMonitor');
function Raspberry() { }
let illuminationArray = [
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
let temperature = 30;

const tempterature_min = 17;
const tempterature_max = 23;

function ReadRaspberry_temperature() {
	return this.temperature;
}
let temperature_Array = [];

Raspberry.prototype.resetValues = async function () {
	temperature_Array = [];
}

function average(array) {
	const sum = array.reduce((a, b) => a + b, 0);
	const avg = Math.round(sum / array.length) || 0;
	console.log('Returning AVG: ' + avg);
	if (array.length === 0) {
		return temperature;
	}
	return avg;
}

/* Sleeping simulator variables
 *
 */
const sleepTimeInterval = 3600000;
// const sleepTimeInterval = 4000;
var sleepingTimer_SIM = sleepTimeInterval; //= 1h in milliseconds

const wokeUpTimeInterval = 600000;
// const wokeUpTimeInterval = 5000;
var wokeUpTimer_count_MAX_SIM = wokeUpTimeInterval;

Raspberry.prototype.Raspberry_simulation = async function (User, logger) {
	if (sleepingTimer_SIM <= 0) {
		// Supposively waking up for peeing
		sleepingTimer_SIM = 0;
		temperature = 17;
		temperature_Array.push(temperature);
		sleepingTimer_SIM = sleepTimeInterval;
		console.log('Awake. Temp is set to: ' + temperature + ' temperature_Array length: ' + temperature_Array.length);
		logger.info(
			'Awake Temp is set to 17? = ' + temperature + ' temperature_Array length: ' + temperature_Array.length
		);
	}
	if (wokeUpTimer_count_MAX_SIM <= 0) {
		// console.log('Back to bed');
		temperature = 30;
		temperature_Array.push(temperature);
		wokeUpTimer_count_MAX_SIM = wokeUpTimeInterval;
		User.status = 'sleeping';
		console.log('Back to bed. temp: ' + temperature + ' temperature_Array length: ' + temperature_Array.length);
		logger.info('User is Sleeping - Temp changed to 30? = ' + temperature);
	}

	//changing User.status to wokeUp if temp is <= 20
	if (temperature <= 20) {
		User.status = 'wokeUp';
		wokeUpTimer_count_MAX_SIM -= 1000;
	} else {
		// Back to sleep
		User.status = 'sleeping';
		sleepingTimer_SIM -= 1000;
	}
};
Raspberry.prototype.getSleepingTimer_SIM = function () {
	return sleepingTimer_SIM;
};
Raspberry.prototype.getWokeUpTimer_count_MAX_SIM = function () {
	return wokeUpTimer_count_MAX_SIM;
};
Raspberry.prototype.getRaspberryData = async function (
	sleepingTimeTotal_value,
	wokeUpsTotal_value,
	wokeUpTimeTotal_value,
	hour,
	jsonArray
) {
	return new Promise((resolve) => {
		// let jsonArray = [];
		console.log('JsonArray is: ' + typeof jsonArray);
		let illumination = {};
		let temperature = {};
		let wokeUpTimes = {};
		let sleepingTotal = {};
		let wokeUpTimeTotal = {};
		const path = '/sbm/raspberry';
		// print(date);

		illumination.name = 'illumination';
		illumination.v = illuminationArray[hour];
		illumination.path = path;
		illumination.unit = 'lx';
		console.log('illumination name: ' + illumination.name + ' illumination.v ' + illumination.v + ' hour: ' + hour);

		temperature.name = 'temperature';
		temperature.v = average(temperature_Array);
		temperature.path = path;
		temperature.unit = 'c';
		console.log('temperature name: ' + temperature.name + ' temperature.v ' + temperature.v);

		wokeUpTimes.name = 'wokeUpTimes';
		wokeUpTimes.v = wokeUpsTotal_value;

		wokeUpTimes.path = path;
		wokeUpTimes.unit = '';
		console.log('wokeUpTimes name: ' + wokeUpTimes.name + ' wokeUpTimes.v ' + wokeUpTimes.v);

		sleepingTotal.name = 'sleepingTotal';
		sleepingTotal.v = sleepingTimeTotal_value;
		sleepingTotal.path = path;
		sleepingTotal.unit = '';
		console.log('sleepingTotal name: ' + sleepingTotal.name + ' sleepingTotal.v ' + sleepingTotal.v);

		wokeUpTimeTotal.name = 'wokeUpTimeTotal';
		wokeUpTimeTotal.v = wokeUpTimeTotal_value;
		wokeUpTimeTotal.path = path;
		wokeUpTimeTotal.unit = '';
		console.log('wokeUpTimeTotal name: ' + wokeUpTimeTotal.name + ' wokeUpTimeTotal.v ' + wokeUpTimeTotal.v);

		jsonArray.push(illumination, temperature, wokeUpTimes, sleepingTotal, wokeUpTimeTotal);
		resolve(jsonArray.length);
	});
};

module.exports = Raspberry;
