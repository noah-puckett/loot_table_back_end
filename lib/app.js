import express, { json } from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
//if this is commented out, it fails to recognize a JSON req.body... dunno why tho?
app.use(json({ extended: false }));

app.use('/monsters', require('./routes/monster-router'));
app.use('/loot', require('./routes/loot-router'));


app.use(require('./middleware/error').default);

export default app;
