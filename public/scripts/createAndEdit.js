new window.SlimSelect({
	select: '.category-select'
});

const createEditForm = document.querySelector('.create-edit-form');

function clearValidationErrorsOnInput(form) {
	form.addEventListener('input', () => {
		window.clearValidationErrors();
	});
}

clearValidationErrorsOnInput(createEditForm);

createEditForm.addEventListener('submit', createAndEditTodo);

function createAndEditTodo(event) {
	event.preventDefault();

	let newOrEditedTodo = window.createObjectFromFormFields(createEditForm);
	newOrEditedTodo.categoryIds = newOrEditedTodo.categoryIds.map(id => Number(id));

	window.clearValidationErrors();

	const isEditForm = createEditForm.dataset.isEditForm;

	let postUrl;
	if (isEditForm) {
		const todoId = event.target.dataset.todoId;
		postUrl = '/api/todo/' + todoId + '/edit/';
	} else {
		postUrl = '/api/todo/create/';
	}

	fetch(postUrl, {
		method: 'POST',
		body: JSON.stringify(newOrEditedTodo),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(response => response.json()
	).then(result => {
		if (result.validationResult) {
			window.addValidationErrors(result.validationResult);
		} else {
			window.location.href = '/';
		}
	});
}
