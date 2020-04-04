class DateFunctions {
	// var startDate = '2020-03-24';
	// var startTime = '20:00:00';
	// // var endDate = '2020-03-25';
	// var endTime = '11:03:00';

	// var testDate = '2020-03-24 20:59:59';

	// const testD = Date.parse(new Date());
	// var sd = Date.parse(startDate + ' ' + startTime);
	// var ed = Date.parse(endDate + ' ' + endTime);
	// let date;
	// var sdd = new Date(sd);
	// const d = new Date();
	/*
	 * Parse date from date & time. For example '2020-03-24 20:59:59' will return '2020-03-24'
	 */
	static parseOnlyDate(date) {
		console.log("Parse only date: " + date);
		var year = date.getFullYear();
		var month = date.getMonth() +1;
		var day = date.getDate();
		console.log(month);
		console.log('dsfsdf ' + twoDigitConvert(month));
		var test = '' + year + '-' + twoDigitConvert(month) + '-' + twoDigitConvert(day);

		// return "" + year + '-' + twoDigitConvert(month) + '-' + twoDigitConvert(day);
		return test;
	}
	/*
	 * Converts integer number 0-9 for example to 09
	 */

	startTimer(sd, ed) {
		while (true) {
			const testD = Date.parse(new Date());
			if (testD >= sd && testD <= ed) {
				console.log('Date is: ' + date);
				console.log('Date was in scale');
				if (date == null) {
					console.log('Date were null');
					date = Date.parse(new Date());
					console.log('Date were ' + date);
				} else {
					date = Date.parse(new Date());
					console.log('Date were updated ' + date);
				}
			} else {
				console.log('Test date were out of scale');
				break;
			}
			wait(1000);
		}
	}
	wait(ms) {
		var start = new Date().getTime();
		var end = start;
		while (end < start + ms) {
			end = new Date().getTime();
		}
	}
}
function twoDigitConvert(value) {
	if (value <= 9) {
		return '0' + value;
	}
	return '' + value;
}
module.exports = DateFunctions;
