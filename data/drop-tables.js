const client = require('../lib/client');

run();

async function run() {

  try {
    await client.connect();
    
    await client.query(`
            DROP TABLE IF EXISTS creatures CASCADE;
            DROP TABLE IF EXISTS loot;
        `);

    // eslint-disable-next-line no-console
    console.log('drop tables complete');
  }
  catch(err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  finally {
    client.end();
  }
    
}
