const { todos } = require('../store');

const pageRoutes = [
	{
		url: '/',
		page: 'index.ejs',
		getData() {
			return {
				todos: [...todos]
			};
		}
	},
	{
		url: '/:id/',
		page: 'todo.ejs',
		getData(params) {
			return todos.find(t => t.id === Number(params.id));
		}
	}
];

module.exports = pageRoutes;
