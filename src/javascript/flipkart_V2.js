const products = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: {
      rate: 4.1,
      count: 259,
    },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: {
      rate: 4.7,
      count: 500,
    },
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: {
      rate: 2.1,
      count: 430,
    },
  },
  {
    id: 5,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 4.6,
      count: 400,
    },
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave ",
    price: 168,
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 3.9,
      count: 70,
    },
  },
  {
    id: 7,
    title: "White Gold Plated Princess",
    price: 9.99,
    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 3,
      count: 400,
    },
  },
  {
    id: 8,
    title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    price: 10.99,
    description:
      "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 1.9,
      count: 100,
    },
  },
  {
    id: 9,
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    price: 64,
    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: {
      rate: 3.3,
      count: 203,
    },
  },
  {
    id: 10,
    title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109,
    description:
      "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    rating: {
      rate: 2.9,
      count: 470,
    },
  },
  {
    id: 11,
    title:
      "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    price: 109,
    description:
      "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    rating: {
      rate: 4.8,
      count: 319,
    },
  },
  {
    id: 12,
    title:
      "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    price: 114,
    description:
      "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    rating: {
      rate: 4.8,
      count: 400,
    },
  },
  {
    id: 13,
    title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    price: 599,
    description:
      "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    rating: {
      rate: 2.9,
      count: 250,
    },
  },
  {
    id: 14,
    title:
      "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    price: 999.99,
    description:
      "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    rating: {
      rate: 2.2,
      count: 140,
    },
  },
  {
    id: 15,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    description:
      "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    rating: {
      rate: 2.6,
      count: 235,
    },
  },
  {
    id: 16,
    title:
      "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    description:
      "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    rating: {
      rate: 2.9,
      count: 340,
    },
  },
  {
    id: 17,
    title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    price: 39.99,
    description:
      "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    rating: {
      rate: 3.8,
      count: 679,
    },
  },
  {
    id: 18,
    title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
    price: 9.85,
    description:
      "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    rating: {
      rate: 4.7,
      count: 130,
    },
  },
  {
    id: 19,
    title: "Opna Women's Short Sleeve Moisture",
    price: 7.95,
    description:
      "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    rating: {
      rate: 4.5,
      count: 146,
    },
  },
  {
    id: 20,
    title: "DANVOUY Womens T Shirt Casual Cotton Short",
    price: 12.99,
    description:
      "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    rating: {
      rate: 3.6,
      count: 145,
    },
  },
];

// create header
const header = document.createElement("header");
header.classList.add("w-full", "py-3", "bg-blue-600", "dark:bg-black");

// create navbar
const nav = document.createElement("nav");
nav.classList.add("flex", "mx-auto", "max-w-6xl");

//create a div navbar
let navContainer1 = document.createElement("div");
navContainer1.classList.add("flex", "item-center", "gap-8", "w-full");

//create navlogo
let link = document.createElement("a");
link.classList.add("w-36");
link.href = "#";

let navLogo = document.createElement("img");
navLogo.classList.add("w-28");
navLogo.src =
  "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fk-plus_3b0baa.png";
navLogo.alt = "Flipkart";
link.append(navLogo);

//create a form
let form = document.createElement("form");
form.classList.add("w-full");
form.action = "search";

// create a div in form
let formContainer = document.createElement("div");
formContainer.classList.add("relative");

let inputLabel = document.createElement("label");
inputLabel.for = "searchItems";
inputLabel.classList.add("hidden");
inputLabel.textContent = "Search Items";
formContainer.appendChild(inputLabel);

//create span in div
let span = document.createElement("span");
span.setAttribute("class", "absolute inset-y-0 right-0 flex items-center pr-2");

//create button in span
let spanbtn = document.createElement("button");
spanbtn.type = "submit";
spanbtn.classList.add("p-1", "focus:outline-none", "focus:shadow-outline");
spanbtn.innerHTML = `<svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" ><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`;
span.appendChild(spanbtn);
formContainer.appendChild(span);

//create input in div

let inputAttributes = {
  tag: "input",
  attributes: {
    type: "text",
    id: "js_search_input",
    placeholder: "Search products",
    className : "w-full py-2 text-sm text-white bg-white rounded pl-2 focus:outline-none focus:bg-white focus:text-gray-900"
  },
};
let input = document.createElement(inputAttributes.tag);
Object.assign(input, inputAttributes.attributes);

//create ul for search element list
let ul = document.createElement("ul");
ul.setAttribute(
  "class",
  "search-results absolute left-0 mt-8 w-full bg-white shadow-lg rounded-b-md hidden"
);
formContainer.appendChild(ul);
formContainer.appendChild(input);
form.appendChild(formContainer);
navContainer1.appendChild(link);
navContainer1.appendChild(form);

// create a navcontainer2

let navcontainer2 = document.createElement("div");
navcontainer2.setAttribute(
  "class",
  "flex gap-4 items-center w-full text-center px-4"
);

let a1 = document.createElement("a");
let a2 = document.createElement("a");
let a3 = document.createElement("a");
let span1 = document.createElement("span");
let span2 = document.createElement("span");
let span3 = document.createElement("span");

a1.setAttribute("class", "flex items-center text-base font-mono text-white gap-2 pl-8 pr-4")
a2.setAttribute("class", "flex items-center text-base font-mono text-white gap-2 px-4")
a3.setAttribute("class", "flex items-center text-base font-mono text-white gap-2 px-4")

