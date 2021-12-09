const { todos } = require('../store');

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
			const newId = Math.max.apply(null, todos.map(t => t.id)) + 1;
			todos.push({
				id: newId,
				...body
			});
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
		url: '/api/todo/:id/check/',
		method: 'POST',
		action(params) {
			const idNumber = Number(params.id);
			let todoIdToCheck = todos.findIndex(item => item.id === idNumber);
			todos[todoIdToCheck].isDone = !todos[todoIdToCheck].isDone;
		}
	},
]

module.exports = apiRoutes;