const client = require('../lib/client');
// import our seed data:
const loot = require('./loot.js');
const creatureData = require('./creatures.js');

run();

async function run() {

  try {
    await client.connect();

    const creatures = await Promise.all(
      creatureData.map(creature => {
        return client.query(`
          INSERT INTO creatures (name)
          VALUES ($1)
          RETURNING *;`,
        [creature.name]);
      })
    );
      
    const creature = creatures[0].rows[0];

    await Promise.all(
      loot.map(lootItem => {
        return client.query(`
          INSERT INTO loot (name, description, value, rarity, creature_id)
          VALUES ($1, $2, $3, $4, $5);
          `,
        [lootItem.name, lootItem.description, lootItem.value, lootItem.rarity, creature.id]);
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
