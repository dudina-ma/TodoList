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

// submit createForm
const createForm = document.querySelector(".create-form");
if (createForm) {
    createForm.addEventListener("submit", handlerCreate);

    function handlerCreate(event) {
        event.preventDefault();

        let formData = new FormData(event.target);

        let newTodo = {};
        formData.forEach((value, key) => newTodo[key] = value);

        fetch("/api/todo/create/", {
            method: 'POST',
            body: JSON.stringify(newTodo),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
             window.Modal.showAlert("Create todo", "Todo has been created", () => window.location.href = '/');
            });
    }
}

const editForm = document.querySelector(".edit-form");
if (editForm) {
    editForm.addEventListener("submit", handlerEdit);

    function handlerEdit(event) {
        event.preventDefault();

        let formData = new FormData(event.target);

        let editedTodo = {};
        formData.forEach((value, key) => editedTodo[key] = value);

        const todoId = event.target.dataset.todoId;

        fetch("/api/todo/" + todoId + "/edit/", {
            method: 'POST',
            body: JSON.stringify(editedTodo),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
             window.Modal.showAlert("Create todo", "Todo has been edited", () => window.location.href = '/');
        });
    }
}
