const { Router } = require('express');
const client = require('../client');
// client.connect();

module.exports = Router()
	.post('/', (req, res) => {
		client.query(`INSERT INTO monsters (race, rank)
		VALUES ($1, $2)
		RETURNING *`, [req.body.race, req.body.rank])
			.then(data => {
				res.send(data.rows);
			})
			.catch(err => console.error(err));
	})

	.get('/', (req, res) => {
		client.query('SELECT * from monsters;')
			.then(data => {
				res.send(data.rows);
			})
			.catch(err => console.error(err));
	})

	.get('/:id', (req, res) => {
		client.query(`SELECT * FROM monsters where id=${req.params.id};`)
			.then(data => {
				res.send(data.rows);
			})
			.catch(err => console.error(err));
	});
