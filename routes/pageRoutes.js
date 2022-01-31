const { todos } = require('../store');
const { categories } = require('../store');

const pageRoutes = [
	{
		url: '/',
		page: 'index.eta',
		getData(params, queryParams) {
			const onePageTodosAmount = 4;
			let currentPage = Number(queryParams.page ?? 1);

			let results = todos;

			if (queryParams.search) {
				const searchStringLowerCase = queryParams.search.toLowerCase();
				results = results.filter(item => item.title.toLowerCase().includes(searchStringLowerCase)
					|| item.description.toLowerCase().includes(searchStringLowerCase));
			}

			if (queryParams.category) {
				results = results.filter(result => result.categoryIds.includes(categories.find(i => i.title === queryParams.category).id));
			}

			const { sortTodos } = require('../helpers/todosSorting');

			if (queryParams.sort) {
				if (queryParams.sort === 'date') {
					sortTodos(results, false);
				} else {
					sortTodos(results, true);
				}
			} else {
				sortTodos(results, true);
			}

			let todosOnPage = results.slice(onePageTodosAmount * (currentPage - 1), onePageTodosAmount * currentPage);

			todosOnPage = todosOnPage.map(item => ({
				id: item.id,
				title: item.title,
				isDone: item.isDone,
				categoriesTitles: item.categoryIds.map(id => categories.find(c => c.id === id).title),
				isUrgent: item.isUrgent,
				description: item.description,
				creationDate: item.creationDate,
			}));

			return {
				results,
				todosOnPage,
				currentPage,
				searchString: queryParams.search,
				onePageTodosAmount,
				sort: queryParams.sort,
			};
		}
	},
	{
		url: '/create/',
		page: 'createAndEdit.eta',
		getData() {
			return {
				categories,
				formName: 'Create new TODO',
				submitBtnValue: 'Create',
			};
		}
	},
	{
		url: '/:id/edit/',
		page: 'createAndEdit.eta',
		getData(params) {
			return {
				categories,
				todoToEdit: todos.find(t => t.id === Number(params.id)),
				formName: 'Edit your TODO',
				submitBtnValue: 'Edit',
				isEditForm: true,
			};
		}
	},
	{
		url: '/categories/',
		page: 'categories.eta',
		getData(params, queryParams) {
			const onePageCategoriesAmount = 6;
			let currentPage = Number(queryParams.page ?? 1);

			let results = categories;

			let categoriesOnPage = results.slice(onePageCategoriesAmount * (currentPage - 1), onePageCategoriesAmount * currentPage);

			return {
				categories: results,
				categoriesOnPage,
				currentPage,
				onePageCategoriesAmount
			};
		}
	}
];

module.exports = pageRoutes;