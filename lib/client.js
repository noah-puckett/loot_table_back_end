require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;

const DATABASE_URL = process.env.DATABASE_URL;

const client = new Client({
	connectionString: DATABASE_URL,
	ssl: { rejectUnauthorized: false }
});

// client.connect()
// 	.then(() => console.log('connected to the database!'))
// 	.catch(err => console.log(err));

// client.on('error', err => {
// 	console.error(`**************DATABASE ERROR, DINGUS**************** ${err}`);
// });


module.exports = client;
