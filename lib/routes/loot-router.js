const { Router } = require('express');
const client = require('../client');
// client.connect();

module.exports = Router()

	//adds a loot item
	.post('/', (req, res) => {
		const { name, description, value, rarity } = req.body;
		client.query(`INSERT INTO loot (name, description, value, rarity)
		VALUES ($1, $2, $3, $4)
		RETURNING *`, [name, description, value, rarity])
			.then(data => {
				res.send(data.rows);
			})
			.catch(err => console.error(err));
	})

	//gets all loot
	.get('/', (req, res) => {
		client.query('SELECT * from loot;')
			.then(data => {
				res.send(data.rows);
			})
			.catch(err => console.error(err));
	})

	//gets a loot item by ID
	.get('/:id', (req, res) => {
		client.query(`SELECT * FROM loot where id=${req.params.id};`)
			.then(data => {
				res.send(data.rows[0]);
			})
			.catch(err => console.error(err));
	});
