require('dotenv').config();

const client = require('./lib/client');

// Initiate database connection
client.connect();

const app = require('./lib/app');

const PORT = process.env.PORT || 8080;

// app.get('/animals', async(req, res) => {
//   const data = await client.query('SELECT * from animals');

//   res.json(data.rows);
// });

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`CONGRATULATIONS! You're up an running on PORT ${PORT}`);
});

module.exports = app;
