const { Router } = require('express');

const theActualDatabase = require('../client');

module.exports = Router()

	.get('/', (req, res, next) => {
		theActualDatabase.connect()
			.then(
				theActualDatabase.query(`
			SELECT * FROM creatures;
			`)
			)
			.then(hopefullyResults => res.send(hopefullyResults))
			.catch(next)
			.finally(theActualDatabase.end());

	});


