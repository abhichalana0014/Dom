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

    let urlParams = new URLSearchParams(window.location.search);
    let editId = urlParams?.get("edit");

    console.log(editId);
    if (editId) {
        let editedData = localStorageHandler.getData();
        let changableData = editedData?.find(
            (item) => item.id == editId.trim()
        );
        console.log("changableData", changableData);

        if (changableData) {
            // Populate form fields dynamically
            const form = document.getElementById("userForm");

            for (const key in changableData) {
                if (changableData.hasOwnProperty(key)) {
                    const element = form.elements[key];
                    if (element) {
                        switch (element.type) {
                            case "file":
                                const imageurl = changableData[key];
                                // console.log(imageurl)
                                // Handle file input
                                // element.value = "";
                                document.querySelector("[data-Image]").src =
                                    imageurl.url
                                        ? imageurl.url
                                        : `
                                ../FormDataPractice/utility/download1.png 
                                `;
                                document.querySelector(`input[name="${key}"][value="${imageurl}"]`) 
                                break;
                            case "radio":
                                // Handle radio buttons
                                const radioValue = changableData[key];
                                const radio = form.querySelector(
                                    `input[name="${key}"][value="${radioValue}"]`
                                );
                                if (radio) {
                                    radio.checked = true;
                                }
                                break;
                            case "checkbox":
                                // Handle checkboxes
                                const checkboxValue = changableData[key];
                                element.checked = checkboxValue;
                                break;
                            case "textarea":
                                // Handle text areas
                                element.value = changableData[key];
                                break;
                            default:
                                // Default for text inputs, selects, etc.
                                element.value = changableData[key];
                                break;
                        }
                    }
                }
            }

            document.getElementById("btn").innerText = "Update";
        }
    }

    let formSubmission = {
        name: document.querySelector("#firstName"),
        lastName: document.querySelector("#lastName"),
        age: document.querySelector("#age"),
        email: document.querySelector("#email"),
        dob: document.querySelector("#dob"),
        bloodGroup: document.querySelector("#bloodGroup"),
        phoneNumber: document.querySelector("#phoneNumber"),
        permanentAddress: document.querySelector("#permanentAddress"),
        currentAddress: document.querySelector("#currentAddress"),

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
            const error_firstName = document.getElementById("error-firstName");
            const error_lastName = document.getElementById("error-lastName");
            const error_age = document.getElementById("error-age");
            const error_email = document.getElementById("error-email");
            const error_dob = document.getElementById("error-dob");
            const error_bloodGroup =
                document.getElementById("error-bloodGroup");
            const error_phoneNumber =
                document.getElementById("error-phoneNumber");
            const error_currentAddress = document.getElementById(
                "error-currentAddress"
            );
            const error_permanentAddress = document.getElementById(
                "error-permanentAddress"
            );

            if (this.name.value.trim() === "") {
                error_firstName.innerHTML = "First Name is required";
            }
            if (this.lastName.value.trim() === "") {
                error_lastName.innerHTML = "Last Name is required";
            }
            if (this.age.value === "") {
                error_age.innerHTML = "Age is required";
            }
            if (this.email.value === "") {
                error_email.innerHTML = "Please Enter email";
            }
            if (this.dob.value === "") {
                error_dob.innerHTML = "Please select DOB";
            }
            if (this.bloodGroup.value === "") {
                error_bloodGroup.innerHTML = "Please enter blood group";
            }
            if (this.phoneNumber.value === "") {
                error_phoneNumber.innerHTML = "Enter Phone number";
            }
            if (this.permanentAddress.value === "") {
                error_currentAddress.innerHTML = "Fill address";
            }
            if (this.currentAddress.value === "") {
                error_permanentAddress.innerHTML = "Fill address";
            }

            if (
                !error_firstName.innerHTML &&
                !error_lastName.innerHTML &&
                !error_age.innerHTML &&
                !error_email.innerHTML &&
                !error_dob.innerHTML &&
                !error_bloodGroup.innerHTML &&
                !error_phoneNumber.innerHTML &&
                !error_permanentAddress.innerHTML &&
                !error_currentAddress.innerHTML
            ) {
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
                        } else {
                            formObject[key] = null;
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
                    form.reset();
                }

                // this.redirectPage();
            }
        },

        validations: function () {
            const error_firstName = document.getElementById("error-firstName");
            const error_lastName = document.getElementById("error-lastName");
            const error_age = document.getElementById("error-age");
            const error_email = document.getElementById("error-email");
            const error_dob = document.getElementById("error-dob");
            const error_bloodGroup =
                document.getElementById("error-bloodGroup");
            const error_phoneNumber =
                document.getElementById("error-phoneNumber");
            const error_currentAddress = document.getElementById(
                "error-currentAddress"
            );
            const error_permanentAddress = document.getElementById(
                "error-permanentAddress"
            );

            this.name.addEventListener("input", () => {
                if (!/^[a-zA-Z]+$/.test(this.name.value)) {
                    error_firstName.innerHTML =
                        "First Name should contain only alphabets.";
                }
                if (
                    this.name.value === "" ||
                    /^[a-zA-Z]+$/.test(this.name.value)
                ) {
                    error_firstName.innerHTML = "";
                }
            });

            this.lastName.addEventListener("input", () => {
                if (!/^[a-zA-Z]+$/.test(this.lastName.value)) {
                    error_lastName.innerHTML =
                        "Last Name should contain only alphabets.";
                }

                if (
                    this.lastName.value === "" ||
                    /^[a-zA-Z]+$/.test(this.lastName.value)
                ) {
                    error_lastName.innerHTML = "";
                }
            });

            this.age.addEventListener("input", () => {
                let ageValue = this.age.value;

                if (ageValue < 18) {
                    error_age.innerHTML =
                        "Age must be a number greater than 18.";
                }
                if (ageValue === "" || ageValue > 18) {
                    error_age.innerHTML = "";
                }
            });

            this.email.addEventListener("input", () => {
                let emailValue = this.email.value;

                const emailRegex =
                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

                if (!emailRegex.test(emailValue)) {
                    error_email.innerHTML =
                        "Please enter a valid email address.";
                }
                if (emailValue === "" || emailRegex.test(emailValue)) {
                    error_email.innerHTML = "";
                }
            });

            this.dob.addEventListener("input", () => {
                if (this.dob.value !== "") {
                    error_dob.innerHTML = "";
                }
            });

            // this.role.addEventListener("input", () => {
            //     if (this.role.value !== "") {
            //         roleError.innerHTML = "";
            //     }
            // });

            this.bloodGroup.addEventListener("input", () => {
                let bloodGroupValue = this.bloodGroup.value;

                const validBloodGroups = [
                    "A+",
                    "A-",
                    "B+",
                    "B-",
                    "AB+",
                    "AB-",
                    "O+",
                    "O-",
                ];

                if (!validBloodGroups.includes(bloodGroupValue.toUpperCase())) {
                    error_bloodGroup.innerHTML =
                        "Please enter a valid blood group (e.g., A+, B-, O-).";
                }
                if (
                    bloodGroupValue === "" ||
                    validBloodGroups.includes(bloodGroupValue.toUpperCase())
                ) {
                    error_bloodGroup.innerHTML = "";
                }
            });

            // this.image.addEventListener("change", (e) => {
            //     let imageFile = this.image.files;

            //     if (imageFile) {
            //         imageError.innerHTML = "";
            //     }
            // });

            this.phoneNumber.addEventListener("input", () => {
                let phoneNumberValue = this.phoneNumber.value;

                // Regular expression for a valid Indian phone number
                const phoneRegex = /^[6-9]\d{9}$/;

                if (!phoneRegex.test(phoneNumberValue)) {
                    error_phoneNumber.innerHTML =
                        "Please enter a valid Indian phone number.";
                }
                if (
                    phoneNumberValue === "" ||
                    phoneRegex.test(phoneNumberValue)
                ) {
                    error_phoneNumber.innerHTML = "";
                }
            });

            this.currentAddress.addEventListener("input", () => {
                if (currentAddress.value !== "") {
                    error_currentAddress.innerHTML = "";
                }
            });

            this.permanentAddress.addEventListener("input", () => {
                if (permanentAddress.value !== "") {
                    error_permanentAddress.innerHTML = "";
                }
            });
        },

        redirectPage: function () {
            window.location.href = "table.html";
        },
    };
    formSubmission.validations();

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
