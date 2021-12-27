// submit createForm

const categoryCreateFormOnPage = document.querySelector('.category-create-form');
const categoryCreateFormField = document.querySelector('.category-create-form-field');
const createBtn = document.querySelector('.create-btn');

createBtn.addEventListener('click', showCreateForm);

function showCreateForm() {

	categoryCreateFormOnPage.classList.remove('invisible');

	categoryCreateFormField.focus();
}

categoryCreateFormOnPage.addEventListener('submit', handlerCreate);

function handlerCreate(event) {
	event.preventDefault();

	let formData = new FormData(event.target);

	let newCategory = {};
	formData.forEach((value, key) => newCategory[key] = value);

	window.clearValidationErrors();

	fetch('/api/category/create/', {
		method: 'POST',
		body: JSON.stringify(newCategory),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(response => response.json()
	).then(result => {
		if (Object.keys(result).length !== 0) {
			window.addValidationErrors(result);
		} else {
			categoryCreateFormOnPage.classList.add('invisible');
			const categoriesList = document.querySelector('.categories-list');
			const newCategoryToPage = document.createElement('li');
			newCategoryToPage.classList.add('category');
			newCategoryToPage.textContent = newCategory.title;
			categoriesList.append(newCategoryToPage);
			categoryCreateFormField.value = '';
		}
	});
}

function clearValidationErrorsOnInput(form) {
	form.addEventListener('input', () => {
		window.clearValidationErrors();
	});
}

clearValidationErrorsOnInput(categoryCreateFormOnPage);
