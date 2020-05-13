require('dotenv').config();

const app = require('./lib/app');
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`CONGRATULATIONS! You're up an running on PORT ${PORT}`);
});
