import { showToast } from "./alert.js";
(() => {
    "use strict";
    let allimages = [];
    let thumbnailUrl;
    const productManager = {
        apiUrl: "https://dummyjson.com/products",
        abortController: new AbortController(),
        timeoutId: null,
        debounceTimeoutId: null,
        productCard: document.getElementById("product-card"),

        getLocalStorageData: function () {
            return JSON.parse(localStorage.getItem("products")) || [];
        },

        updatelocalStorageData: function (data) {
            localStorage.setItem(
                "products",
                JSON.stringify(data)
            );
        },

        async getData(url, signal) {
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

        async postData(url, item, signal) {
            try {
                let response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify(item),
                    signal,
                });

                if (!response.ok) {
                    return {
                        error: `Failed to POST Data. Status : ${response.status}`,
                        data: null,
                    };
                }
                const data = await response.json();
                return data;
            } catch (error) {
                showToast("error", `Error posting Data ${error}`);
            }
        },

        async renderProductCards(data) {
            let products = data ? data : this.getLocalStorageData();
            console.log(products);

            this.productCard.innerHTML = "";

            await products.map((item) => {
                this.productCard.innerHTML += `
                <li class="w-full max-w-sm flex gap-4 rounded">
                    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div class="h-48 w-full">
                            <a href="http://127.0.0.1:5500/src/FormDataPractice/productId.html?id=${item.id}">
                                <img class="w-full h-full object-cover rounded-t-lg" src="${item.thumbnail}" alt="product image" />
                            </a>    
                        </div>
                        <div class="px-4 pb-5 mt-2.5">
                            <a href="http://127.0.0.1:5500/src/FormDataPractice/productId.html?id=${item.id}">
                                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${item.title}</h5>
                            </a>
                            <div class="flex items-center mt-2.5 mb-5">
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
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-3xl font-bold text-gray-900 dark:text-white">₹${item.price}</span>
                                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> Add to cart</button>
                            </div>
                            
                        </div>
                    </div>
                </li>
            `;
            });
        },

        async fetchAndStoreData() {
            try {
                let signal = this.abortController.signal;

                this.timeoutId = setTimeout(() => {
                    this.abortController.abort();
                }, 5000);

                const productResponse = await this.getData(this.apiUrl, signal);
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
                console.log(ProductResponse);
                this.updatelocalStorageData(ProductResponse);

                this.renderProductCards(ProductResponse);
            } catch (err) {
                if ((err.name = "AbortError")) {
                    showToast(
                        "invalid",
                        "Fetched Operation aborted due to TimeOut"
                    );
                    return;
                }

                showToast("error", `Fetched error Occurred: ${err}`);
            }
        },

        readFile: function () {
            document.getElementById("images").addEventListener("change", function() {
                let files = this.files;
                allimages = [];

                for (let i = 0; i < files.length; i++) {
                    // return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        console.log(reader);

                        reader.onload = function (e) {
                            allimages.push(e.target.result);
                        };

                        // reader.onerror = function (error) {
                        //     reject(error);
                        // };

                        reader.readAsDataURL(files[i]);
                    // });
                }
            });

            document
                .getElementById("thumbnail")
                .addEventListener("change", function () {

                    let file = this.files[0];
                    console.log(file)
                    // return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        console.log(reader);

                        reader.onload = function (e) {
                             thumbnailUrl = e.target.result
                            // resolve(thumbnailUrl)
                        };

                        // reader.onerror = function (error) {
                        //     reject(error);
                        // };

                        reader.readAsDataURL(file);
                    // });
                });
        },

        async addNewProduct() {
            try {
                let signal = this.abortController.signal;

                let apiAddUrl = `${this.apiUrl}/add`;

                this.timeoutId = setTimeout(() => {
                    this.abortController.abort();
                }, 5000);

                // Create a formData to create a new product;

                const formData = new FormData(
                    document.getElementById("AddProductForm")
                );

                let formObject = Object.fromEntries(formData);

                formObject.thumbnail = thumbnailUrl;
                formObject.images = allimages;

                let postDataResponse = await this.postData(
                    apiAddUrl,
                    formObject,
                    signal
                );

                clearTimeout(this.timeoutId);
                console.log(postDataResponse);
                if (postDataResponse.error) {
                    showToast(
                        "error",
                        `Error to POST data: ${postDataResponse.error}`
                    );
                    return;
                }

                let ProductResponse = this.getLocalStorageData();

                ProductResponse.push(postDataResponse);
                console.log(ProductResponse);

                this.updatelocalStorageData(ProductResponse);

                this.renderProductCards(ProductResponse);
            } catch (err) {
                if ((err.name = "AbortError")) {
                    showToast(
                        "invalid",
                        "Addnewproduct Operation aborted due to TimeOut"
                    );
                    return;
                }
                showToast("error", `AddnewProduct error Ocurred: ${err} `);
            }
        },

        handleToggle() {
            const modal = document.getElementById("crud-modal");
            const closeButton = document.querySelector(
                '[data-modal-toggle="crud-modal"]'
            );
            const modalOverlay = document.getElementById("crud-modal");

            const toggleModal = () => {
                modal.classList.toggle("hidden");
                modal.classList.add("flex", "bg-gray-500/80");
            };

            closeButton.addEventListener("click", toggleModal);

            modalOverlay.addEventListener("click", (event) => {
                if (event.target === modalOverlay) {
                    toggleModal();
                }
            });

            return toggleModal;
        },
        bind() {
            this.readFile();
            document
                .getElementById("search_bar_js")
                .addEventListener("input", (event) => {
                    const searchValue = event.target.value.trim();
                    // console.log(searchValue);
                    this.useDebouncing(searchValue);
                });

            document
                .getElementById("hamburger")
                .addEventListener("click", function () {
                    var sidebar = document.getElementById("sidebar");
                    sidebar.classList.toggle("-translate-x-full");
                    sidebar.classList.toggle("translate-x-0");
                });

            const toggleModal = this.handleToggle();
            document
                .querySelector("[data-AddNewData]")
                .addEventListener("click", toggleModal);

            document
                .getElementById("AddProductForm")
                .addEventListener("submit", (e) => {
                    e.preventDefault();
                    this.addNewProduct();
                });

            document
                .getElementById("submit-btn")
                .addEventListener("click", () => {
                    const modal = document.getElementById("crud-modal");

                    modal.classList.add("hidden");
                });
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
                if (searchValue === "") {
                }
                let searchUrl = `${this.apiUrl}/search?q=${searchValue}`;
                console.log(searchUrl);

                this.timeoutId = setTimeout(() => {
                    this.abortController.abort();
                }, 5000);

                let searchResponse = await this.getData(searchUrl, signal);
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

        init() {
            this.fetchAndStoreData();
            // this.addNewProduct();
            this.bind();
        },
    };

    productManager.init();
})();
