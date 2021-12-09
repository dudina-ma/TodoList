const checkboxesTodoIsDone = document.querySelectorAll(".todo");

for (let checkboxTodoIsDone of checkboxesTodoIsDone) {
    checkboxTodoIsDone.addEventListener("change", handler);
}

function handler(event) {
    const todoId = event.currentTarget.dataset.todoId;

    const todoToCheck = document.querySelector(`.todo[data-todo-id="${todoId}"]`);

    fetch("/api/todo/" + todoId + "/check/", {method: 'POST'})
        .then(() => {
            todoToCheck.classList.toggle('done');;
        });
}