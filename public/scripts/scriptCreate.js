// submit createForm

const createForm = document.querySelector('.create-form');

function clearValidationErrors() {
	const validationErrorsOnPage = document.querySelectorAll('.validation-error');
	for (let validationErrorOnPage of validationErrorsOnPage) {
		validationErrorOnPage.remove();
	}
	const fieldsWithError = document.querySelectorAll('.error');
	for (let fieldWithError of fieldsWithError) {
		fieldWithError.classList.remove('error');
	}
}

function clearValidationErrorsOnInput(form) {
	form.addEventListener('input', () => {
		clearValidationErrors();
	});

}

clearValidationErrorsOnInput(createForm);

createForm.addEventListener('submit', handlerCreate);

function handlerCreate(event) {
	event.preventDefault();

	let formData = new FormData(event.target);

	let newTodo = {};
	formData.forEach((value, key) => newTodo[key] = value);

	clearValidationErrors();

	function addValidationErrors(validationResults) {
		for (let result of Object.keys(validationResults)) {
			const field = document.querySelector('input[name=\'' + result + '\']');
			field.classList.add('error');
			for (let i = 0; i < validationResults[result].length; i++) {
				const validationError = document.createElement('div');
				validationError.classList.add('validation-error');
				validationError.textContent = validationResults[result][i];
				const validationErrorPlace = document.querySelector('.' + result + '-validation-error-place');
				validationErrorPlace.append(validationError);
			}
		}
	}

	fetch('/api/todo/create/', {
		method: 'POST',
		body: JSON.stringify(newTodo),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(response => response.json()
	).then(result => {
		if (Object.keys(result).length !== 0) {
			addValidationErrors(result);
		} else {
			window.location.href = '/';
		}
	});
}