a1.href = "#"
a2.href = "#"
a3.href = "#"

a1.innerHTML = `<svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
<path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"></path>
</svg>`;
a2.innerHTML = `<svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path></svg>`
a3.innerHTML = `<svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6 6 L30 6 27 19 9 19 M27 23 L10 23 5 2 2 2"></path><circle cx="25" cy="27" r="2"></circle><circle cx="12" cy="27" r="2"></circle></svg>`

span1.textContent = "Become a Seller"
span2.textContent = "Login"
span3.textContent = "Cart"

a1.appendChild(span1);
a2.appendChild(span2);
a3.appendChild(span3);

navcontainer2.appendChild(a1);
navcontainer2.appendChild(a2);
navcontainer2.appendChild(a3);


let togglebtn = document.createElement("button");
togglebtn.classList.add("px-2",
"py-1",
"text-white",
"bg-gray-800",
"rounded",
"border",
"border-gray-900",
"dark:bg-white",
"dark:text-black");
togglebtn.textContent = "Darkmode";

navcontainer2.appendChild(togglebtn);

nav.appendChild(navContainer1);
nav.appendChild(navcontainer2);
header.appendChild(nav);

document.body.appendChild(header);

const enteredValue = (ev) => {
  let data = "";
  let ul = document.querySelector(".search-results");
  let inputValue = ev.target.value.toLowerCase().trim();
  // console.log(input);
  if (inputValue) {
    data = products.filter(function (product) {
      return product.title.toLowerCase().startsWith(inputValue);
    });
    // console.log("data", data);
    ul.innerHTML = "";
    data.forEach((element) => {
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.setAttribute("href", "#");
      a.setAttribute("class", "flex items-center gap-4 p-1");

      let image = document.createElement("img");
      image.setAttribute("src", element.image);
      image.setAttribute("alt", element.title);
      image.setAttribute("class", "w-10 pl-2");

      let span = document.createElement("span");
      let spanContent = document.createTextNode(element.title);
      span.appendChild(spanContent);

      a.appendChild(image);
      a.appendChild(span);

      li.appendChild(a);

      ul.appendChild(li);
    });
    ul.classList.remove("hidden");
  } else {
    ul.classList.add("hidden");
  }
};
const handleClickOutside = () => {
  ul.classList.add("hidden");
  document.getElementById("js_search_input").value = ""
};

document
  .getElementById("js_search_input")
  .addEventListener("input", enteredValue);

document.addEventListener("click", handleClickOutside);

let mode = 1;
const darkMode = () => {
  let html = document.getElementById("js_dark");

  togglebtn.innerHTML = mode ? "Lightmode" : "Darkmode";
  html.setAttribute("class", mode ? "dark" : "");
  mode = mode ? 0 : 1;
};
let body = document.body;
body.classList.add("dark:bg-slate-800")

togglebtn.addEventListener("click", darkMode);


// main body part start
document.addEventListener("DOMContentLoaded", function() {
  
const tabelObj = {
  tableInput: document.getElementById("input_js"),
  tabelbody: document.getElementById("tbody_js"),

  addInput: function () {
    if (this.tableInput.value.trim()) {
      // create tbody and append in tabel
      // let tabelbody = document.createElement("tbody");
      // this.tabelContainer.appendChild(tabelbody);

      let tabelrow = document.createElement("tr");
      this.tabelbody.appendChild(tabelrow);

      let tabelCell1 = document.createElement("td");
      tabelCell1.setAttribute("class","p-2 text-center bg-gray-50 font-semibold border-b")
      tabelrow.appendChild(tabelCell1);
      
      // insert the value of input in cell1
      tabelCell1.innerHTML = this.tableInput.value;

      let tabelCell2 = document.createElement("td");
      tabelCell2.classList.add("border", "text-center", "space-x-5","bg-gray-100");
      tabelrow.appendChild(tabelCell2);
      

      //now create complete button in cell2
      let completeBtn = document.createElement("button");

      completeBtn.setAttribute("class" , "border rounded px-2");
      completeBtn.textContent = "completed";

      tabelCell2.appendChild(completeBtn);

      //now create delete button in cell2
      let deleteBtn = document.createElement("button");
      deleteBtn.classList.add("border", "bg-gray-200", "rounded", "px-2");
      deleteBtn.textContent = "delete";

      tabelCell2.appendChild(deleteBtn);

      deleteBtn.addEventListener("click", function () {
        tabelbody.removeChild(tabelrow);
      });

      let mode = 1;
      const onChange = () => {
        tabelCell1.setAttribute("class", mode ? "line-through p-2 text-center bg-gray-50 font-semibold border-b" : "p-2 text-center bg-gray-50 font-semibold border-b")
        completeBtn.innerHTML = mode ? "incompleted" : "completed";
        completeBtn.setAttribute("class", mode? "border rounded bg-red-300 px-2": "border rounded bg-green-300 px-2")
        mode = mode ? 0 : 1;
      };

      completeBtn.addEventListener("click", onChange);

      this.tableInput.value = "";
    }
  },
};

document.querySelector("#select_btn").addEventListener("click", function (event) {
  event.preventDefault();
  tabelObj.addInput.bind(tabelObj)();
});
});




