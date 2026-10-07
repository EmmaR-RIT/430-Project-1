const http = require('http');
const query = require('querystring');

const router = require('./router.js');


// Port the server runs on
const port = process.env.PORT || process.env.NODE_PORT || 3000;


// Function that parses the body of the request
const parseBody = (req, res, url, handler) => {
	let body = [];

	// Check for errors
	req.on('error', (err) => {
		console.dir(err); // eslint-disable-line no-console
		res.statusCode = 400
		res.end();
	});

	// Add data chunks to body
	req.on('data', (chunk) => {
		body.push(chunk);
	});

	// Compile body and add to request
	// If invalid data type, respond 400 Bad Request
	req.on('end', () => {
		const bodyStr = Buffer.concat(body).toString();
		switch (req.headers['content-type']) {
			case 'application/x-www-form-urlencoded':
				req.body = query.parse(bodyStr);
				break;
			case 'application/json':
				req.body = JSON.parse(bodyStr);
				break;
			default:
				return router.respondError(req, res, { message: 'Invalid data type sent', code: 400 });
		}

		// Handle request
		return handler(req, res, url);
	});
}


// Handler for server requests
const onRequest = (req, res) => {
	// Parse url
	const url = new URL(req.url, `${req.connection.encrypted ? 'https' : 'http'}://${req.headers.host}`);

	// Set the url query
	req.query = Object.fromEntries(url.searchParams);

	// Parse body of POST requests and route
	if (req.method === 'POST') {
		return parseBody(req, res, url, router.post);
	}
	// Route all other requests
	return router.get(req, res, url);
}


// Create the server
http.createServer(onRequest).listen(port, () => {
	console.log(`Listening on 127.0.0.1:${port}`); // eslint-disable-line no-console
})