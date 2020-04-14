const PropertiesReader = require('properties-reader');
const properties = new PropertiesReader('./data/iot.properties');
const Raspberry = require('./Raspberry/Raspberry');
const Weather = require('./Weather/Weather');
const User = require('./User/User');
const UserInput = require('./User/UserInput');

const UserSettingsInputs = require('./User/UserSettingsInputs');
const DateFunctions = require('./DateFunctions');

const log4js = require('log4js');
log4js.configure({
	appenders: {
		everything: { type: 'file', filename: './data/sbm.log' },
	},
	categories: { default: { appenders: ['everything'], level: 'debug' } },
});

const logger = log4js.getLogger('sbm');
var raspberry = new Raspberry();
var weather = new Weather();
var userInput = new UserInput();
let https = require('https');

let sleepingTotal = 0;
let wokeUpsTotal = 0;
let wokeUpTimeTotal = 0;
const updateIotInterval = 1200000;
let updateIotIntervalCounter = updateIotInterval;

let cronRunning = true;
logger.debug('UserSettingsInputs: ' + UserSettingsInputs.earliestTimeToSleep);
logger.debug('UserSettingsInputs: ' + UserSettingsInputs.latestTimeToWakeUp);
logger.debug('UserSettingsInputs: ' + UserSettingsInputs.name);
logger.debug('UserSettingsInputs: ' + UserSettingsInputs.age);
logger.debug('UserSettingsInputs: ' + UserSettingsInputs.location);
logger.debug('UserSettingsInputs: ' + UserSettingsInputs.age);

let cancelled = false;
let jsonArray = [];

function isCancelled() {
	return cancelled;
}

async function uploadDataToIoT(jsonArray, logger) {
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

	var req = https.request(options, function (response) {
		//When we receive data, we want to store it in a string
		response.on('data', function (chunk) {
			body += chunk;
		});
		//On end of the request, run what we need to
		response.on('end', function () {
			//Do Something with the data
			console.log(body);
		});
	});
	console.log('about to write req.write. jsonArray.length: ' + jsonArray.length);
	req.write(JSON.stringify(jsonArray));
	req.end();
	req.on('error', function (e) {
		logger.error('Upload failed: ' + e);
	});
	logger.info('Updates were send to my.iot-ticket');
	return true;
	jsonArray = [];
}

async function UpdateData() {
	let i = 0;

	console.log('Updating to IoT ticket');
	jsonArray = [];
	const weatherRead = await weather.readWeatherData(jsonArray);
	console.log('weatherRead resolved: ' + weatherRead);

	const rasp = await raspberry.getRaspberryData(
		sleepingTotal,
		wokeUpsTotal,
		wokeUpTimeTotal,
		getHoursFromDate(new Date()),
		jsonArray
	);
	console.log('rasp resolved: ' + rasp);
	
	const userInput = await userInput.getUserInput(endDate, jsonArray);
	console.log('userInput resolved: ' + userInput);
	
	console.log('Jsonarray length is: ' + jsonArray.length);
	if (jsonArray.length >= 1) {
		console.log('About to update');
		logger.info('About to update content to my.iot-ticket: ' + JSON.stringify(jsonArray));

		const uploading = await uploadDataToIoT(jsonArray, logger);
		logger.info();
		console.log('Uploading done: ' + uploading);
		wait(10000);
		console.log('Updated');
	} else {
		console.log('Not updating!');
		logger.error('JSON array length were not >= 1. Length was: ' + jsonArray.length);
	}
	console.log('Jsonarray length is: ' + jsonArray.length);
	i += 1;
	console.log('i exe: ' + i);
	// return true;
}
function getHoursFromDate(date) {
	if (date.getHours() * 60 + date.getMinutes() >= 91) {
		return date.getHours() + 1;
	}
	return date.getHours();
}
let startDate;
let endDate;
/*
 * If startDate and endDate are valid.
 *For example if startDate is 2020-04-03 22:00 - endDate 2020-04-04 08:00 = 10hours it will be valid
 * but if startDate is 2020-04-04 22:00 endDate 2020-04-04 08:00 = -14hours  it won't be a valid date range.
 */
