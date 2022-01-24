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