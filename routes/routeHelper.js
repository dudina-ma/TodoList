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

		for (let i = 0; i < patternParts.length; i++) {
			if (patternParts[i].startsWith(':')) {
				const paramName = patternParts[i].substring(1);
				params[paramName] = urlParts[i];

				continue;
			}

			if (urlParts[i] !== patternParts[i]) {
				break;
			}
		}

		return { route, params };
	}
}

module.exports = {
	getMatchingRoute
};
