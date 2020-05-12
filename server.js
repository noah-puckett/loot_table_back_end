require('dotenv').config();
//require('./lib/utils/pg-pool')()  --GO FIGURE IT OUT
// const express = require('express');
// const cors = require('cors');
// const pg = require('pg');

// // Database Client
// const Client = pg.Client;
// const client = new Client(process.env.DATABASE_URL);

// // Initialize DB connection
// client.connect();

const app = require('./lib/app');

const PORT = process.env.PORT || 8080;
// app.use(cors()); // enable CORS request
// app.use(express.json()); // enable reading incoming json data



app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`CONGRATULATIONS! You're up an running on PORT ${PORT}`);
});


// app.get('/api/v1/loot', async(req, res) => {
// 	try {
// 		const loot = await client.query(`
// 			SELECT * FROM loot;
//         `);
// 		res.json(loot.rows);
// 	}
// 	catch(err) {
// 		console.log(err);
// 		res.status(500).json({
// 			error: err.message || err
// 		});
// 	}

// });

