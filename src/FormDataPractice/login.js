import { showToast } from "./alert";
(function () {
            
    "use strict";

    const localStorageHandler = {
        getData: function () {
            return (
                JSON.parse(localStorage.getItem("formObject")) || []
            );
        },

        updateloginData: function (data) {
            let loginInfo = localStorage.setItem(
                "loggedInUser",
                JSON.stringify(data)
            );
        },
    };

    const isLogin = {
        loginform: function () {
            let loginForm = document.querySelector("#loginform");
            let loginUser = new FormData(loginForm);
            let loginObject = {};

            for (const [key, value] of loginUser.entries()) {
                loginObject[key] = value;
            }
            console.log("Form data submitted:", loginObject);

            const users = localStorageHandler.getData();
            const logged_In_User = users.find(
                (user) =>
                    user.email === loginObject.email &&
                    user.password === loginObject.password
            );

            if (logged_In_User) {
                console.log(logged_In_User);
                const expirationSeconds = 8 * 60 * 60;

                // Set the cookie with Max-Age attribute and user ID
                document.cookie = `UserId=${logged_In_User.id}; SameSite=None; Secure; Max-Age=${expirationSeconds}`;
                // const params = new URLSearchParams();
                // params.set("id", logged_In_User.id);
                // // params.set("email", logged_In_User.email);
                showToast("success","Login Successful")
                window.setTimeout(() => {
                    window.location.href =
                        "users.html";
                }, 3000);
            } else {
                showToast("error", "invalid credentials");
            }
        },
    };

    document
        .querySelector("#loginform")
        .addEventListener("submit", (e) => {
            e.preventDefault();
            isLogin.loginform();
        });
})();