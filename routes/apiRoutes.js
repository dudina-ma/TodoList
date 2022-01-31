const { todos } = require('../store');
const { checkField } = require('../validation/checkField');
const { categories } = require('../store');

const apiRoutes = [
	{
		url: '/api/todo/create/',
		method: 'POST',
		action(_, __, body) {
			const validationResult = {};

			checkField(body.title, 'title', 25, validationResult, true);
			checkField(body.description, 'description', 45, validationResult, false);

			if (Object.keys(validationResult).length === 0) {
				const newId = Math.max.apply(null, todos.map(t => t.id)) + 1;
				todos.unshift({
					id: newId,
					title: body.title,
					isDone: false,
					categoryIds: body.categoryIds,
					isUrgent: body.isUrgent,
					description: body.description,
					creationDate: new Date(),
				});
			}

			return validationResult;
		}
	},
	{
		url: '/api/todo/:id/delete/',
		method: 'POST',
		action(params) {
			const idNumber = Number(params.id);
			let todoIdToDelete = todos.findIndex(item => item.id === idNumber);
			todos.splice(todoIdToDelete, 1);
		}
	},
	{
		url: '/api/todo/:id/check/:checked/',
		method: 'POST',
		action(params) {
			const idNumber = Number(params.id);
			let todoIdToCheck = todos.findIndex(item => item.id === idNumber);
			todos[todoIdToCheck].isDone = params.checked === 'true';
		}
	},
	{
		url: '/api/todo/:id/edit/',
		method: 'POST',
		action(params, __, body) {
			const validationResult = {};

			checkField(body.title, 'title', 25, validationResult, true);
			checkField(body.description, 'description', 45, validationResult, false);

			if (Object.keys(validationResult).length === 0) {
				const idNumber = Number(params.id);
				let todoToEdit = todos.findIndex(item => item.id === idNumber);

				todos[todoToEdit].title = body.title;
				todos[todoToEdit].description = body.description;
				todos[todoToEdit].categoryIds = body.categoryIds;
				todos[todoToEdit].isUrgent = body.isUrgent;
			}

			return validationResult;
		}
	},
	{
		url: '/api/todo/deleteDone/',
		method: 'POST',
		action() {
			for (let i = 0; i < todos.length; i++) {
				if (todos[i].isDone === true) {
					todos.splice(i, 1);
					i--;
				}
			}
		}
	},
	{
		url: '/api/category/:id/edit/',
		method: 'POST',
		action(params, __, body) {
			const validationResult = {};

			checkField(body.title, 'title', 15, validationResult, true);

			const idNumber = Number(params.id);

			if (Object.keys(validationResult).length === 0) {
				let categoryToEdit = categories.findIndex(item => item.id === idNumber);
				categories[categoryToEdit].title = body.title;
			}

			return { validationResult };
		}
	},
	{
		url: '/api/category/create/',
		method: 'POST',
		action(_, __, body) {
			const validationResult = {};

			checkField(body.title, 'title', 15, validationResult, true);

			let newId;

			if (Object.keys(validationResult).length === 0) {
				newId = Math.max.apply(null, categories.map(c => c.id)) + 1;
				categories.push({
					id: newId,
					...body
				});
				return { newId };
			}

			return { validationResult };
		}
	},
	{
		url: '/api/category/:id/delete/',
		method: 'POST',
		action(params) {
			const categoryId = Number(params.id);
			let categoryIdToDelete = categories.findIndex(item => item.id === categoryId);
			let todoWithcategoryToDelete = todos.find(item => item.category === categoryId);
			let result = {};
			result.isDeleted = false;
			if (!todoWithcategoryToDelete) {
				categories.splice(categoryIdToDelete, 1);
				result.isDeleted = true;
			}
			return result;
		}
	},
];

module.exports = apiRoutes;