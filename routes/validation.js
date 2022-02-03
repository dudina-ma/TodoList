function checkFieldIsEmpty (fieldValue) {
	return fieldValue.length === 0;
}

function checkTextFieldLength (fieldValue, length) {
	return fieldValue.length <= length;
}

function checkHasSwearing(fieldValue) {
	const swearings = ['fuck', 'shit'];

	let hasSwearings = false;

	for (const swearing of swearings) {
		if (fieldValue.toLowerCase().includes(swearing)) {
			hasSwearings = true;
			break;
		}
	}

	return hasSwearings;
}

function addError(validationResult, fieldName, notificationText) {
	const errorArray = validationResult[fieldName] ?? [];

	errorArray.push(notificationText);

	validationResult[fieldName] = errorArray;
}

function checkTextField(fieldValue, fieldName, fieldMaxLength, validationResult, shouldCheckEmptiness) {
	const isFieldLengthOk = checkTextFieldLength(fieldValue, fieldMaxLength);
	const fieldHasSwearing = checkHasSwearing(fieldValue);
	const fieldIsEmpty = checkFieldIsEmpty(fieldValue);

	if (!isFieldLengthOk) {
		addError(validationResult, fieldName, 'The field is too long. It must be shorter than ' + fieldMaxLength + ' symbols.');
	}

	if (fieldHasSwearing) {
		addError(validationResult, fieldName, 'Field contains a swearing. Please, reformulate it.');
	}

	if (shouldCheckEmptiness) {
		if (fieldIsEmpty) {
			addError(validationResult, fieldName, 'Field is required.');
		}
	}
}

function checkArrayFieldEmptiness(fieldValue, fieldName, validationResult) {
	const fieldIsEmpty = checkFieldIsEmpty(fieldValue);
	if (fieldIsEmpty) {
		addError(validationResult, fieldName, 'Field is required.');
	}
}

module.exports = {
	checkTextField,
	checkArrayFieldEmptiness
};