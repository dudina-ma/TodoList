window.addValidationErrors = function(validationResults, form) {
	let root = form ?? document;

	for (let result of Object.keys(validationResults)) {
		const field = root.querySelector('[name=\'' + result + '\']');
		field.classList.add('error');
		for (let i = 0; i < validationResults[result].length; i++) {
			const validationError = document.createElement('div');
			validationError.classList.add('validation-error');
			validationError.textContent = validationResults[result][i];
			const validationErrorPlace = root.querySelector('.' + result + '-validation-error-place');
			validationErrorPlace.append(validationError);
		}
	}
};

window.clearValidationErrors = function() {
	const validationErrorsOnPage = document.querySelectorAll('.validation-error');
	for (let validationErrorOnPage of validationErrorsOnPage) {
		validationErrorOnPage.remove();
	}
	const fieldsWithError = document.querySelectorAll('.error');
	for (let fieldWithError of fieldsWithError) {
		fieldWithError.classList.remove('error');
	}
};