require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;

const DATABASE_URL = process.env.DATABASE_URL;

const client = new Client({
	connectionString: DATABASE_URL,
	ssl: { rejectUnauthorized: false }
});

//here, and only here, is where the client.connect() goes. move it and we shall perish.
client.connect();

module.exports = client;
