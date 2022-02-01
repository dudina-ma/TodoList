function checkFieldIsEmpty (field) {
	return field.length === 0;
}

function checkFieldLength (field, length) {
	return field.length <= length;
}

function checkHasSwearing(field) {
	const swearings = ['fuck', 'shit'];

	let hasSwearings = false;

	for (let swearing of swearings) {
		if (field.toLowerCase().includes(swearing)) {
			hasSwearings = true;
			break;
		}
	}

	return hasSwearings;
}

function addError(validationResult, field, notificationText) {
	let errorArray = validationResult[field] ?? [];

	errorArray.push(notificationText);

	validationResult[field] = errorArray;
}

function checkField(field, fieldName, fieldMaxLength, validationResult, shouldCheckEmptiness) {
	const isFieldLengthOk = checkFieldLength(field, fieldMaxLength);
	const fieldHasSwearing = checkHasSwearing(field);
	const fieldIsEmpty = checkFieldIsEmpty(field);

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

module.exports = {
	checkField
};