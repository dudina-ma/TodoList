const deleteBtns = document.querySelectorAll(".delete-btn");

for (let deleteBtn of deleteBtns) {
    deleteBtn.addEventListener("click", handler);
}

function handler(event) {
    const todoId = event.currentTarget.dataset.todoId;

    fetch("/api/todo/" + todoId + "/delete/", {method: 'POST'})
        .then(() => {
            window.Modal.showAlert("Delete todo", "Todo has deleted", () => window.location.href = '/');
        });
}