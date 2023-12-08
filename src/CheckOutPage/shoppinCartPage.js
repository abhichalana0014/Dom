import { v4 as uuidv4 } from "https://cdn.skypack.dev/uuid";
(() => {
    "use strict";

    const checkOutPage = {
        cartlist: document.getElementById("product-list"),
        subtotalElement: document.getElementById("subtotalAmount"),

        // deliveryform: document.getElementById("deliveryForm"),

        options: null,

        rzp: null,

        subtotal: 0,

        addCartProductData: function (data) {
            localStorage.setItem("shoppingCart", JSON.stringify(data));
        },
        getCartProuductData: function () {
            return JSON.parse(localStorage.getItem("shoppingCart")) || [];
        },

        getLocalStorageData: function () {
            return JSON.parse(localStorage.getItem("Allproducts")) || [];
        },

        updatelocalStorageData: function (data) {
            localStorage.setItem("Allproducts", JSON.stringify(data));
        },

        async renderProducts() {
            // let alldata = this.getLocalStorageData()
            try {
                let cartProducts = await this.getCartProuductData();
                console.log(cartProducts);
                this.subtotal = 0;
                this.cartlist.innerHTML = "";

                if (cartProducts.length > 0) {
                    cartProducts.forEach((item) => {
                        this.cartlist.innerHTML += `
                        <li class="flex py-6 w-full border px-4">
                        <div
                            class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                        >
                            <img
                                src="${item.productData.thumbnail}"
                                alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                class="h-full w-full object-cover object-center"
                            />
                        </div>
                    
                        <div class="ml-4 flex flex-1 flex-col">
                            <div>
                                <div
                                    class="flex justify-between text-base font-medium text-gray-900"
                                >
                                    <h3>
                                        <a href="#">${
                                            item.productData.title
                                        }</a>
                                    </h3>
                                    <p class="ml-4">₹ ${
                                        item.productData.price * item.quantity
                                    }</p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500">${item.productData.description.slice(
                                    0,
                                    20
                                )}</p>
                            </div>
                            <div class="flex flex-1 items-end justify-between text-sm">
                                <div class="flex items-center gap-2">
                                    <button data-product="${
                                        item.productData.id
                                    }" 
                                        class="decrease w-5 text-center h-full border text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300"
                                        >-</button
                                    >
                                    <span class="text-gray-500">${
                                        item.quantity
                                    }</span>
                                    <button data-product="${
                                        item.productData.id
                                    }" 
                                        class="increase w-5 text-center h-full border text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300"
                                        >+</button
                                    >
                                </div>
                    
                                <div class="flex">
                                    <button
                                        type="button"
                                        class="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                   `;
                        this.subtotal += item.productData.price * item.quantity;
                    });
                }
                this.subtotalElement.textContent = `₹ ${this.subtotal.toFixed(
                    2
                )}`;
            } catch (error) {
                console.error("Error rendering products:", error);
            }
        },

        // generateOrderId() {
        //     const staticString = "order_";
        //     const uniqueString = Math.random().toString(36).substring(7);
        //     const timestampString = new Date().getTime().toString();

        //     return `${staticString}${uniqueString}${timestampString}`;
        // },

        initialize() {
            this.options = {
                key: "rzp_test_oIvncej9kHpk40",
                amount: this.subtotal * 100,
                currency: "INR",
                name: "Acme Corp",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: "order_N9qk80qTStOtBp",
                handler: this.handlePaymentSuccess.bind(this),
                prefill: {
                    name: "Abhishek",
                    email: "abhichalana099@gmail.com",
                    contact: "9781999236",
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            this.rzp = new Razorpay(this.options);
            this.addEventListeners();
            document.getElementById("checkout-btn").onclick =
                this.handleCheckOut.bind(this);
        },

        async handlePaymentSuccess(response) {
            let cartproducts = this.getCartProuductData();
            let deliveryform = document.getElementById("deliveryForm");
            let formData = new FormData(deliveryform);
            let formObject = Object.fromEntries(formData);

            const orderDetails = {
                date: Date.now(),
                response,
                subtotal: this.subtotal,
                orderproducts: cartproducts,
                formObject,
            };

            localStorage.setItem(
                "paymentResponse",
                JSON.stringify(orderDetails)
            );

            console.log(orderDetails);
            try {
                window.location.href = "invoise.html";
            } catch (error) {
                console.error("Error navigating to invoice:", error);
            }
        },

        bind() {
            this.cartlist.addEventListener("click", (event) => {
                const target = event.target;

                if (
                    target.classList.contains("decrease") ||
                    target.classList.contains("increase")
                ) {
                    const productId = target
                        .closest("button")
                        .getAttribute("data-product");
                    console.log(productId);

                    let type = "decrease";
                    if (target.classList.contains("increase")) {
                        type = "increase";
                    }

                    this.updateQuantity(productId, type);
                }
            });
            this.initialize();
        },

        handlePaymentError: function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        },

        addEventListeners: function () {
            this.rzp.on("payment.failed", this.handlePaymentError.bind(this));
        },

        async handleCheckOut(e) {
            e.preventDefault();

            try {
                console.log("handle checkout");
                let deliveryform = document.getElementById("deliveryForm");
                let formData = new FormData(deliveryform);
                let formObject = Object.fromEntries(formData);
                let element = formObject.firstName;
                console.log("element", element);

                for (const key in formObject) {
                    console.log(key);
                    if (formObject.hasOwnProperty(key)) {
                        this.clearError(key);
                    }
                }
                const validationResult = this.validation(formObject);

                if (validationResult.isValid) {
                    console.log(formObject);
                    this.rzp.open();
                    return;
                }
                let errors = validationResult.errors;
                this.setError(errors);
            } catch (error) {
                console.error("Error handling checkout:", error);
            }
        },

        validation(form) {
            console.log(form);
            const validate = {
                isValid: false,
                errors: [],
            };
            if (!form instanceof Object) return;
            if (!/^[A-Za-z]+$/.test(form.firstName?.trim())) {
                validate.errors.push({
                    name: "firstName",
                    message: "*special characters not allowed",
                });
            }
            if (!/^[A-Za-z]+$/.test(form.lastName?.trim())) {
                validate.errors.push({
                    name: "lastName",
                    message: "*special characters not allowed",
                });
            }

            if (!/^[A-Za-z]+$/.test(form.city?.trim())) {
                validate.errors.push({
                    name: "city",
                    message: "*enter correct city ",
                });
            }
            if (form.address?.trim() == "") {
                validate.errors.push({
                    name: "address",
                    message: "*enter correct address",
                });
            }
            if (!/^[A-Za-z]+$/.test(form.state?.trim())) {
                validate.errors.push({
                    name: "state",
                    message: "*enter correct State",
                });
            }
            if (
                !/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(
                    form.phone?.trim()
                )
            ) {
                validate.errors.push({
                    name: "phone",
                    message: "*enter correct phone",
                });
            }
            if (form.zipCode?.length < 4 || form.zipCode?.length > 6) {
                validate.errors.push({
                    name: "zipCode",
                    message: "*enter correct zipCode",
                });
            }

            if (validate.errors.length === 0) {
                validate.isValid = true;
            }
            return validate;
        },

        clearError(element) {
            const errorElement = document.querySelector(
                `[data-${element}Error]`
            );
            if (errorElement) {
                errorElement.innerHTML = "";
            }
        },

        setError: function (errors) {
            errors.map((error) => {
                document.querySelector(`[data-${error.name}Error]`).innerHTML =
                    error.message;
            });
        },

        updateQuantity(productId, type) {
            let cartProducts = this.getCartProuductData();
            const index = cartProducts.findIndex(
                (item) => item.productData.id == productId
            );

            if (index >= 0) {
                switch (type) {
                    case "increase":
                        cartProducts[index].quantity += 1;
                        break;

                    default:
                        let valueChange = cartProducts[index].quantity - 1;

                        console.log(valueChange);
                        if (valueChange > 0) {
                            cartProducts[index].quantity -= 1;
                        } else {
                            cartProducts.splice(index, 1);
                        }
                        break;
                }
            }
            this.addCartProductData(cartProducts);
            this.renderProducts();
        },

        init() {
            this.bind();
            this.renderProducts();
        },
    };
    checkOutPage.init();
})();
