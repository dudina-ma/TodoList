﻿const { todos } = require('../store');
const { checkField } = require('../validation/checkField');
const { categories } = require('../store');

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
			const validationResult = {};

			checkField(body.title, 'title', 15, validationResult, true);
			checkField(body.description, 'description', 25, validationResult, false);

			if (Object.keys(validationResult).length === 0) {
				const newId = Math.max.apply(null, todos.map(t => t.id)) + 1;
				todos.unshift({
					id: newId,
					title: body.title,
					isDone: body.isDone,
					category: categories.find(i => i.title === body.category).id,
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
			const idNumber = Number(params.id);
			let todoIdToEdit = todos.findIndex(item => item.id === idNumber);
			todos[todoIdToEdit].title = body.title;
			todos[todoIdToEdit].description = body.description;
			todos[todoIdToEdit].isUrgent = body.isUrgent;
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
		url: '/api/categories/:id/delete/',
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