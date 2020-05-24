const { Router } = require('express');
const client = require('../client');

module.exports = Router()
	.get('/', (req, res) => {
		client.connect();
		client.query('SELECT * from monsters;')
			.then(data => {
				res.send(data.rows);
			})
			.catch(err => console.error(err))
			.finally(() => client.end());
	})
	
	.get('/:someText', (req, res) => {
		console.log(req.params);
		res.json(`here's what you typed into the URL bar: ${req.params.someText}, and I'm a goober`);
	});
