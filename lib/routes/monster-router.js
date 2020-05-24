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
	
	.get('/:id', (req, res) => {
		client.connect();
		client.query(`SELECT * FROM monsters where id=${req.params.id};`)
			.then(data => {
				res.send(data.rows);
			})
			.catch(err => console.error(err))
			.finally(() => client.end());
	});
