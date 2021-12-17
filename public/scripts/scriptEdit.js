// submit editForm
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