// import { showToast } from "./alert";
(function () {
    "use strict";
    const localStorageHandler = {
        getData: function () {
            return (
                JSON.parse(localStorage.getItem("formObject")) || []
            );
        },
    };

    const authenticatedUser = (userID) => {
        if (userID) {
            let users = localStorageHandler.getData();

            let currentUser = users.find(
                (user) => user.id == userID.trim()
            );
            console.log(currentUser);

            let profilePicture =
                document.getElementById("profilePicture");
            profilePicture.src = currentUser.image.url;

            const logout = document
                .getElementById("logout")
                .addEventListener("click", () => {
                    params.delete("id");
                    window.location.href = "login.html?" + params;
                });
        }
    };

    const params = new URLSearchParams(window.location.search);
    let userID = params.get("id");
    authenticatedUser(userID);

    document
        .getElementById("hamburger")
        .addEventListener("click", function () {
            var sidebar = document.getElementById("sidebar");
            sidebar.classList.toggle("-translate-x-full");
            sidebar.classList.toggle("translate-x-0");
        });

    const formDataTable = {
        searchBox: document.querySelector("#search_bar_js"),
        timerId: null,

        addNewUser: document.querySelector(`[data-AddNewUser]`),

        useDebouncing: function (res) {
            clearTimeout(this.timerId),
                (this.timerId = setTimeout(() => {
                    let SearchValues = this.getData().filter(
                        (item) => {
                            const name =
                                item.firstName.toLowerCase();
                            const email = item.email.toLowerCase();
                            return (
                                name.includes(res.toLowerCase()) ||
                                email.includes(res.toLowerCase())
                            );
                        }
                    );
                    this.tabelUI(SearchValues);
                    console.log(SearchValues);
                }, 2000));
        },
        getData: function () {
            return (
                JSON.parse(localStorage.getItem("formObject")) || []
            );
        },

        updateData: function (data) {
            let storedData = this.getData();
            storedData.unshift(data);
            localStorage.setItem(
                "formObject",
                JSON.stringify(storedData)
            );
        },

        bind: function () {
            this.searchBox.addEventListener("input", () => {
                this.useDebouncing(this.searchBox.value.trim());
            });

            this.addNewUser.addEventListener("click", (e) => {
                window.location.href = "form.html";
            });
        },

        tabelUI: function (data) {
            let formData = data ? data : this.getData();

            const tbody = document.querySelector("#tableBody");
            tbody.innerHTML = "";

            formData.map((item, index) => {
                console.log(item);
                let row = tbody.insertRow();
                row.setAttribute(
                    "class",
                    "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                );

                let cell0 = row.insertCell(0);
                let cell1 = row.insertCell(1);
                let cell2 = row.insertCell(2);
                let cell3 = row.insertCell(3);
                let cell4 = row.insertCell(4);
                let cell5 = row.insertCell(5);

                cell0.setAttribute("class", "px-6 py-4");
                cell1.setAttribute("class", "px-6 py-1");
                cell2.setAttribute("class", "px-6 py-4");

                cell0.textContent = index + 1;
                cell0.scope = "col";

                cell1.innerHTML = item.image
                    ? `<img src="${item?.image.url}" alt="Profile Image" class="rounded-full w-16 h-16"/>`
                    : `<img src="../FormDataPractice/utility/download1.png" alt="empty-image" class="w-16 h-16 rounded-full">`;
                cell1.scope = "col";
                cell2.innerHTML = item.firstName;
                cell3.innerHTML = item.email;
                cell4.innerHTML = item.roles;
                cell4.setAttribute("class", "px-6 py-4");
                cell5.setAttribute(
                    "class",
                    "flex items-center px-6 py-6 gap-4"
                );

                let deleteButton = document.createElement("button");
                deleteButton.classList.add("rounded");
                deleteButton.innerHTML = `<svg class="w-6 h-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor"><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"></path></svg>`;
                deleteButton.type = "button";
                deleteButton.addEventListener("click", function () {
                    if (
                        confirm(
                            "are you sure! You want to delete this user"
                        )
                    ) {
                        formDataTable.deleteUser(item, row);
                    }
                });

                cell5.appendChild(deleteButton);

                let editButton = document.createElement("a");

                editButton.classList.add(
                    "text-blue-400",
                    "rounded",
                    "underline",
                    "font-medium",
                    "cursor-pointer"
                );
                editButton.innerHTML = `<svg class="w-6 h-6 text-blue-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path></svg>`;
                editButton.addEventListener("click", function () {
                    window.location.href = `form.html?edit=${item.id}`;
                });

                cell5.appendChild(editButton);
            });
            this.bind();
        },

        deleteUser: function (item, row) {
            let id = item.id;
            let newData = formDataTable
                .getData()
                .filter((task) => task.id !== id);

            localStorage.setItem(
                "formObject",
                JSON.stringify(newData)
            );
            row.remove();
            formDataTable.updateIndices();
        },

        updateIndices: function () {
            const tbody = document.querySelector("#tableBody");
            const rows = tbody.querySelectorAll("tr");
            rows.forEach((row, index) => {
                const cell0 = row.cells[0];
                cell0.innerHTML = index + 1;
            });
        },
    };
    window.onload = formDataTable.tabelUI();
})();