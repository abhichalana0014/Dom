import { showToast } from "../FormDataPractice/alert.js";

// import { showToast } from "../FormDataPractice/alert";
(() => {
    "use strict";

    const weatherApi = {
        url: "https://weatherapi-com.p.rapidapi.com/forecast.json?q=London&days=3",
        productCard: document.getElementById("product-card"),
        abortController: new AbortController(),

        getLocalStorageData: function () {
            return JSON.parse(localStorage.getItem("weatherApi")) || [];
        },

        updatelocalStorageData: function (data) {
            localStorage.setItem("weatherApi", JSON.stringify(data));
        },

        async getData(url, options) {
            try {
                let response = await fetch(url, options);
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

        async renderProductCards(data) {
            let products = data ? data : this.getLocalStorageData();
            
            console.log(products);

            // this.productCard.innerHTML = "";

            
            
                this.productCard.innerHTML += `
                <li class="w-full max-w-sm flex gap-4 rounded">
                    <div class="max-w-sm mx-auto mt-8 bg-white rounded-md overflow-hidden shadow-md">
                        <div class="p-6">
                            <h2 class="text-xl font-semibold text-gray-800">${products.location.name}, ${products.location.country}</h2>
                            <p class="text-gray-600"><strong>Region:</strong> ${products.location.region}</p>
                            <p class="text-gray-600"><strong>Latitude:</strong> 51.52</p>
                            <p class="text-gray-600"><strong>Longitude:</strong> -0.11</p>
                            <p class="text-gray-600"><strong>Timezone:</strong> Europe/London</p>
                            <p class="text-gray-600"><strong>Local Time:</strong> 2023-12-05 11:28</p>
                        </div>
                    </div>
                </li>
            `;
        },

        async fetchAndStoreData() {
            try {
                const options = {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key":
                            "613525450bmshd925704d6df50f5p1940ffjsn62d038c05e64",
                        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
                        signal : this.abortController.signal,
                    },
                };

                this.timeoutId = setTimeout(() => {
                    this.abortController.abort();
                }, 5000);

                const productResponse = await this.getData(this.url, options);
                clearTimeout(this.timeoutId);

                console.log(productResponse);
                if (productResponse.error) {
                    (
                       console.log( `productResponse Not Fetched: ${productResponse.error}`)
                       
                    );
                    return;
                }

                let ProductResponse = productResponse;
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

                console.log( `Fetched error Occurred: ${err}`);
            }
        },
    };

    weatherApi.fetchAndStoreData();
})();
