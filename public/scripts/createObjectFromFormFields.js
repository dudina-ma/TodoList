window.createObjectFromFormFields = function(form) {
	const inputs = form.querySelectorAll('input');
	let result = {};

	for (let input of inputs) {
		if (input.type === 'text') {
			result[input.name] = input.value;
		}
		if (input.type === 'checkbox') {
			result[input.name] = input.checked;
		}
	}

	const select = form.querySelector('select');
	const selectedOpts = [...select.options].filter(x => x.selected).map(x => x.value);
	result[select.name] = selectedOpts;

	return result;
};