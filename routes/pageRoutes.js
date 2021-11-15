const { todos } = require('../store');

const pageRoutes = [
	{
		url: '/',
		page: 'index.eta',
		getData() {
			return {
				todos: [...todos]
			};
		}
	},
	{
		url: '/:id/',
		page: 'todo.eta',
		getData(params) {
			return todos.find(t => t.id === Number(params.id));
		}
	}
];

module.exports = pageRoutes;
