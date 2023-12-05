import { showToast } from "./alert.js";
(() => {
    "use strict";

    const productPage = {
        title: document.getElementById("js-title"),
        price: document.getElementById("js-price"),
        description: document.getElementById("js-description"),
        imageSlider: document.getElementById("js-imageSlider"),
        thumbnail: document.getElementById("js-thumbnail"),
        apiUrl: "https://dummyjson.com/products",
        params: new URLSearchParams(window.location.search),
        abortController: new AbortController(),
        timeoutId: null,

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

        async productView() {
            try {
                let signal = this.abortController.signal;

                const productId = this.params.get("id");
                console.log(productId);

                let productUrl = `${this.apiUrl}/${productId}`;

                this.timeoutId = setTimeout(() => {
                    this.abortController.abort();
                }, 5000);
                const productResponse = await this.getData(productUrl, signal);
                clearTimeout(this.timeoutId);

                if (productResponse.error) {
                    showToast(
                        "error",
                        `Error to find Product: ${productResponse.error}`
                    );
                    return;
                }

                console.log(productResponse);
                this.setInfo(productResponse);
            } catch (err) {
                if ((err.name = "AbortError")) {
                    showToast(
                        "invalid",
                        "Addnewproduct Operation aborted due to TimeOut"
                    );
                    return;
                }
                showToast("error", `Product error Ocurred: ${err} `);
            }
        },

        async setInfo(item) {
            this.title.innerHTML = item.title;
            this.price.innerHTML = `Rs.${item.price}`;
            this.description.innerHTML = item.description;
            this.thumbnail.src = item.thumbnail;

            item.images.map((image) => {
                console.log(image);

                let image_container = document.createElement("div");
                image_container.className = "w-1/5 p-2 ";

                let imagelink = document.createElement("a");
                imagelink.className =
                    "block border z-50 border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300";

                let productimages = document.createElement("img");
                productimages.className =
                    "object-contain w-full lg:h-20 cursor-pointer";
                productimages.alt = "coverImages";
                productimages.src = image;

                imagelink.appendChild(productimages);
                image_container.appendChild(imagelink);

                this.imageSlider.appendChild(image_container);

                image_container.addEventListener("mouseover", () => {
                    this.thumbnail.src = productimages.src;
                });
            });
        },
    };
    productPage.productView();
})();
