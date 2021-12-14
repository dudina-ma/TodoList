const { todos } = require('../store');

const pageRoutes = [
	{
		url: '/',
		page: 'index.eta',
		getData(params, queryParams) {
			let currentPage = queryParams.page ?? 1;

			let results = [...todos];

			if (queryParams.search) {
				const searchStringLowerCase = queryParams.search.toLowerCase();
				results = todos.filter(item => item.title.toLowerCase().includes(searchStringLowerCase)
					|| item.description.toLowerCase().includes(searchStringLowerCase));
			}

			return {
				todos: results,
				currentPage,
				searchString: queryParams.search,
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
	},
	{
		url: '/:id/edit/',
		page: 'edit.eta',
		getData(params) {
			return todos.find(t => t.id === Number(params.id));
		}
	}
];

module.exports = pageRoutes;
