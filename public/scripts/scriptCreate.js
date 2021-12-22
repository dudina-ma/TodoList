// submit createForm
const createForm = document.querySelector(".create-form");
createForm.addEventListener("submit", handlerCreate);

function clearNotifications() {
    const notificationsOnPage = document.querySelectorAll(".create-notification");
    if (notificationsOnPage) {
        for (let notificationOnPage of notificationsOnPage) {
            notificationOnPage.remove();
        }
    }
}

let titleHasBeenChanged = false;

const title = document.querySelector("input[name='title']");
title.addEventListener("input", () => {
    titleHasBeenChanged = true;
    title.classList.remove("error");
    clearNotifications();
});

let descriptionHasBeenChanged = false;

const description = document.querySelector("input[name='description']");
title.addEventListener("input", () => {
    descriptionHasBeenChanged = true;
    description.classList.remove("error");
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
        if (Object.keys(result).length !== 0) {
            if ("title" in result) {
                title.classList.add("error");
                if (!titleHasBeenChanged) {
                    clearNotifications();
                }
                for (let i = 0; i < result.title.length; i++) {
                    const notification = document.createElement("div");
                    notification.classList.add("create-notification");
                    notification.textContent = result.title[i];
                    const titleNotificationPlace = document.querySelector(".title-notification-place");
                    titleNotificationPlace.append(notification);
                    titleHasBeenChanged = false;
                }
            }
            if ("description" in result) {
                description.classList.add("error");
                if (!descriptionHasBeenChanged) {
                    clearNotifications();
                }
                for (let i = 0; i < result.description.length; i++) {
                    const notification = document.createElement("div");
                    notification.classList.add("create-notification");
                    notification.textContent = result.description[i];
                    const descriptionNotificationPlace = document.querySelector(".description-notification-place");
                    descriptionNotificationPlace.append(notification);
                    descriptionHasBeenChanged = false;
                }
            }
        } else {
            window.Modal.showAlert("Create todo", "Todo has been created", () => window.location.href = '/');
        }



    });
}