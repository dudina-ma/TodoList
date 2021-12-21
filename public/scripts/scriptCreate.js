// submit createForm
const createForm = document.querySelector(".create-form");
createForm.addEventListener("submit", handlerCreate);

let fieldHasBeenChanged = false;

function clearNotifications() {
    const notificationsOnPage = document.querySelectorAll(".create-notification");
    if (notificationsOnPage) {
        for (let notificationOnPage of notificationsOnPage) {
            notificationOnPage.remove();
        }
    }
}


const title = document.querySelector("input[name='title']");
title.addEventListener("input", () => {
    fieldHasBeenChanged = true;
    title.classList.remove("error");
    clearNotifications();
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
            if (!fieldHasBeenChanged) {
                clearNotifications();
            }
            for (let i = 0; i < result.title.length; i++) {
                const notification = document.createElement("div");
                notification.classList.add("create-notification");
                notification.textContent = result.title[i];
                const titleNotificationPlace = document.querySelector(".title-notification-place");
                titleNotificationPlace.append(notification);
                fieldHasBeenChanged = false;
            }
        } else {
            window.Modal.showAlert("Create todo", "Todo has been created", () => window.location.href = '/');
        }
    });
}