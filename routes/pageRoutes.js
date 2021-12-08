const { todos } = require('../store');

const pageRoutes = [
	{
		url: '/',
		page: 'index.eta',
		getData(params, queryParams) {
			let currentPage = queryParams.page ?? 1;
			return {
				todos: [...todos],
				currentPage,
			};
		}
	},
	{
		url: '/todo/:id/',
		page: 'todo.eta',
		getData(params) {
			return todos.find(t => t.id === Number(params.id));
		}
	},
	{
		url: '/create/',
		page: 'create.eta',
	}
];

module.exports = pageRoutes;
