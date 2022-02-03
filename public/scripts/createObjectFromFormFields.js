window.createObjectFromFormFields = function(form) {
	const inputs = form.querySelectorAll('input');
	const result = {};

	for (const input of inputs) {
		if (input.type === 'text') {
			result[input.name] = input.value;
		}
		if (input.type === 'checkbox') {
			result[input.name] = input.checked;
		}
	}

	const select = form.querySelector('select');
	if (select) {
		const selectedOpts = [...select.options].filter(x => x.selected).map(x => x.value);
		result[select.name] = selectedOpts;
	}

	return result;
};