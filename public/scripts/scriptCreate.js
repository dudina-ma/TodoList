// submit createForm
const createForm = document.querySelector(".create-form");
createForm.addEventListener("submit", handlerCreate);

const title = document.querySelector("input[name='title']");
title.addEventListener("focus", () => {
    title.classList.remove("error");
    const notificationOnPage = document.querySelector(".create-notification");
    if (notificationOnPage) {
        notificationOnPage.textContent = "";
    }
});

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
    }).then(response => response.json()
    ).then(result => {
        if ("title" in result) {
            title.classList.add("error");
            const notificationOnPage = document.querySelector(".create-notification");
            if (notificationOnPage) {
                notificationOnPage.textContent = result.title;
            } else {
                const notification = document.createElement("div");
                notification.classList.add("create-notification");
                notification.textContent = result.title;
                const titleNotificationPlace = document.querySelector(".title-notification-place");
                titleNotificationPlace.append(notification);
            }
        } else {
            window.Modal.showAlert("Create todo", "Todo has been created", () => window.location.href = '/');
        }
    });
}