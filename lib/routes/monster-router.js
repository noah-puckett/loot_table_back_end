import { Router } from 'express';
import client from '../client';


export default Router()

	//adds a monster to the DB
	.post('/', (req, res) => {
		const { race, rank } = req.body;
		client.query(`INSERT INTO monsters (race, rank)
		VALUES ($1, $2)
		RETURNING *`, [race, rank])
			.then(data => {
				res.send(data.rows[0]);
			})
			// eslint-disable-next-line no-console
			.catch(err => console.error(err));
	})
	

	//gets all monsters
	.get('/', (req, res) => {
		client.query('SELECT * from monsters;')
			.then(data => {
				res.send(data.rows);
			})
			// eslint-disable-next-line no-console
			.catch(err => console.error(err));
	})


	//adds a loot item id to join table monster_loot
	.post('/add-loot', (req, res) => {
		const { monsterId, lootId } = req.body;
		client.query(`INSERT INTO monster_loot (monster_id, loot_id)
	VALUES ($1, $2)
	RETURNING *`, [monsterId, lootId])
			.then(data => {
				res.send(data.rows);
			})
			// eslint-disable-next-line no-console
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
			// eslint-disable-next-line no-console
			.catch(err => console.error(err));
	})


	//gets a monster by ID
	.get('/:id', (req, res) => {
		client.query(`SELECT * FROM monsters where id=${req.params.id};`)
			.then(data => {
				res.send(data.rows);
			})
			// eslint-disable-next-line no-console
			.catch(err => console.error(err));
	})

	//updates a monster by ID
	.patch('/:id', async(req, res) => {
		//grab the original item to use as default values if new values are left blank
		const originalData = await client.query(`SELECT * FROM monsters WHERE id=${req.params.id}`);

		//rename for clarity and namespace conflicts
		const { race: originalRace, rank: originalRank } = originalData.rows[0];

		client.query(`UPDATE monsters
		SET race = $1, rank = $2
		WHERE id =${req.params.id};`, [req.body.race || originalRace, req.body.rank || originalRank])
			.then(() => {
				res.send('Success!');
			})
			// eslint-disable-next-line no-console
			.catch(err => console.error(err));
	})

	//TODO: this is a clumsy delete method, and eventually we need to change the join table to cascade on delete, 
	//otherwise we'll run into the error that we can't delete a primary key that functions as a foreign key in another table
	.delete('/:id', async(req, res) => {
		const deletedItem = await client.query(`SELECT * FROM monsters WHERE id=${req.params.id}`);
		client.query(`DELETE FROM monster_loot WHERE monster_id=${req.params.id};
		DELETE FROM monsters where id=${req.params.id}`)
			.then(result => {
				if(result[1].rowCount >= 1) {
					//TODO: would like this to be less messy if possible?
					res.send({ message: 'Deletion successful, the following item was deleted from the database:', deletedItem: deletedItem.rows[0] });
				}
				else {
					res.send({ error: `No item matching the loot ID of ${req.params.id} was found. No item was deleted.` });
				}
			})
			// eslint-disable-next-line no-console
			.catch(err => console.error(err));
	});
