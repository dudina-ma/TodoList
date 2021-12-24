// сделать возможность закрыть на эскейп, но нужно еще прекратить всплытие

// сделать более уникальные названия классов: modal-xxx

'use strict';
(function() {
	function addToDOM(title, text, type) {
		title = title ?? '';
		text = text ?? '';

		const div = document.createElement('div');
		div.className = 'overlay-modal';

		let divHTML = `<div class='overlay'></div>

        <div class='modal'>
            <div class='modal-header'>
                <div class='modal-title'>${title}</div>
                <button type='button' class='modal-close-button'>\u2573</button>
            </div>

            <div class='modal-content'>${text}</div>

            <div class='modal-confirm-buttons'>`;

		if (type === 'confirm') {
			divHTML += `
                    <button type='button' class='modal-button modal-yes'>yes</button>
                    <button type='button' class='modal-button modal-no'>no</button>`;
		} else if (type === 'alert') {
			divHTML += `
                    <button type='button' class='modal-button modal-yes'>ok</button>`;
		}

		divHTML += `
                </div>
            </div>`;

		div.innerHTML = divHTML;
		document.body.append(div);
	}

	function addClosureHandlers(onConfirm, onCancel) {
		function removeOverlayAndModal() {
			const overlayModal = document.querySelector('.overlay-modal');
			overlayModal.remove();
		}

		const overlay = document.querySelector('.overlay');
		overlay.addEventListener('click', removeOverlayAndModal);

		const closeButton = document.querySelector('.modal-close-button');
		closeButton.addEventListener('click', removeOverlayAndModal);

		const yes = document.querySelector('.modal-yes');
		if (yes) {
			yes.addEventListener('click', () => {
				onConfirm();
				removeOverlayAndModal();
			});
		}

		const no = document.querySelector('.modal-no');
		if (no) { //добавила проверку
			no.addEventListener('click', () => {
				if (onCancel != null) {
					onCancel();
				}
				removeOverlayAndModal();
			});
		}
	}

	function showConfirm(title, text, onConfirm, onCancel) {
		addToDOM(title, text, 'confirm');
		addClosureHandlers(onConfirm, onCancel);
	}

	function showAlert(title, text, onConfirm) {
		addToDOM(title, text, 'alert');
		addClosureHandlers(onConfirm);
	}

	window.Modal = {
		showAlert,
		showConfirm,
	};
})();