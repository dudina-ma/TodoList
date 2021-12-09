const checkboxesTodoIsDone = document.querySelectorAll(".todo");

for (let checkboxTodoIsDone of checkboxesTodoIsDone) {
    checkboxTodoIsDone.addEventListener("change", handler);
}

function handler(event) {
    const todoId = event.currentTarget.dataset.todoId;

    const todoToCheck = document.querySelector(`.todo[data-todo-id="${todoId}"]`);

    const todoToCheckCheckbox = document.querySelector(`.todo[data-todo-id="${todoId}"] input[type="checkbox"]`);

    let isChecked = todoToCheckCheckbox.checked;

    fetch("/api/todo/" + todoId + "/check/" + isChecked, {method: 'POST'})
        .then(() => {
            todoToCheck.classList.toggle('done');;
        });
}