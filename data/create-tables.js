const client = require('../lib/client');

// async/await needs to run in a function
run();

async function run() {

  try {
    // initiate connecting to db
    await client.connect();

    // run a query to create tables
    await client.query(`
      CREATE TABLE creatures (
          id SERIAL PRIMARY KEY NOT NULL,
          name VARCHAR(512) NOT NULL
      );           
      CREATE TABLE loot (
          id SERIAL PRIMARY KEY NOT NULL,
          name VARCHAR(512) NOT NULL,
          description VARCHAR(512) NOT NULL,
          value VARCHAR(256) NOT NULL,
          rarity INTEGER NOT NULL,
          creature_id INTEGER NOT NULL REFERENCES creatures(id)
          );
        `);

    console.log('create tables complete');
  }
  catch(err) {
    // problem? let's see the error...
    // eslint-disable-next-line no-console
    console.log(err);
  }
  finally {
    // success or failure, need to close the db connection
    client.end();
  }

}
