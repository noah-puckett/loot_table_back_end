const client = require('../lib/client');
const loot = require('./loot.js');
const monsterData = require('./monsters.js');

run();

async function run() {

	try {

		await Promise.all(
			monsterData.map(monster => {
				return client.query(`
          INSERT INTO monsters (race, rank)
          VALUES ($1, $2)
          RETURNING *;`,
				[monster.race, monster.rank]);
			})
		);

		await Promise.all(
			loot.map(lootItem => {
				return client.query(`
          INSERT INTO loot (name, description, value, rarity)
		  VALUES ($1, $2, $3, $4)
		  RETURNING *;
          `,
				[lootItem.name, lootItem.description, lootItem.value, lootItem.rarity]);
			})
		);

		console.log('seed data load complete');
	}
	catch(err) {
		console.log(err);
	}

	finally {
		client.end();
	}

}
