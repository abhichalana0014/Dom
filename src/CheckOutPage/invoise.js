(() => {
    "use strict";

    const invoiceDetails = {
        date: document.getElementById("js-date"),
        orderId: document.getElementById("js-orderid"),
        billHeading: document.getElementById("js-bill-heading"),
        name: document.getElementById("js-name"),
        address: document.getElementById("js-address"),
        postalcode: document.getElementById("js-city-state-zipcode"),
        phone: document.getElementById("js-phone"),
        productlist: document.getElementById("product-list"),
        subtotal: document.getElementById("subtotalAmount"),

        getPaymentResponse() {
            return JSON.parse(localStorage.getItem("paymentResponse")) || [];
        },

        async render() {
            let item = this.getPaymentResponse();
            this.productlist.innerHTML = "";

            item.orderproducts.map((_item) => {
                console.log(_item)
                this.productlist.innerHTML += `
                <li class="flex py-6">
                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img src="${_item.productData.thumbnail}" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." class="h-full w-full object-cover object-center">
                </div>

                <div class="ml-4 flex flex-1 flex-col">
                  <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href="#">${_item.productData.title}</a>
                      </h3>
                      <p class="ml-4">₹ ${_item.productData.price}</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">Salmon</p>
                  </div>
                  
                </div>
              </li>
                `;
            });
        },

        orderDetails() {
            let item = this.getPaymentResponse();
            console.log(item);
            this.date.innerHTML = `Date: ${new Date(item.date).toDateString()}`;
            this.orderId.innerHTML = `OrderId: ${item.response.razorpay_order_id}`;
            this.name.innerHTML = item.formObject.firstName;
            this.address.innerHTML = item.formObject.address;
            this.postalcode.innerHTML = `${item.formObject.city},${item.formObject.state},${item.formObject.zipCode}`;
            this.phone.innerHTML = item.formObject.phone;
            this.subtotal.innerHTML = `₹ ${item.subtotal}`
        },

        bind() {
            this.render(), this.orderDetails();
        },

        init() {
            this.bind();
        },
    };
    invoiceDetails.init();
})();
