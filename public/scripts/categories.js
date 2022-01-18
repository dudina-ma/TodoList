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
			return;
		}

		categoryCreateFormOnPage.classList.add('invisible');

		const categoriesList = document.querySelector('.categories-list');

		const categoryHtml = `<div class="category-container">
			<div class='category' data-category-id="${result.newId}">
				<li class="category-title">${newCategory.title}</li>
				<div class="category-controllers">
					<button type="button" class="edit-btn" data-category-id="${result.newId}"></button>
					<button type="button" class="delete-btn" data-category-id="${result.newId}"></button>
				</div>
			</div>
			<form class='category-edit-form invisible' data-category-id="${result.newId}">
				<input type='text' name='title' class='category-edit-form-field' maxlength="15" value=${newCategory.title}>>
				<input type='submit' value='Edit category' class='category-edit-form-btn'>
				<div class='title-validation-error-place'></div>
			</form>
		</div>`;

		categoriesList.innerHTML += categoryHtml;
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

// edit
const editBtns = document.querySelectorAll('.edit-btn');

for (let editBtn of editBtns) {
	editBtn.addEventListener('click', handlerEdit);
}

function handlerEdit(event) {
	const categoryId = event.currentTarget.dataset.categoryId;
	const category = document.querySelector('.category[data-category-id="' + categoryId + '"]');
	category.classList.add('invisible');

	const categoryEditForm = document.querySelector('.category-edit-form[data-category-id="' + categoryId + '"]');
	const categoryEditFormField = document.querySelector('.category-edit-form[data-category-id="' + categoryId + '"] > input[name="title"]');

	categoryEditForm.classList.remove('invisible');
	categoryEditFormField.focus();

	// to move the cursor to the end
	const fieldValue = categoryEditFormField.value;
	categoryEditFormField.value = '';
	categoryEditFormField.value = fieldValue;

	categoryEditForm.addEventListener('submit', handlerEdit);

	function handlerEdit(event) {
		event.preventDefault();

		let formData = new FormData(event.target);

		let editedCategory = {};
		formData.forEach((value, key) => editedCategory[key] = value);

		window.clearValidationErrors();

		fetch('/api/category/' + categoryId + '/edit/', {
			method: 'POST',
			body: JSON.stringify(editedCategory),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(response => response.json()
		).then(result => {
			if (Object.keys(result.validationResult).length !== 0) {
				window.addValidationErrors(result.validationResult);
				return;
			}

			categoryEditForm.classList.add('invisible');

			const categoryTitle = document.querySelector('.category[data-category-id="' + categoryId + '"] > .category-title');
			categoryTitle.textContent = editedCategory.title;

			category.classList.remove('invisible');
		});
	}
}