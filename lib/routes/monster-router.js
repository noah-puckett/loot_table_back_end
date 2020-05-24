const { Router } = require('express');
const client = require('../client');
client.connect();

module.exports = Router()

	//adds a loot item's ID to a monster
	.post('/add-loot', (req, res) => {
		const { monsterId, lootId } = req.body;
		client.query(`INSERT INTO monster_loot (monster_id, loot_id)
	VALUES ($1, $2)
	RETURNING *`, [monsterId, lootId])
			.then(data => {
				res.send(data.rows);
			})
			.catch(err => console.error(err));
	})

	//adds a monster to the DB
	.post('/', (req, res) => {
		const { race, rank } = req.body;
		client.query(`INSERT INTO monsters (race, rank)
		VALUES ($1, $2)
		RETURNING *`, [race, rank])
			.then(data => {
				res.send(data.rows);
			})
			.catch(err => console.error(err));
	})

	//gets all loot IDs by monster ID
	.get('/:monsterId/loot', (req, res) => {
		client.query(`SELECT * from monster_loot WHERE monster_id=${req.params.monsterId};`)
			.then(data => {
				res.send(data.rows);
			})
			.catch(err => console.error(err));
	})

	//gets all monsters
	.get('/', (req, res) => {
		client.query('SELECT * from monsters;')
			.then(data => {
				res.send(data.rows);
			})
			.catch(err => console.error(err));
	})

	//gets a monster by ID
	.get('/:id', (req, res) => {
		client.query(`SELECT * FROM monsters where id=${req.params.id};`)
			.then(data => {
				res.send(data.rows);
			})
			.catch(err => console.error(err));
	});
