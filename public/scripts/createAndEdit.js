'use strict';

(function() {
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

	const createEditFormSelects = document.querySelectorAll('.create-edit-form select');

	function clearValidationErrorsOnChange(selects) {
		for (const select of selects) {
			select.addEventListener('change', () => {
				window.clearValidationErrors();
			});
		}
	}

	clearValidationErrorsOnChange(createEditFormSelects);

	createEditForm.addEventListener('submit', createAndEditTodo);

	function createAndEditTodo(event) {
		event.preventDefault();

		const newOrEditedTodo = window.createObjectFromFormFields(createEditForm);
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
})();

