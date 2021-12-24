const { checkFieldLength } = require('../validation/checkFieldLength');
const { checkHasSwearing } = require('../validation/checkHasSwearing');
const { addError } = require('../validation/addError');
const { checkFieldIsEmpty } = require('../validation/checkFieldIsEmpty');

function checkField(field, fieldName, fieldMaxLength, validationResult, shouldCheckEmptiness) {
    const isFieldLengthOk = checkFieldLength(field, fieldMaxLength);
    const fieldHasSwearing = checkHasSwearing(field);
    const fieldIsEmpty = checkFieldIsEmpty(field);

    if (!isFieldLengthOk) {
        addError(validationResult, fieldName, "The field is too long. It must be shorter than " + fieldMaxLength + " symbols.");
    }

    if (fieldHasSwearing) {
        addError(validationResult, fieldName, "Field contains a swearing. Please, reformulate it.");
    }

    if (shouldCheckEmptiness) {
        if (fieldIsEmpty) {
            addError(validationResult, fieldName, "Field is required.");
        }
    }
}

module.exports = {
	checkField
};