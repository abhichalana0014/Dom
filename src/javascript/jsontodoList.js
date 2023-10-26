const products = [
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Doe", email: "jane@example.com" },
  { name: "Bob Smith", email: "bob@example.com" },
  { name: "Alice Johnson", email: "alice@example.com" },
  { name: "Michael Davis", email: "michael@example.com" },
  { name: "Sarah Wilson", email: "sarah@example.com" },
  { name: "David Brown", email: "david@example.com" },
  { name: "Jennifer Lee", email: "jennifer@example.com" },
  { name: "James Taylor", email: "james@example.com" },
  { name: "Jessica Evans", email: "jessica@example.com" },
  { name: "Andrew Turner", email: "andrew@example.com" },
  { name: "Michelle Harris", email: "michelle@example.com" },
  { name: "Christopher Martin", email: "christopher@example.com" },
  { name: "Amanda Jackson", email: "amanda@example.com" },
  { name: "Brian Miller", email: "brian@example.com" },
  { name: "Stephanie White", email: "stephanie@example.com" },
  { name: "Kevin Clark", email: "kevin@example.com" },
  { name: "Rebecca Baker", email: "rebecca@example.com" },
  { name: "Jason Turner", email: "jason@example.com" },
  { name: "Laura Davis", email: "laura@example.com" },
  { name: "Matthew Walker", email: "matthew@example.com" },
  { name: "Danielle Green", email: "danielle@example.com" },
  { name: "Ryan Harris", email: "ryan@example.com" },
  { name: "Nicole Anderson", email: "nicole@example.com" },
  { name: "Timothy Wilson", email: "timothy@example.com" },
  { name: "Katherine Harris", email: "katherine@example.com" },
  { name: "Daniel Davis", email: "daniel@example.com" },
  { name: "Kimberly Johnson", email: "kimberly@example.com" },
  { name: "Mark Smith", email: "mark@example.com" },
  { name: "Emily Taylor", email: "emily@example.com" },
  { name: "Paul Turner", email: "paul@example.com" },
];

let searchInput = document.getElementById("js_search_input");
let data = "";
let ul = document.querySelector(".search-results");

const enteredValue = (ev) => {
  let inputValue = ev.target.value.toLowerCase().trim();
  // console.log(input);
  if (inputValue) {
    data = products.filter(function (product) {
      return (
        product.name.toLowerCase().startsWith(inputValue) ||
        product.email.toLowerCase().startsWith(inputValue)
      );
    });
    // console.log("data", data);
    ul.innerHTML = "";
    data.forEach((element) => {
      let dropdown = document.createElement("li");
      let content = document.createTextNode(inputValue.includes("@")? element.email: element.name);
      dropdown.appendChild(content);
      ul.appendChild(dropdown);
    });
    ul.classList.remove("hidden");
  } else {
    ul.classList.add("hidden");
  }
};
searchInput.addEventListener("input", enteredValue);
