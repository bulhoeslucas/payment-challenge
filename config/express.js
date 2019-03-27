var express = require('express'), 		
    load = require('express-load');
    
module.exports = function() {
	var app = express();

	app.set('port', 5500);

	load('controllers', {cwd: 'app'})
		//.then('controllers')
		//.then('middlewares')
		.then('routes')
		.into(app);

	return app;
};