// submit createForm

const categoryCreateFormOnPage = document.querySelector('.category-create-form');
const categoryCreateFormField = document.querySelector('.category-create-form-field');
const createBtn = document.querySelector('.create-btn');

createBtn.addEventListener('click', showCreateForm);

function showCreateForm() {

	categoryCreateFormOnPage.classList.remove('invisible');

	categoryCreateFormField.focus();
}

categoryCreateFormOnPage.addEventListener('submit', createCategory);

function createCategory(event) {
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

		categoryCreateFormField.value = '';

		categoryCreateFormOnPage.classList.add('invisible');

		const categoriesList = document.querySelector('.categories-list');

		const categoryHtml = `<div class="category-container" data-category-id="${result.newId}">
			<div class='category' data-category-id="${result.newId}">
				<li class="category-title">${newCategory.title}</li>
				<div class="category-controllers">
					<button type="button" class="edit-btn" data-category-id="${result.newId}"></button>
					<button type="button" class="delete-btn" data-category-id="${result.newId}"></button>
				</div>
			</div>
			<form class='category-edit-form invisible' data-category-id="${result.newId}">
				<input type='text' name='title-edit' class='category-edit-form-field' maxlength="15" value=${newCategory.title}>
				<input type='submit' value='Edit category' class='category-edit-form-btn'>
				<div class='title-edit-validation-error-place'></div>
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

const categoryList = document.querySelector('.categories-list');
categoryList.addEventListener('click', addHandlers);

function addHandlers(event) {
	let target = event.target;
	const categoryId = event.target.dataset.categoryId;

	if (target.classList.contains('delete-btn')) {
		deleteCategory(categoryId);
	}

	if (target.classList.contains('edit-btn')) {
		editCategory(categoryId);
	}
}


// delete
function deleteCategory(categoryId) {
	window.Modal.showConfirm('Delete category', 'Do you really want to delete category?', onConfirmDelete);

	function onConfirmDelete() {
		fetch('/api/category/' + categoryId + '/delete/', {method: 'POST'})
			.then(response => response.json()
			).then(result => {
				if (!result.isDeleted) {
					window.Modal.showAlert('Delete category',
						'This category is being used. You should delete all todos with this category first.');
				} else {
					const categoryToDelete = document.querySelector('.category-container[data-category-id="' + categoryId + '"]');
					categoryToDelete.remove();
				}
			});
	}
}

// edit
function editCategory(categoryId) {
	const category = document.querySelector('.category[data-category-id="' + categoryId + '"]');
	category.classList.add('invisible');

	const categoryEditForm = document.querySelector('.category-edit-form[data-category-id="' + categoryId + '"]');
	const categoryEditFormField = document.querySelector('.category-edit-form[data-category-id="' + categoryId + '"] > input[name="title-edit"]');

	categoryEditForm.classList.remove('invisible');
	categoryEditFormField.focus();

	// to move the cursor to the end
	const fieldValue = categoryEditFormField.value;
	categoryEditFormField.value = '';
	categoryEditFormField.value = fieldValue;

	categoryEditForm.addEventListener('submit', save);

	function save(event) {
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
			if (result.validationResult) {
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