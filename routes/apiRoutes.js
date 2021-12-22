const { todos } = require('../store');
const { checkFieldLength } = require('../validation/checkFieldLength');
const { checkHasSwearing } = require('../validation/checkHasSwearing');
const { addError } = require('../validation/addError');
const { checkFieldIsEmpty } = require('../validation/checkFieldIsEmpty');

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

			function checkField(field, fieldType, fieldMaxLength, validationResult, shouldCheckEmptiness) {
				const isFieldLengthOk = checkFieldLength(field, fieldMaxLength);
				const fieldHasSwearing = checkHasSwearing(field);
				const fieldIsEmpty = checkFieldIsEmpty(field);

				if (!isFieldLengthOk) {
					addError(validationResult, fieldType, "The field is too long. It must be shorter than " + fieldMaxLength + " symbols.");
				}

				if (fieldHasSwearing) {
					addError(validationResult, fieldType, "Field contains a swearing. Please, reformulate it.");
				}

				if (shouldCheckEmptiness) {
					if (fieldIsEmpty) {
						addError(validationResult, fieldType, "Field is required.");
					}
				}
			}

			checkField(body.title, "title", 15, validationResult, true);
			checkField(body.description, "description", 25, validationResult, false);

			const newId = Math.max.apply(null, todos.map(t => t.id)) + 1;
			todos.push({
				id: newId,
				...body
			});

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
			todos[todoIdToCheck].isDone = params.checked === "true";
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
]

module.exports = apiRoutes;