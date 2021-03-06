'use strict';

(function() {
	// check
	const todos = document.querySelectorAll('.todo');

	for (const todo of todos) {
		todo.addEventListener('change', checkTodo);
	}

	function checkTodo(event) {
		const todo = event.currentTarget;
		fetch('/api/todo/' + todo.dataset.todoId + '/check/' + event.target.checked, {method: 'POST'})
			.then(() => {
				todo.classList.toggle('done');
			});
	}

	// delete
	const deleteBtns = document.querySelectorAll('.delete-btn');

	for (const deleteBtn of deleteBtns) {
		deleteBtn.addEventListener('click', deleteTodo);
	}

	function deleteTodo(event) {
		const todoId = event.currentTarget.dataset.todoId;

		window.Modal.showConfirm('Delete todo', 'Do you really want to delete todo?', onConfirmDelete);

		function onConfirmDelete() {
			fetch('/api/todo/' + todoId + '/delete/', {method: 'POST'})
				.then(() => window.location.href = '/');
		}
	}

	// delete all done todos
	const deleteDoneTodosBtn = document.querySelector('.delete-done-todos');
	deleteDoneTodosBtn.addEventListener('click', deleteDoneTodos);

	function deleteDoneTodos() {
		fetch('/api/todo/deleteDone/', {method: 'POST'})
			.then(() => window.location.href = '/');
	}

})();