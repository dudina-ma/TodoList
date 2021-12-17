// check
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

    fetch("/api/todo/" + todoId + "/delete/", {method: 'POST'})
        .then(() => {
            window.Modal.showAlert("Delete todo", "Todo has been deleted", () => window.location.href = '/');
        });
}