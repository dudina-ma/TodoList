// submit createForm

const createBtn = document.querySelector(".create-btn");

createBtn.addEventListener("click", handlerCreateBtn);

function handlerCreateBtn() {
    const categoryCreate = document.querySelector(".category-create");

    const categoryCreateForm = document.createElement("form");
    categoryCreateForm.classList.add("category-create-form");
    categoryCreate.append(categoryCreateForm);

    const categoryCreateFormOnPage = document.querySelector(".category-create-form");

    const categoryCreateFormField = document.createElement("input");
    categoryCreateFormField.classList.add("category-create-form-field");
    categoryCreateFormField.name = "title";
    categoryCreateFormOnPage.append(categoryCreateFormField);

    const categoryCreateFormBtn = document.createElement("input");
    categoryCreateFormBtn.classList.add("category-create-form-btn");
    categoryCreateFormBtn.type = "submit";
    categoryCreateFormBtn.value = "Add category";
    categoryCreateFormOnPage.append(categoryCreateFormBtn);

    const validationErrorPlace = document.createElement("div");
    validationErrorPlace.classList.add("title-validation-error-place");
    categoryCreateFormOnPage.append(validationErrorPlace);

    function clearValidationErrors() {
        const validationErrorsOnPage = document.querySelectorAll(".validation-error");
        for (let validationErrorOnPage of validationErrorsOnPage) {
            validationErrorOnPage.remove();
        }
        const fieldsWithError = document.querySelectorAll(".error");
        for (let fieldWithError of fieldsWithError) {
            fieldWithError.classList.remove("error");
        }
    }

    function clearValidationErrorsOnInput(form) {
        form.addEventListener("input", () => {
            clearValidationErrors();
        });

    }

    clearValidationErrorsOnInput(categoryCreateFormOnPage);

    categoryCreateFormOnPage.addEventListener("submit", handlerCreate);

    function handlerCreate(event) {
        event.preventDefault();

        let formData = new FormData(event.target);

        let newCategory = {};
        formData.forEach((value, key) => newCategory[key] = value);

        console.log(newCategory.title);

        clearValidationErrors();

        function addValidationErrors(validationResults) {
            for (let result of Object.keys(validationResults)) {
                const field = document.querySelector("input[name='" + result + "']");
                field.classList.add("error");
                for (let i = 0; i < validationResults[result].length; i++) {
                    const validationError = document.createElement("div");
                    validationError.classList.add("validation-error");
                    validationError.textContent = validationResults[result][i];
                    const validationErrorPlace = document.querySelector("." + result + "-validation-error-place");
                    validationErrorPlace.append(validationError);
                }
            }
        }

        fetch("/api/category/create/", {
            method: 'POST',
            body: JSON.stringify(newCategory),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json()
        ).then(result => {
            if (Object.keys(result).length !== 0) {
                addValidationErrors(result);
            } else {
                window.location.href = '/categories/';
            }
        });
    }
}


