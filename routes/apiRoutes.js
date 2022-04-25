const { todos } = require('../store');
const { checkTextField } = require('./validation');
const { checkArrayFieldEmptiness } = require('./validation');
const { categories } = require('../store');

const apiRoutes = [
	{
		url: '/api/todo/create/',
		method: 'POST',
		action(_, __, body) {
			const validationResult = {};

			checkTextField(body.title, 'title', 25, validationResult, true);
			checkTextField(body.description, 'description', 45, validationResult, false);
			checkArrayFieldEmptiness(body.categoryIds, 'categoryIds', validationResult);

			if (Object.keys(validationResult).length > 0) {
				return {validationResult};
			}

			//const newId = Math.max.apply(null, todos.map(t => t.id)) + 1;
			const newId = Math.max(...todos.map(t => t.id)) + 1;

			todos.unshift({
				id: newId,
				title: body.title,
				isDone: false,
				categoryIds: body.categoryIds,
				isUrgent: body.isUrgent,
				description: body.description,
				creationDate: new Date(),
			});

			return {success: true};
		}
	},
	{
		url: '/api/todo/:id/delete/',
		method: 'POST',
		action(params) {
			const idNumber = Number(params.id);
			const todoIdToDelete = todos.findIndex(item => item.id === idNumber);
			todos.splice(todoIdToDelete, 1);
		}
	},
	{
		url: '/api/todo/:id/check/:checked/',
		method: 'POST',
		action(params) {
			const idNumber = Number(params.id);
			const todoIdToCheck = todos.findIndex(item => item.id === idNumber);
			todos[todoIdToCheck].isDone = params.checked === 'true';
		}
	},
	{
		url: '/api/todo/:id/edit/',
		method: 'POST',
		action(params, __, body) {
			const validationResult = {};

			checkTextField(body.title, 'title', 25, validationResult, true);
			checkTextField(body.description, 'description', 45, validationResult, false);
			checkArrayFieldEmptiness(body.categoryIds, 'categoryIds', validationResult);

			if (Object.keys(validationResult).length > 0) {
				return {validationResult};
			}

			const idNumber = Number(params.id);
			const todoToEdit = todos.findIndex(item => item.id === idNumber);

			todos[todoToEdit].title = body.title;
			todos[todoToEdit].description = body.description;
			todos[todoToEdit].categoryIds = body.categoryIds;
			todos[todoToEdit].isUrgent = body.isUrgent;

			return {success: true};
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

			checkTextField(body['title-edit'], 'title-edit', 15, validationResult, true);

			const idNumber = Number(params.id);

			if (Object.keys(validationResult).length > 0) {
				return {validationResult};
			}

			const categoryToEdit = categories.findIndex(item => item.id === idNumber);
			categories[categoryToEdit].title = body['title-edit'];

			return { success: true };
		}
	},
	{
		url: '/api/category/create/',
		method: 'POST',
		action(_, __, body) {
			const validationResult = {};

			checkTextField(body['title-create'], 'title-create', 15, validationResult, true);

			if (Object.keys(validationResult).length > 0) {
				return {validationResult};
			}

			const newId = Math.max.apply(null, categories.map(c => c.id)) + 1;
			categories.push({
				id: newId,
				title: body['title-create']
			});

			return { success: true, newId };
		}
	},
	{
		url: '/api/category/:id/delete/',
		method: 'POST',
		action(params) {
			const categoryId = Number(params.id);
			const categoryIdToDelete = categories.findIndex(item => item.id === categoryId);
			const hasCategories = todos.some(item => item.categoryIds.includes(categoryId));
			const result = {};
			result.isDeleted = false;
			if (!hasCategories) {
				categories.splice(categoryIdToDelete, 1);
				result.isDeleted = true;
			}
			return result;
		}
	},
];

module.exports = apiRoutes;