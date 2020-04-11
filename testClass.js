const fetch = require('node-fetch');

//https://stackoverflow.com/questions/54635382/infinite-async-loops-using-setinterval
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
		if ((hour + 1) != 24) {
			return date.getHours() + 1;
		}
		return 0;
	}
	console.log('Round up: ');
	return date.getHours();
}

for (let i = 0; i < 24; i++) {
	var d = getHoursFromDate(new Date('2020-04-10T' + twoDigitConvert(i) + ':29:54.681'));
	console.log(' d: ' + d);
}
