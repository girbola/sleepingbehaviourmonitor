const fetch = require('node-fetch');


//https://stackoverflow.com/questions/54635382/infinite-async-loops-using-setinterval
async function execute1() {
	let i = 0;
	while (true) {
		await new Promise(resolve => setTimeout(resolve, 1000));
		
		i += 1;
		console.log('i exe: ' + i);
	}
}

async function execute2() {
	let i = 0;
	while (true) {
		await new Promise(resolve => setTimeout(resolve, 900));
		i += 1;
		console.log('i2 exe: ' + i);
	}
}

// execute1();
// execute2();
var d = new Date(1586596091000);
var d2 = d.toLocaleString();
console.log(" d2: " +d2);