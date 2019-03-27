var app = require('./config/express')();

app.listen(app.get('port'), function() {

    console.clear();
    console.log('- - - - - - - - - - - - - - - - ');
	console.log(' API Payment Challenge: ONLINE');
	console.log(' NODE_VERSION: ' + process.versions.node);
    console.log(' Express: Port ' + app.get('port'));
    console.log('- - - - - - - - - - - - - - - - ');
    console.log();

});

module.exports = app; 