let valid = true;
async function InitNextDay() {
	startDate = getNewStartDate();
	endDate = getNewEndDate();
}

async function SleepingBehaviourMonitor() {
	let wokeUp = false;
	let sleeping = true;
	startDate = getNewStartDate();
	// startDate = Date.parse(new Date()); // Running debugging
	endDate = getNewEndDate();
	logger.info('SleepingBevaviourMonitor started. ' + ' StartDate is: ' + startDate + ' EndDate is: ' + endDate);
	console.log('SleepingBevaviourMonitor started. ' + ' StartDate is: ' + startDate + ' EndDate is: ' + endDate);
	let dataSynchronized = true;
	while (true) {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		if (valid) {
			const currentTime = Date.parse(new Date());
			if (currentTime >= startDate && currentTime <= endDate) {
				setDataSychronized(false);
				await HandleUser();
				await HandleRaspberry();
				updateIotIntervalCounter -= 1000;
				if (updateIotIntervalCounter <= 0) {
					console.log('UpdateDataaa');
					await UpdateData();
					updateIotIntervalCounter = updateIotInterval;
				}
			} else {
				//Out of date scale
				console.log(
					'current: ' +
						currentTime +
						' Date scale out of range : START: ' +
						startDate +
						' EEEEEEEND: ' +
						endDate
				);
				console.log('Recording has ended for this day');
				if (!dataSynchronized) {
					logger.info('data will be synchronized');

					if (jsonArray.length >= 1) {

						await UpdateData();
						logger.info('===Data synchronized and recording data has been paused');
					}
					dataSynchronized = true;
					await InitNextDay();
					logger.info(
						'Next day has been initialized. StartDate is now: ' + startDate + ' ending date is: ' + endDate
					);

					// break;
				}
			}
		}
		if (cancelled) {
			console.log('SBM cancelled');
			break;
		}
	}
	async function setDataSychronized(value) {
		if (dataSynchronized != value) {
			dataSynchronized = value;
		}
	}
	async function HandleRaspberry() {
		raspberry.Raspberry_simulation(User, logger);
	}

	async function HandleUser() {
		switch (User.status) {
			case 'sleeping':
				if (wokeUp) {
					wokeUp = false;
					sleeping = true;
					logger.debug(
						'Sleeping. WokeUps are: ' +
							wokeUpsTotal +
							' wokeUpTimeTotal: ' +
							wokeUpTimeTotal +
							' sleepingTotal: ' +
							sleepingTotal
					);
				}
				sleepingTotal += 1000;

				break;
			case 'wokeUp':
				if (sleeping) {
					sleeping = false;
					wokeUp = true;
					wokeUpsTotal += 1;
					logger.debug(
						'Sleeping ended. WokeUps are: ' +
							wokeUpsTotal +
							' wokeUpTimeTotal: ' +
							wokeUpTimeTotal +
							' sleepingTotal: ' +
							sleepingTotal
					);
				}
				wokeUpTimeTotal += 1000;
				break;
			case 'awake':
				break;
			default:
				break;
		}
	}
}
function getNewStartDate() {
	let today = new Date();
	today = DateFunctions.parseOnlyDate(today) + ' ' + UserSettingsInputs.earliestTimeToSleep;
	console.log('today ' + today);
	return Date.parse(today);
}
function getNewEndDate() {
	let endDate = new Date();
	endDate.setDate(endDate.getDate() + 1);
	// endDate.setDate(endDate.getDate() + 0);
	let pdate = DateFunctions.parseOnlyDate(endDate);
	console.log('pdate: ' + pdate);
	endDate = pdate + ' ' + UserSettingsInputs.latestTimeToWakeUp;
	console.log('enD ' + endDate);
	return Date.parse(endDate);
}
function wait(ms) {
	var start = new Date().getTime();
	var end = start;
	while (end < start + ms) {
		end = new Date().getTime();
	}
}

SleepingBehaviourMonitor();
// UpdateData();

module.exports = { isCancelled };
