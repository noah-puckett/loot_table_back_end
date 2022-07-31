require('dotenv').config();

//why do we import Client as an alias only to assign that alias back to a var name Client? 
import { Client as _Client } from 'pg';
const Client = _Client;

const DATABASE_URL = process.env.DATABASE_URL;

const client = new Client({
	connectionString: DATABASE_URL,
	ssl: { rejectUnauthorized: false }
});

//here, and only here, is where the client.connect() goes. move it and we shall perish.
client.connect();

export default client;
