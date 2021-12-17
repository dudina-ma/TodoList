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