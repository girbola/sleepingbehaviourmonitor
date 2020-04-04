const ReadRaspberry = require('./Raspberry/ReadRaspberry');
const PropertiesReader = require('properties-reader');
const properties = new PropertiesReader('./data/iot.properties');
const fs = require('fs');
function IoTTicket() {
	IoTTicket.prototype.post = function(jsonArray, time) {
		var auth =
			'Basic ' +
			new Buffer.from(properties.get('rest.user') + ':' + properties.get('rest.password')).toString('base64');
		let options = {
			method: 'POST',
			hostname: properties.get('rest.host'),
			port: 443,
			path: '/api/v1/process/write/' + properties.get('device.id'),
			headers: {
				'Content-Type': 'application/json',
				Authorization: auth, //note the authe variable created above
			},
        };
        let body = "";
		// var req = https.request(options, function(response) {
		// 	//When we receive data, we want to store it in a string
		// 	response.on('data', function(chunk) {
		// 		body += chunk;
		// 	});
		// 	//On end of the request, run what we need to
		// 	response.on('end', function() {
		// 		//Do Something with the data
		// 		console.log(body);
		// 	});
		// });
		// req.write(JSON.stringify(jsonArray));
		// req.end();
	};
	IoTTicket.prototype.get = function() {};
}
module.exports = IoTTicket;
