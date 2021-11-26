const { todos } = require('../store');

const pageRoutes = [
	{
		url: '/',
		page: 'index.eta',
		getData(params, queryParams) {
			let isEmpty = true;
			for (let key in queryParams) {
				isEmpty = false;
			}
			let currentPage = isEmpty ? 1 : queryParams["page"];
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
