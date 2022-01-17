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

		const categoryHtml = `<div class="category-container" data-category-id="${result.newId}">
			<li class="category-container-item category">${newCategory.title}</li>
			<div class="category-container-item category-controllers">
				<button type="button" class="edit-btn" data-category-id="${result.newId}"></button>
				<button type="button" class="delete-btn" data-category-id="${result.newId}"></button>
			</div>
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
	const categoryPartsToRemove = document.querySelectorAll('.category-container[data-category-id="' + categoryId + '"] > .category-container-item');
	for (let categoryPartToRemove of categoryPartsToRemove) {
		categoryPartToRemove.remove();
	}
	const categoryContainer = document.querySelector('.category-container[data-category-id="' + categoryId + '"]');
	const categoryFieldToEdit = document.createElement('input');
	categoryContainer.append(categoryFieldToEdit);
}