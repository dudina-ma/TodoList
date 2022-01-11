﻿const { todos } = require('../store');
const { categories } = require('../store');

const pageRoutes = [
	{
		url: '/',
		page: 'index.eta',
		getData(params, queryParams) {
			let currentPage = Number(queryParams.page ?? 1);

			let results = todos;

			if (queryParams.search) {
				const searchStringLowerCase = queryParams.search.toLowerCase();
				results = todos.filter(item => item.title.toLowerCase().includes(searchStringLowerCase)
					|| item.description.toLowerCase().includes(searchStringLowerCase));
			}

			// todo: здесь оставить только тудухи для текущей страницы

			results = results.map(item => ({
				id: item.id,
				title: item.title,
				isDone: item.isDone,
				category: categories.find(i => i.id === item.category).title,
				isUrgent: item.isUrgent,
				description: item.description
			}));

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
		getData() {
			return {
				categories,
			};
		}
	},
	{
		url: '/:id/edit/',
		page: 'edit.eta',
		getData(params) {
			return todos.find(t => t.id === Number(params.id));
		}
	},
	{
		url: '/categories/',
		page: 'categories.eta',
		getData(params, queryParams) {
			let currentPage = queryParams.page ?? 1;

			let results = categories;

			if (queryParams.search) {
				const searchStringLowerCase = queryParams.search.toLowerCase();
				results = todos.filter(item => item.title.toLowerCase().includes(searchStringLowerCase)
					|| item.description.toLowerCase().includes(searchStringLowerCase));
			}

			return {
				categories: results,
				currentPage,
				searchString: queryParams.search,
			};
		}
	}
];

module.exports = pageRoutes;