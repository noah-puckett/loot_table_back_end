const { Router } = require('express');
const client = require('../client');


module.exports = Router()

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
	

	//gets all monsters
	.get('/', (req, res) => {
		client.query('SELECT * from monsters;')
			.then(data => {
				res.send(data.rows);
			})
			.catch(err => console.error(err));
	})


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


	//gets all loot by monster ID
	.get('/:monsterId/loot', (req, res) => {
		client.query(`SELECT * 
		FROM loot
		INNER JOIN monster_loot
		ON loot_id = loot.id
		WHERE monster_id = ${req.params.monsterId};`)
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
	})

	//this is a clumsy delete method, and eventually we need to change the join table to cascade on delete, 
	//otherwise we'll run into the error that we can't delete a primary key that functions as a foreign key in another table
	.delete('/:id', async(req, res) => {
		const deletedItem = await client.query(`SELECT * FROM monsters WHERE id=${req.params.id}`);
		client.query(`DELETE FROM monster_loot WHERE monster_id=${req.params.id};
		DELETE FROM monsters where id=${req.params.id}`)
			.then(result => {
				if(result[1].rowCount >= 1) {
					res.send({ message: 'Deletion successful, the following item was deleted from the database:', deletedItem: deletedItem.rows[0] }); //would like this to be less messy if possible?
				}
				else {
					res.send({ error: `No item matching the loot ID of ${req.params.id} was found. No item was deleted.` });
				}
			})
			.catch(err => console.error(err));
	});
