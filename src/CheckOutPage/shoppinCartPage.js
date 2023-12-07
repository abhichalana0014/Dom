(() => {
    "use strict";

    const checkOutPage = {
        cartlist: document.getElementById("product-list"),
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
            let cartProducts = this.getCartProuductData();
            console.log(cartProducts);

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
                                        class="increase w-5 text-center h-full border text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300"
                                        >-</button
                                    >
                                    <span class="text-gray-500">${
                                        item.quantity
                                    }</span>
                                    <button data-product="${
                                        item.productData.id
                                    }" 
                                        class="decrease w-5 text-center h-full border text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300"
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
                });
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
                    if (target.classList.contains("plus")) {
                        type = "plus";
                    }

                    this.updateQuantity(productId, type);
                }
            });
        },

        updateQuantity(productId, change) {
            let cartProducts = this.getCartProuductData();
            const index = cartProducts.findIndex(
                (item) => item.productData.id === productId
            );

            if (index !== -1) {
                cartProducts[index].quantity += change;

                // If the quantity is 0 or less, remove the product from the cart
                if (cartProducts[index].quantity <= 0) {
                    cartProducts.splice(index, 1);
                }

                this.addCartProductData(cartProducts);
                this.renderProducts();
            }
        },

        removeProduct(productId) {
            let cartProducts = this.getCartProuductData();
            const index = cartProducts.findIndex(
                (item) => item.productData.id === productId
            );

            if (index !== -1) {
                cartProducts.splice(index, 1);
                this.addCartProductData(cartProducts);
                this.renderProducts();
            }
        },

        init() {
            this.bind();
            this.renderProducts();
        },
    };
    checkOutPage.init();
})();
