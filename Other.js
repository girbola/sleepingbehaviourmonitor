const fs = require('fs');

// makeContent();
function Other() {
    const content = 'This is content';
    // writeFile('./data/raspberry/file.txt', content);
}
 Other.prototype.writeFile = function(file, content) {
	fs.writeFile('./data/raspberry/file.txt', content, err => {
		if (err) {
			console.error(err);
			return;
		}
	});
}
module.exports = Other;