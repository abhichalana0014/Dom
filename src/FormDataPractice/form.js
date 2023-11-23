document.addEventListener("DOMContentLoaded", function () {
    const localStorageHandler = {
        getData: function () {
            return JSON.parse(localStorage.getItem("formObject")) || [];
        },

        updateData: function (data) {
            let storedData = this.getData();
            storedData.unshift(data);
            localStorage.setItem("formObject", JSON.stringify(storedData));
        },
        updateDataById: function (updatedData) {
            console.log("Updating data with id:", updatedData.id);

            let storedData = this.getData();
            let updated = false;

            for (let i = 0; i < storedData.length; i++) {
                if (
                    String(storedData[i].id).trim() ===
                    String(updatedData.id).trim()
                ) {
                    storedData[i] = updatedData;
                    updated = true;
                    break; // Exit the loop once the update is done
                }
            }

            if (updated) {
                localStorage.setItem("formObject", JSON.stringify(storedData));
                console.log("Data updated successfully.");
            } else {
                console.log("Data with the specified ID not found.");
            }
        },
    };

    const formElements = {
        firstName: document.querySelector("#firstName"),
        lastName: document.querySelector("#lastName"),
        age: document.querySelector("#age"),
        email: document.querySelector("#email"),
        dob: document.querySelector("#dob"),
        bloodGroup: document.querySelector("#bloodGroup"),
        phoneNumber: document.querySelector("#phoneNumber"),
        permanentAddress: document.querySelector("#permanentAddress"),
        currentAddress: document.querySelector("#currentAddress"),
        image: document.querySelector("#image"),
        roles: document.querySelector("#roles"),
        gender: document.querySelector("#gender"),
    };

    // when in put is empty
    const validateNotEmpty = (value, message) =>
        value.trim() === "" ? message : "";
    
    // for age validation
    const validateAge = (value) => {
        if (value.trim() === "") {
            return "Please enter your age.";
        }

        const age = parseInt(value);

        if (isNaN(age) || age <= 18) {
            return "Age must be a number greater than 18.";
        }

        return "";
    };

    // email validation
    const validateEmail = (value) => {
        if (value.trim() === "") {
            return "Please enter your email.";
        } else {
            return !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                value
            )
                ? "Please enter a valid email address."
                : "";
        }
    };


    const validateBloodGroup = (value) => {
        if (value.trim() === "") {
            return "This field is required.";
        } else {
            return !["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(
                value.toUpperCase()
            )
                ? "Please enter a valid blood group (e.g., A+, B-, O-)."
                : "";
        }
    };

    const validatePhoneNumber = (value) => {
        return !/^[6-9]\d{9}$/.test(value)
            ? "Please enter a valid Indian phone number."
            : "";
    };

    const validateImage = (value) => {
        const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

        if (value === "") {
            return "Please select an image";
        }

        const extension = value.split(".").pop().toLowerCase();
        if (!allowedExtensions.includes(extension)) {
            return "Please select a valid image file (jpg, jpeg, png, gif).";
        }

        return "";
    };
    const validateDOB = (value) => {
        if (value.trim() === "") {
            return "Please enter your date of birth.";
        }

        const dob = new Date(value);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - dob.getFullYear();

        if (isNaN(age) || age < 18) {
            return "Age must be 18 years or older.";
        }

        return "";
    };

    const validationRules = {
        firstname: {
            rule: validateNotEmpty,
            message: "Please enter a first name.",
        },
        lastname: {
            rule: validateNotEmpty,
            message: "Please enter a last name.",
        },
        age: { rule: validateAge, message: "Plese enter your age" },
        email: {
            rule: validateEmail,
            message: "Please enter a valid email address.",
        },
        dob: { rule: validateDOB, message: "Please enter a date of birth." },
        bloodgroup: {
            rule: validateBloodGroup,
            message: "Please enter a valid blood group.",
        },
        phonenumber: {
            rule: validatePhoneNumber,
            message: "Please enter a valid phone number.",
        },
        currentaddress: {
            rule: validateNotEmpty,
            message: "Please enter a current address.",
        },
        permanentaddress: {
            rule: validateNotEmpty,
            message: "Please enter a permanent address.",
        },
        image: {
            rule: validateImage,
            message: "Please select a valid image (jpg, jpeg, png, gif).",
        },
        roles: {
            rule: validateNotEmpty,
            message: "Please select a role.",
        },
        gender: {
            rule: validateNotEmpty,
            message: "Please select a gender.",
        },
    };

    function validateForm() {
        let isValid = true;

        for (const key in formElements) {
            if (formElements.hasOwnProperty(key)) {
                console.log(formElements[key]);
                const element = formElements[key];

                console.log(key);
                const validationError =
                    key === "image" && editId
                        ? ""
                        : validateField(key, element.value);

                console.log(validationError);

                if (validationError !== "") {
                    displayError(element, validationError);
                    isValid = false;
                }
            }
        }

        return isValid;
    }

    function validateField(key, value) {
        const { rule, message } = validationRules[key.toLowerCase()] || {};
        return rule ? rule(value, message) : "";
    }

    function displayError(element, errorMessage) {
        const errorElement = document.getElementById(`error-${element.id}`);
        if (errorElement) {
            errorElement.innerHTML = errorMessage;
        }
    }

    const clearError = (element) => {
        const errorElement = document.getElementById(`error-${element.id}`);
        if (errorElement) {
            errorElement.innerHTML = "";
        }
    };

    const formSubmission = {
        readFile: function (file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                console.log(reader);

                reader.onload = function () {
                    resolve(reader.result);
                };

                reader.onerror = function (error) {
                    reject(error);
                };

                reader.readAsDataURL(file);
            });
        },

        submitForm: async function (editId) {
            for (const key in formElements) {
                if (formElements.hasOwnProperty(key)) {
                    clearError(formElements[key]);
                }
            }
            let isValid = validateForm();

            if (isValid) {
                console.log("editId in submitForm:", editId);
                let userForm = document.querySelector("#userForm");
                let formData = new FormData(userForm);
                let formObject = {};
                let formId = new Date().getTime();

                for (const [key, value] of formData.entries()) {
                    if (value instanceof File) {
                        if (value.size > 0) {
                            try {
                                const result = await this.readFile(value);
                                const imageName = value.name;
                                const imageData = {
                                    url: result,
                                    name: imageName,
                                };
                                formObject[key] = imageData;
                            } catch (error) {
                                console.error("Error reading file:", error);
                            }
                        } else if (editId) {
                            const existingData = localStorageHandler.getData();
                            const existingImage = existingData?.find(
                                (item) => item.id == editId.trim()
                            )?.[key];

                            formObject[key] = existingImage || null;
                        }
                    } else {
                        formObject[key] = value;
                    }
                }

                formObject["id"] = editId || formId;
                console.log("Form data submitted:", formObject);

                // Move updateData outside of the loop to avoid duplicate entries
                console.log(
                    "Existing data before update:",
                    localStorageHandler.getData()
                );
                console.log("Data to be updated:", formObject);
                if (editId) {
                    localStorageHandler.updateDataById(formObject);
                } else {
                    localStorageHandler.updateData(formObject);
                    userForm.reset();
                }

                this.redirectPage();
            }
        },

        redirectPage: function () {
            window.location.href = "table.html";
        },
    };
    // formSubmission.validations();

    const populateFormFields = (editId) => {
        if (editId) {
            const editedData = localStorageHandler.getData();
            const changableData = editedData?.find(
                (item) => item.id == editId.trim()
            );

            if (changableData) {
                const form = document.getElementById("userForm");

                for (const key in changableData) {
                    if (changableData.hasOwnProperty(key)) {
                        const element = formElements[key];
                        if (element) {
                            switch (element.type) {
                                case "file":
                                    const imageurl = changableData[key];
                                    document.querySelector("[data-Image]").src =
                                        imageurl
                                            ? imageurl.url
                                            : "../FormDataPractice/utility/download1.png";
                                    // document.querySelector(
                                    //     `input[name="${key}"][value="${imageurl}"]`
                                    // );
                                    break;

                                case "checkbox":
                                    const checkboxValue = changableData[key];
                                    element.checked = checkboxValue;
                                    break;

                                case "textarea":
                                    element.value = changableData[key];
                                    break;

                                default:
                                    element.value = changableData[key];
                                    break;
                            }
                        }
                    }
                }

                document.getElementById("btn").innerText = "Update";
            }
        }
    };

    let urlParams = new URLSearchParams(window.location.search);
    let editId = urlParams?.get("edit");
    populateFormFields(editId);

    // document.querySelector("#btn").addEventListener("click", function (){
    //     formSubmission.submitForm(editId)
    // })
    document
        .querySelector("#userForm")
        .addEventListener("submit", function (e) {
            e.preventDefault();
            formSubmission.submitForm(editId);
        });
});
