const closeBtns = document.querySelectorAll(".close-btn");

for (let closeBtn of closeBtns) {
    closeBtn.addEventListener("click", handler);
}

function handler(event) {
    const todoId = event.currentTarget.dataset.todoId;

    fetch("/api/todo/" + todoId + "/delete/")
        .then(() => {
            window.location.href = '/';
        });
}