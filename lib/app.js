const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
// app.use(express.json({ extended: false }));

app.use('/creatures', require('./routes/creatures-router'));

app.use(require('./middleware/error'));

module.exports = app;
