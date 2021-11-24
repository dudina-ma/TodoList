const { todos } = require('../store');

const apiRoutes = [
	{
		url: '/api/all/',
		method: 'GET',
		action() {
			return [...todos];
		}
	},
	{
		url: '/api/todo/create/',
		method: 'POST',
		action(_, __, body) {
			const newId = Math.max.apply(null, todos.map(t => t.id)) + 1;
			todos.push({
				id: newId,
				...body
			});
		}
	}
]

module.exports = apiRoutes;
