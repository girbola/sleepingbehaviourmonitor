class DateFunctions {
	/*
	 * Parse only date from date & time. For example '2020-03-24 20:59:59' will return '2020-03-24'
	 */
	static parseOnlyDate(date) {
		console.log('Parse only date: ' + date);
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		return year + '-' + twoDigitConvert(month) + '-' + twoDigitConvert(day);
	}
}
/*
 * Converts integer from 1-9 and returns string 01-09
 */
function twoDigitConvert(value) {
	if (value <= 9) {
		return '0' + value;
	}
	return '' + value;
}
module.exports = DateFunctions;
