const http = require('http');
const fs = require('fs');
const path = require('path');
const eta = require('eta');
const mime = require('mime');
const getJsonBody = require('body/json');
const Url = require('url-parse');

const apiRoutes = require('./routes/apiRoutes');
const pageRoutes = require('./routes/pageRoutes');
const { getMatchingRoute, extendQueryParams } = require('./routes/routeHelper');

const server = http.createServer((request, response) => {
	console.log(request.url);
	const url = new Url(request.url, true);

	const apiRoute = getMatchingRoute(url.pathname, request.method, apiRoutes);

	if (apiRoute) {
		getJsonBody(request, (error, body) => {
			const result = apiRoute.route.action(apiRoute.params, null, body);
			response.setHeader('Content-Type', 'application/json');
			response.statusCode = 200;
			response.end(JSON.stringify(result));
		});

		return;
	}

	// if it's not a static file request and url matches
	const pageRoute = !url.pathname.includes('.') && getMatchingRoute(url.pathname, request.method, pageRoutes);

	if (pageRoute) {
		const filePath = path.join(__dirname, 'views', pageRoute.route.page);

		const data = pageRoute.route.getData && pageRoute.route.getData(pageRoute.params, url.query);

		if (data && typeof data === 'object') {
			data.currentUrl = url;
			data.extendQueryParams = extendQueryParams;
		}

		eta.renderFile(filePath, data, (error, html) => {
			// TODO: решать, какой надо код ошибки по error
			if (error) {
				sendError(response, 500, url, error);
				return;
			}

			response.statusCode = 200;
			response.setHeader('Content-Type', 'text/html; charset=utf-8');
			response.end(html);
		});

		return;
	}

	if (url.pathname.includes('..')) {
		sendError(response, 400, url);
		return;
	}

	const filePath = path.join(__dirname, 'public', url.pathname);

	fs.readFile(filePath, (error, file) => {
		if (error) {
			sendError(response, 404, url);
			return;
		}

		response.statusCode = 200;

		const mimeType = mime.getType(path.extname(filePath));
		response.setHeader('Content-Type', mimeType);

		response.end(file);
	});
});

server.listen(3000, error => {
	if (error) {
		console.error('Could not start server');
		return;
	}

	console.log('Server is running');
});

process.on('uncaughtException', err => console.error('Unhandled exception: ', err));

function sendError(response, code, url, error) {
	console.log(`Error ${code}, url: ${url}`);
	if (error) {
		console.error(error);
	}

	response.statusCode = code;
	response.end(code + '');
}
