// --------------------------------------SERVER_CONFIG
const express = require('express');
const app = express();
const { router: apiRouter } = require('./routes/router.js');

// --------------------------------------COMMON_MIDDLEWARE
app.use(express.json());
app.use((req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	next();
});

// --------------------------------------ROUTER
app.use('/api/v1', apiRouter);

// --------------------------------------TEST_URL
app.get('/', (req, res) => {
	res.status(200);
	res.json({ message: 'Server running!' });
	res.end();
});

// --------------------------------------EXPORT
module.exports = { app };
