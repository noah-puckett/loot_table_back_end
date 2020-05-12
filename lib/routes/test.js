const { Router } = require('express');
require('../client').connect();

module.exports = Router()
	.get('/', (req, res, next) => {
		res.send('SUCCESS');
	})
	
	.get('/:someText', (req, res, next) => {
		console.log(req.params);
		res.json(`here's what you typed into the URL bar: ${req.params.someText}`);
	});
