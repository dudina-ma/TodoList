// check
(function() {
    const todos = document.querySelectorAll(".todo");

    for (let todo of todos) {
        todo.addEventListener("change", handlerCheck);
    }

    function handlerCheck(event) {
        const todo = event.currentTarget;
        fetch("/api/todo/" + todo.dataset.todoId + "/check/" + event.target.checked, {method: 'POST'})
            .then(() => {
                todo.classList.toggle('done');;
            });
    }

    // delete
    const deleteBtns = document.querySelectorAll(".delete-btn");

    for (let deleteBtn of deleteBtns) {
        deleteBtn.addEventListener("click", handlerDelete);
    }

    function handlerDelete(event) {
        const todoId = event.currentTarget.dataset.todoId;

        window.Modal.showConfirm("Delete todo", "Do you really want to delete todo?", onConfirmDelete);

        function onConfirmDelete() {
            fetch("/api/todo/" + todoId + "/delete/", {method: 'POST'})
            .then(() => window.location.href = '/');
        }
    }
})();