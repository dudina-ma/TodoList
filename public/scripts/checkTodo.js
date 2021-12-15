const todos = document.querySelectorAll(".todo");

for (let todo of todos) {
    todo.addEventListener("change", handler);
}

function handler(event) {
    const todo = event.currentTarget;
    fetch("/api/todo/" + todo.dataset.todoId + "/check/" + event.target.checked, {method: 'POST'})
        .then(() => {
            todo.classList.toggle('done');;
        });
}