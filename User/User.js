var User = {
	/**
	 * currentStatus: 'sleeping',
	 * currentStatus: 'awake',
	 * currentStatus: 'wokeUp',
	 */
	currentStatus: 'awake',
	get status() {
		return this.currentStatus;
	},
	set status(value) {
		this.currentStatus = value;
	},
};
module.exports = User;
