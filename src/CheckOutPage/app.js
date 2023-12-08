import { showToast } from "./Utility/showToast.js";

(() => {
    "use strict";

    const productPage = {
        url: "https://dummyjson.com/products",
        abortController: new AbortController(),
        timeoutId: null,
        debounceTimeoutId: null,
        listAllProducts: [],
        productCard: document.getElementById("product-card"),
        productCount: document.getElementById("productcount"),
        cart: [],

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

        //fetch product from dummyJson Api
        async fetchProducts(url, signal) {
            try {
                let response = await fetch(url, { signal });
                console.log(response);
                if (!response.ok) {
                    return {
                        error: `Failed to fetch Data. Status: ${response.status}`,
                        data: null,
                    };
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.log(error);
                showToast("error", `Error Fetching Data ${error}`);
            }
        },

        //show all the products
        async renderProductCards(data) {
            let products = (await data) ? data : this.listAllProducts;
            console.log(products);

            this.productCard.innerHTML = "";

            products.map((item) => {
                let listItems = document.createElement("li");
                listItems.setAttribute("dataset", `${item.id}`);
                listItems.setAttribute(
                    "class",
                    "w-full max-w-sm flex gap-4 rounded"
                );

                let firstsection = document.createElement("div");
                firstsection.setAttribute(
                    "class",
                    "w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                );
                listItems.appendChild(firstsection);

                let imagesection = document.createElement("div");
                imagesection.setAttribute("class", "h-48 w-full");

                let productlink = document.createElement("a");
                productlink.src = "#";

                let productimage = document.createElement("img");
                productimage.setAttribute(
                    "class",
                    "w-full h-full object-cover rounded-t-lg"
                );
                productimage.src = item.thumbnail;
                productimage.alt = "product Image";

                productlink.appendChild(productimage);
                imagesection.appendChild(productlink);
                // image section completed

                let detailsection = document.createElement("div");
                detailsection.setAttribute(
                    "class",
                    "px-4 pb-5 space-y-2 mt-2.5"
                );

                let titlelink = document.createElement("a");
                titlelink.src = "#";

                let productTitle = document.createElement("h5");
                productTitle.setAttribute(
                    "class",
                    "text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
                );
                productTitle.innerText = item.title;
                titlelink.appendChild(productTitle);

                let descriptionpara = document.createElement("p");
                descriptionpara.innerHTML = item.description.slice(0,40)

                let startdiv = document.createElement("div");
                startdiv.setAttribute("class", "flex items-center mt-2.5 mb-5")
                startdiv.innerHTML = `
                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
            </div>
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
                `

                let buttonsection = document.createElement("div");
                buttonsection.setAttribute(
                    "class",
                    "flex items-center justify-between"
                );

                let itemPrice = document.createElement("span");
                itemPrice.setAttribute(
                    "class",
                    "text-xl font-bold text-gray-900 dark:text-white"
                );
                itemPrice.innerText = `₹${item.price}`;

                let cartButton = document.createElement("button");
                cartButton.type = "button";
                cartButton.setAttribute(
                    "class",
                    "AddToCart text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                );
                cartButton.innerText = "Add To Cart";

                buttonsection.append(itemPrice, cartButton);

                detailsection.append(titlelink, descriptionpara,startdiv, buttonsection);
                //detail section completed;

                firstsection.append(imagesection, detailsection);
                this.productCard.appendChild(listItems);
            });

            this.productCard.addEventListener("click", (e) => {
                let positionclick = e.target;

                if (positionclick.classList.contains("AddToCart")) {
                    let product_id = positionclick
                        .closest("li")
                        .getAttribute("dataset");
                    this.addToCart(product_id);
                }
            });
        },

        async addToCart(product_id) {
            const selectedProduct = this.listAllProducts.find(
                (product) => product.id == product_id
            );
            console.log(selectedProduct);

            if (selectedProduct) {
                const cartData = this.getCartProuductData();

                let productindex = cartData.findIndex(
                    (value) => value.product_id == product_id
                );

                if (productindex === -1) {
                    cartData.push({
                        product_id: product_id,
                        quantity: 1,
                        productData: selectedProduct,
                    });
                } else {
                    cartData[productindex].quantity += 1;
                }
                const totalQuantity = cartData.reduce(
                    (total, item) => total + item.quantity,
                    0
                );
                this.productCount.innerText = totalQuantity;
                console.log(cartData);
                this.addCartProductData(cartData);
            }
        },

        initializeProductCount() {
            const cartData = this.getCartProuductData();
            const totalQuantity = cartData.reduce(
                (total, item) => total + item.quantity,
                0
            );
            this.productCount.innerText = totalQuantity;
        },

        useDebouncing(searchValue) {
            clearTimeout(this.debounceTimeoutId);
            // console.log(searchValue);
            return (this.debounceTimeoutId = setTimeout(() => {
                console.log(searchValue);
                this.searchData(searchValue);
            }, 500));
        },

        async searchData(searchValue) {
            try {
                let signal = this.abortController.signal;
                if (!searchValue.trim()) {
                    return;
                }

                let searchUrl = `${this.url}/search?q=${searchValue}`;
                console.log(searchUrl);

                this.timeoutId = setTimeout(() => {
                    this.abortController.abort();
                }, 5000);

                let searchResponse = await this.fetchProducts(
                    searchUrl,
                    signal
                );
                clearTimeout(this.timeoutId);

                console.log(searchResponse);

                if (searchResponse.error) {
                    showToast(
                        "error",
                        `Error in Search data: ${searchResponse.error}`
                    );
                    return;
                }

                let searchResult = searchResponse.products;
                console.log(searchResult);

                this.renderProductCards(searchResult);
            } catch (err) {
                // console.log(err);
                if (err.name === "AbortError") {
                    showToast(
                        "invalid",
                        "Search Operation aborted due to TimeOut"
                    );
                    return;
                }
                showToast("error", `Search error Ocurred: ${err} `);
            }
        },

        // call the fetchProduct and store data
        async fetchAndStoreProducts() {
            try {
                let signal = this.abortController.signal;

                this.timeoutId = setTimeout(() => {
                    this.abortController.abort();
                }, 5000);

                const productResponse = await this.fetchProducts(
                    this.url,
                    signal
                );
                clearTimeout(this.timeoutId);

                console.log(productResponse);
                if (productResponse.error) {
                    showToast(
                        "error",
                        `productResponse Not Fetched: ${productResponse.error}`
                    );
                    return;
                }

                let ProductResponse = productResponse.products;
                this.listAllProducts = ProductResponse;
                if (localStorage.getItem("shoppingCart")) {
                    this.cart = JSON.parse(
                        localStorage.getItem("shoppingCart")
                    );
                }

                console.log(this.listAllProducts);

                this.renderProductCards();
                this.updatelocalStorageData(productResponse.products);
            } catch (err) {
                if ((err.name = "AbortError")) {
                    console.log("Request Aborted due to TimeOut");
                    showToast(
                        "invalid",
                        "Fetched Operation aborted due to TimeOut"
                    );
                    return;
                }
                console.error(`Fetched error Occured: ${err}`);
                showToast("error", `Fetched error Occurred: ${err}`);
            }
        },

        bind() {
            document
                .getElementById("search-Product")
                .addEventListener("input", (event) => {
                    event.preventDefault();
                    const searchValue = event.target.value.trim();
                    // console.log(searchValue);
                    this.useDebouncing(searchValue);
                });

            document
                .getElementById("cartMenu")
                .addEventListener("click", function () {
                    window.location.href = "shoppingCartPage.html";
                });

            this.initializeProductCount();
        },

        init() {
            this.bind();
            this.fetchAndStoreProducts();
        },
    };
    productPage.init();
})();
