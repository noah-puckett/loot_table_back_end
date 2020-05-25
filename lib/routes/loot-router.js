const { Router } = require('express');
const client = require('../client');


module.exports = Router()

	//adds a loot item
	.post('/', (req, res) => {
		const { name, description, value, rarity } = req.body;
		client.query(`INSERT INTO loot (name, description, value, rarity)
		VALUES ($1, $2, $3, $4)
		RETURNING *`, [name, description, value, rarity])
			.then(data => {
				res.send(data.rows[0]);
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
	})


	//updates a loot item by ID
	.patch('/:id', async(req, res) => {
		const originalData = await client.query(`SELECT * FROM loot WHERE id=${req.params.id}`);
		const { 
			name: originalName, 
			description: originalDescription, 
			value: originalValue, 
			rarity: originalRarity 
		} = originalData.rows[0];

		client.query(`UPDATE loot
		SET name = $1, description = $2, value = $3, rarity = $4
		WHERE id =${req.params.id};`, 
		[req.body.name || originalName, 
			req.body.description || originalDescription, 
			req.body.value || originalValue, 
			req.body.rarity || originalRarity])
			.then(data => {
			//TODO: find out how to check if nothing was updated, right now it returns an empty array and that's suboptimal
				res.send(data);
			})
			.catch(err => console.error(err));
	})


	//TODO: this is a clumsy delete method, and eventually we need to change the join table to cascade on delete, 
	//otherwise we'll run into the error that we can't delete a primary key that functions as a foreign key in another table
	.delete('/:id', async(req, res) => {
		const deletedItem = await client.query(`SELECT * FROM loot WHERE id=${req.params.id}`);
		client.query(`DELETE FROM monster_loot WHERE loot_id=${req.params.id};
		DELETE FROM loot where id=${req.params.id}`)
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
