function addError(validationResult, field, notificationText) {
    if (field in validationResult) {
        validationResult[field] += notificationText;
    } else {
        validationResult[field] = notificationText;
    }
}

module.exports = {
	addError
};