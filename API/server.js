// --------------------------------------SERVER_CONFIG
const express = require('express');
const app = express();
app.enable('view cache');
const { router: apiRouter } = require('./routes/router.js');

// --------------------------------------COMMON_MIDDLEWARE
app.use(express.json());
app.use((req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	next();
});
app.use('/api/v1', apiRouter);

// --------------------------------------TEST_URL
app.get('/hello', (req, res) => {
	res.status(200);
	res.send('Hello world!');
	res.end();
});

// --------------------------------------EXPORT
module.exports = { app };
