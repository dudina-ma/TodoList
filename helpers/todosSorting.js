/*function sortTodos(todos) {
	for (let i = 0; i < todos.length; i++) {
		for (let j = i; j < todos.length - 1; j++) {
			if (todos[j].creationDate.getTime() > todos[j + 1].creationDate.getTime()) {
				let helper = todos[j + 1];
				todos[j + 1] = todos[j];
				todos[j] = helper;
			}
		}
	}
}*/

function sortTodos(todos, NewestToOldest) {
	if (NewestToOldest) {
		todos.sort(compareNewToOld);
	} else {
		todos.sort(compareOldToNew);
	}

	function compareNewToOld(firstTodo, secondTodo) {
		return secondTodo.creationDate.getTime() - firstTodo.creationDate.getTime();
	}

	function compareOldToNew(firstTodo, secondTodo) {
		return firstTodo.creationDate.getTime() - secondTodo.creationDate.getTime();
	}
}

module.exports = {
	sortTodos
};