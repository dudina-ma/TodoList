function addError(validationResult, field, notificationText) {
	let errorArray = [];

	if (field in validationResult) {
		errorArray = validationResult[field];
	}

	errorArray.push(notificationText);

	validationResult[field] = errorArray;
}

module.exports = {
	addError
};