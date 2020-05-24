const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
//if this is commented out, it fails to recognize a JSON req.body... dunno why tho?
app.use(express.json({ extended: false }));

app.use('/monsters', require('./routes/monster-router'));
app.use('/loot', require('./routes/loot-router'));


app.use(require('./middleware/error'));

module.exports = app;
