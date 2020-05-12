const { Router } = require('express');
const client = require('../client');
// require('../client').connect();

module.exports = Router()
	.get('/', (req, res, next) => {
		client.connect();
		client.query('SELECT * from creatures;')
			.then(data => {
				res.send(data.rows);
			})
			.catch(err => console.error(err))
			.finally(() => client.end());
	})
	
	.get('/:someText', (req, res, next) => {
		console.log(req.params);
		res.json(`here's what you typed into the URL bar: ${req.params.someText}`);
	});
