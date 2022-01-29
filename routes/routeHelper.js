function getMatchingRoute(url, method, routes) {
	if (!url.endsWith('/')) {
		url += '/';
	}

	for (const route of routes) {
		const routeMethod = route.method || 'GET';
		if (method !== routeMethod) {
			continue;
		}

		const urlParts = url.split('/');
		const patternParts = route.url.split('/');

		const params = {};

		if (urlParts.length !== patternParts.length) {
			continue;
		}

		let match = true;

		for (let i = 0; i < patternParts.length; i++) {
			if (patternParts[i].startsWith(':')) {
				const paramName = patternParts[i].substring(1);
				params[paramName] = urlParts[i];

				continue;
			}

			if (urlParts[i] !== patternParts[i]) {
				match = false;
				break;
			}
		}

		if (match) {
			return { route, params };
		}
	}

	return null;
}

function extendQueryParams(query, extender) {
	const newQuery = Object.assign({}, query, extender);
	let result = '?';

	for (const [key, value] of Object.entries(newQuery)) {
		result += key + '=' + value + '&';
	}

	result = result.slice(0, -1); // trim last char
	return result;
}

module.exports = {
	getMatchingRoute,
	extendQueryParams
};
