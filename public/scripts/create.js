// submit createForm

const createForm = document.querySelector('.create-form');

function clearValidationErrorsOnInput(form) {
	form.addEventListener('input', () => {
		window.clearValidationErrors();
	});
}

clearValidationErrorsOnInput(createForm);

createForm.addEventListener('submit', handlerCreate);

function handlerCreate(event) {
	event.preventDefault();

	let formData = new FormData(event.target);

	let newTodo = {};
	formData.forEach((value, key) => newTodo[key] = value);

	window.clearValidationErrors();

	fetch('/api/todo/create/', {
		method: 'POST',
		body: JSON.stringify(newTodo),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(response => response.json()
	).then(result => {
		if (Object.keys(result).length !== 0) {
			window.addValidationErrors(result);
		} else {
			window.location.href = '/';
		}
	});
}
