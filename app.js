const http = require('http');
const fs = require('fs');
const path = require('path');
const eta = require('eta');
const mime = require('mime');
const getJsonBody = require('body/json');
const getFormBody = require('body/form')
const Url = require('url-parse');

const apiRoutes = require('./routes/apiRoutes');
const pageRoutes = require('./routes/pageRoutes');
const { getMatchingRoute } = require('./routes/routeHelper');

const server = http.createServer((request, response) => {
	console.log(request.url);
	const url = new Url(request.url, true);

	const apiRoute = getMatchingRoute(url.pathname, request.method, apiRoutes);

	if (apiRoute) {
		const contentType = (request.headers['content-type'] || '').toLowerCase();

		if (contentType === 'application/x-www-form-urlencoded') {
			getFormBody(request, (error, body) => {
				apiRoute.route.action(apiRoute.params, null, body);

				// TODO: пока что тупо отправляем на индекс
				response.statusCode = 302;
				response.setHeader('Location', '/');
				response.end();
			});
		} else {
			getJsonBody(request, (error, body) => {
				var result = apiRoute.route.action(apiRoute.params, null, body);
				response.statusCode = 200;
				response.end(result);
			});
		}

		return;
	}

	// if it's not a static file request and url matches
	const pageRoute = !url.pathname.includes('.') && getMatchingRoute(url.pathname, request.method, pageRoutes);

	if (pageRoute) {
		const filePath = path.join(__dirname, 'views', pageRoute.route.page);

		const data = pageRoute.route.getData && pageRoute.route.getData(pageRoute.params, url.query);
		eta.renderFile(filePath, data, (error, html) => {
			// TODO: решать, какой надо код ошибки по error
			if (error) {
				sendError(response, 500);
				return;
			}

			response.statusCode = 200;
			response.setHeader('Content-Type', 'text/html; charset=utf-8');
			response.end(html);
		});

		return;
	}

	if (url.pathname.includes('..')) {
		sendError(response, 400);
		return;
	}

	const filePath = path.join(__dirname, 'public', url.pathname);

	fs.readFile(filePath, (error, file) => {
		if (error) {
			sendError(response, 404);
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

function sendError(response, code, url) {
	console.log(`Error ${code}, url: ${url}`);
	response.statusCode = code;
	response.end(code + '');
}
