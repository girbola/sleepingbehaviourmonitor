const PropertiesReader = require('properties-reader');
const properties = new PropertiesReader('./data/iot.properties');
const https = require('https');

let today;
let yesterday;
let earliest_Sleeping;
let latestwakeUpTime;

function fetchingData(startDate, endDate) {
	console.log('Testi');

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
		.then(function (response) {
			//response is plain encoded text
			if (response.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' + response.status);
				return;
			}
			//convert text to json
			response.json().then(function (data) {
				console.log('Dataaaa');
				data.datanodeReads.map((value, key) => {
					console.log('Valueee: ' + value);
					value.values.map((v, i) => {});
				});
			});
		})
		.catch(function (err) {
			console.log('Fetch Error : ', err);
		});
}
