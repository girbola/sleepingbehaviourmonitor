function UserInput() {}
UserInput.prototype.getUserInput = async function(endDate, jsonArray) {
    return new Promise((resolve) => {
		// let jsonArray = [];
        console.log('JsonArray is: ' + typeof jsonArray);
     
		let sleepingQuality = {};
		let nightmares = {};
		let wokeUpTimes = {};
		
		const path = '/sbm/userInput';
//Testing
		sleepingQuality.name = 'sleepingQuality';
        sleepingQuality.v = -1;
        sleepingQuality.ts = endDate;
		sleepingQuality.path = path;
        sleepingQuality.unit = '';
        
        console.log('sleepingQuality name: ' + sleepingQuality.name + ' sleepingQuality.v ' + sleepingQuality.v);
        
        nightmares.name = 'nightmares';
        nightmares.v = -1;
        nightmares.ts = endDate;
		nightmares.path = path;
		nightmares.unit = '';
        console.log('nightmares name: ' + nightmares.name + ' nightmares.v ' + nightmares.v);
        
        wokeUpTimes.name = 'wokeUpTimes';
        wokeUpTimes.v = -1;
        wokeUpTimes.ts = endDate;
		wokeUpTimes.path = path;
		wokeUpTimes.unit = '';
        console.log('wokeUpTimes name: ' + wokeUpTimes.name + ' wokeUpTimes.v ' + wokeUpTimes.v);

        jsonArray.push(sleepingQuality, nightmares, wokeUpTimes);
        resolve(jsonArray.length);
    });
}
module.exports = UserInput;