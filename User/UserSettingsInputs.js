var UserSettingsInputs = {
	userEarliestTimeToSleep: '20:00:00',
	userLatestTimeToWakeUp: '08:00:00',
	userAge: 41,
	userName: 'John Doe',
	userLocation: 'Turku',

	get earliestTimeToSleep() {
		return this.userEarliestTimeToSleep;
	},
	set earliestTimeToSleep(value) {
		this.userEarliestTimeToSleep = value;
	},
	get latestTimeToWakeUp() {
		return this.userLatestTimeToWakeUp;
	},
	set latestTimeToWakeUp(value) {
		this.userLatestTimeToWakeUp = value;
	},

	get age() {
		return this.userAge;
	},
	set age(value) {
		this.userAge = value;
	},

	get name() {
		return this.userName;
	},
	set name(value) {
		this.userName = value;
	},

	get location() {
		return this.userLocation;
	},
	set location(value) {
		this.userLocation = value;
	},
};

module.exports = UserSettingsInputs;
