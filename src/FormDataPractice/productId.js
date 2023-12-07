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
        productId: new URLSearchParams(window.location.search).get("id"),
        abortController: new AbortController(),
        timeoutId: null,
        carts: [],
        cartlist: document.getElementById("cartlist"),
        productCount: document.getElementById("productcount"),

        async addToCart(){

            let productIndexPosition = productPage.carts.findIndex((value)=> value.product_id == productPage.productId)
            if(productPage.carts <= 0){
                productPage.carts = [{
                    product_id : productPage.productId,
                    quantity: 1
                }]
            }
            else if (productIndexPosition < 0 ){
                productPage.carts = [{
                    product_id : productPage.productId,
                    quantity: 1
                }]
            }
            else{
                productPage.carts[productIndexPosition].quantity += 1
            }
            console.log(productPage.carts)
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

        async productView() {
            try {
                let signal = this.abortController.signal;

                console.log(this.productId)

                let productUrl = `${this.apiUrl}/${this.productId}`;

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
        handleCartToggle() {
            const Background = document.getElementById("Background");
            const carthandle = document.getElementById("js-cartTranslate");
            const closeCartButton = document.getElementById("close-btn");
            const cartOverlay = document.getElementById("Background");


            const handleCart = () => {
                Background.classList.toggle("opacity-40");
                Background.classList.toggle("inset-0");
                carthandle.classList.toggle("translate-x-0");
                carthandle.classList.toggle("translate-x-full");
            };

            closeCartButton.addEventListener("click", handleCart);

            cartOverlay.addEventListener("click", (e)=>{
                if(e.target === cartOverlay){
                    handleCart();
                }
            })

            return handleCart;
        },

       

        bind(){
            // handle cart system
            const cartToggle = this.handleCartToggle();
            document
                .getElementById("cartMenu")
                .addEventListener("click", cartToggle);

            // handle add product to cart
            document.getElementById("Add-to-cart-btn").addEventListener("click", this.addToCart)

        },
            


        init(){
            this.productView()
            this.bind()
        },
    };
    productPage.init();
})();
