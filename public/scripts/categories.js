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
		if (result.validationResult) {
			window.addValidationErrors(result.validationResult);
		} else {
			categoryCreateFormOnPage.classList.add('invisible');
			const categoriesList = document.querySelector('.categories-list');
			const newCategoryToPageContainer = document.createElement('div');
			newCategoryToPageContainer.classList.add('category-container');
			categoriesList.append(newCategoryToPageContainer);

			const newCategoryToPage = document.createElement('li');
			newCategoryToPage.classList.add('category');
			newCategoryToPage.textContent = newCategory.title;
			newCategoryToPageContainer.append(newCategoryToPage);
			categoryCreateFormField.value = '';

			const categoryControllers = document.createElement('div');
			categoryControllers.classList.add('category-controllers');
			newCategoryToPageContainer.append(categoryControllers);

			const editBtn = document.createElement('button');
			editBtn.classList.add('edit-btn');
			editBtn.type = 'button';
			editBtn.dataset.categoryId = result.newId;
			categoryControllers.append(editBtn);

			const deleteBtn = document.createElement('button');
			deleteBtn.classList.add('delete-btn');
			deleteBtn.type = 'button';
			deleteBtn.dataset.categoryId = result.newId;
			categoryControllers.append(deleteBtn);
		}
	});
}

function clearValidationErrorsOnInput(form) {
	form.addEventListener('input', () => {
		window.clearValidationErrors();
	});
}

clearValidationErrorsOnInput(categoryCreateFormOnPage);

// delete
const deleteBtns = document.querySelectorAll('.delete-btn');

for (let deleteBtn of deleteBtns) {
	deleteBtn.addEventListener('click', handlerDelete);
}

function handlerDelete(event) {
	const categoryId = event.currentTarget.dataset.categoryId;

	window.Modal.showConfirm('Delete category', 'Do you really want to delete category?', onConfirmDelete);

	function onConfirmDelete() {
		fetch('/api/categories/' + categoryId + '/delete/', {method: 'POST'})
			.then(response => response.json()
			).then(result => {
				if (!result.isDeleted) {
					window.Modal.showAlert('Delete category',
						'This category is being used. You should delete all todos with this category first.');
				} else {
					window.location.href = '/categories/';
				}
			});
	}
}
