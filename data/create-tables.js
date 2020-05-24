const client = require('../lib/client');

run();

async function run() {

	try {
		await client.connect();
		await client.query(`
      CREATE TABLE monsters (
          id SERIAL PRIMARY KEY NOT NULL,
          race VARCHAR(512) NOT NULL,
          rank INTEGER NOT NULL
      );           
      CREATE TABLE loot (
          id SERIAL PRIMARY KEY NOT NULL,
          name VARCHAR(512) NOT NULL,
          description VARCHAR(512) NOT NULL,
          value VARCHAR(256) NOT NULL,
          rarity INTEGER NOT NULL
          );
        `);

		console.log('create tables complete');
	}
	catch(err) {
		// eslint-disable-next-line no-console
		console.log(err);
	}
	finally {
		//close db connection
		client.end();
	}

}
