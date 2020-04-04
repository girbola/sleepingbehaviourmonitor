const user = require('./User/User');

var LearnJS = function(User) {
	if (User == null) {
		console.log('User were null');
	}
	User.status = "awake";
	console.log('status is : ' + User.status);
};

function Not(LearnJS) {
	LearnJS;
}
// console.log(LearnJS());
module.exports = LearnJS;
