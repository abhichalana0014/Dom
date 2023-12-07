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

                let buttonsection = document.createElement("div");
                buttonsection.setAttribute(
                    "class",
                    "flex items-center justify-between"
                );

                let itemPrice = document.createElement("span");
                itemPrice.setAttribute(
                    "class",
                    "text-3xl font-bold text-gray-900 dark:text-white"
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

                detailsection.append(titlelink, buttonsection);
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

        productCount: document.getElementById("productcount"),
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
                    // If not in the cart, add it with a quantity of 1
                    cartData.push({
                        product_id: product_id,
                        quantity: 1,
                        productData: selectedProduct, // Store the product data
                    });
                } else {
                    // If already in the cart, increment the quantity
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
        },

        init() {
            this.bind();
            this.fetchAndStoreProducts();
        },
    };
    productPage.init();
})();
