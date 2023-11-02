let storedData = JSON.parse(localStorage.getItem("data")) || [];
  // let mode = parseInt(localStorage.getItem("mode")) || 1;
  const inputForm = document.getElementById("inputForm");
  const tableBody = document.getElementById("tableBody");
  
  inputForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    addValue();
  });
  
  function updateTable(taskList = storedData) {
    tableBody.innerHTML = "";
    taskList.forEach((item, index) => {
      let row = tableBody.insertRow();
      let cell0 = row.insertCell(0);
      let cell1 = row.insertCell(1);
      let cell2 = row.insertCell(2);
  
      let cell2Div1 = document.createElement("div");
      let cell2Div2 = document.createElement("div");
  
  
  
      // cell0.setAttribute(
      //   "class",
      //   "p-2 text-center bg-gray-50 font-semibold border-b"
      // );
  
      cell0.setAttribute("class", "text-center border-2");
      cell1.setAttribute("class", "text-center border-2");
      cell2.setAttribute("class", "flex text-center border justify-between items-center");
  
      cell2Div1.classList.add("w-full","pl-1")
      cell2Div2.classList.add("w-full")
  
  
      cell0.textContent = index + 1;
      cell1.textContent = item.value;
  
      
  
      let deleteButton = document.createElement("button");
      deleteButton.classList.add("border", "bg-gray-200", "rounded", "px-2");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        deleteRow(item.id);
      });
  
      //create a complete/incomplete button
      let completeBtn = document.createElement("button");
  
      completeBtn.classList.add("border", "rounded", "px-2" , "w-full");
      completeBtn.classList.add(item.bgColor);
      completeBtn.textContent =
        item.taskStatus === "Incompleted" ? "Incompleted" : "Completed";
  
      completeBtn.addEventListener("click", function () {
        onChange(item, cell1, completeBtn);
      });
  
      if (item.taskStatus.toLowerCase() === "completed") {
        cell1.classList.add("line-through");
      }
  
      cell2Div1.appendChild(completeBtn)
      cell2Div2.appendChild(deleteButton)
  
      cell2.appendChild(cell2Div1);
      cell2.appendChild(cell2Div2);
    });
    // console.log(taskList);
  }
  
  const addValue = () => {
    let inputValue = document.getElementById("inputValue").value;
  
    if (inputValue) {
      const newItem = {
        id: Date.now(),
        value: inputValue,
        taskStatus: "Incompleted",
        bgColor: "bg-red-200",
      };
      storedData.unshift(newItem);
      saveToLocalStorage();
      updateTable();
      document.getElementById("inputValue").value = "";
    }
  };
  
  const deleteRow = (id) => {
    storedData = storedData.filter((item) => item.id !== id);
    saveToLocalStorage();
    updateTable();
  };
  
  const onChange = (item, cell1, completeBtn) => {
    let action;
    if (item.taskStatus.toLowerCase() === "completed") {
      item.taskStatus = "Incompleted";
      cell1.classList.remove("line-through");
      completeBtn.classList.remove(item.bgColor);
      item.bgColor = "bg-red-200";
      completeBtn.classList.add(item.bgColor);
      action = "Incompleted";
    } else {
      item.taskStatus = "Completed";
      cell1.classList.add("line-through");
      completeBtn.classList.remove(item.bgColor);
      item.bgColor = "bg-green-200";
      completeBtn.classList.add(item.bgColor);
      action = "Completed";
    }
    completeBtn.textContent = action;
    saveToLocalStorage();
  };


  
  const searchfilter = () => {
    let searchValue = document.getElementById("search_bar_js");
    searchValue.addEventListener("input", function () {
      let matchData = storedData.filter((item) =>
      item.value.toLowerCase().startsWith(searchValue.value.trim())
      );
      updateTable(matchData);
      saveToLocalStorage();
      // console.log(matchData)
    });
  };
  
  const filterTasks = () => {
    let filterOptions = document.getElementById("underline_select");
    
    filterOptions.addEventListener("change", function () {
      if (filterOptions.value.toLowerCase() === "all") {
        updateTable(storedData);
      } else if (filterOptions.value.toLowerCase() === "completed") {
        let complete = storedData.filter(
          (item) => item.taskStatus.toLowerCase() === "completed"
          );
          updateTable(complete);
        } else if (filterOptions.value.toLowerCase() === "incompleted"){
          let incomplete = storedData.filter((item)=> item.taskStatus.toLowerCase() === "incomplete")
          updateTable(incomplete)
        }
    });
  };
  
  const filterAndSearch = () => {
    let filterOptions = document.getElementById("underline_select");
    let searchValue = document.getElementById("search_bar_js");

    function applyFilters() {
      let selectedValue = filterOptions.value.toLowerCase();
      let matchData = storedData;

      if (selectedValue !== "all") {
        matchData = storedData.filter(
          (item) => item.taskStatus.toLowerCase() === selectedValue
        );
      }

      if (searchValue.value.trim() !== "") {
        matchData = matchData.filter((item) =>
          item.value.toLowerCase().startsWith(searchValue.value.trim())
        );
      }

      updateTable(matchData);
      saveToLocalStorage();
    }

    filterOptions.addEventListener("change", applyFilters);

    searchValue.addEventListener("input", applyFilters);
  };
  
  const saveToLocalStorage = () => {
    localStorage.setItem("data", JSON.stringify(storedData));
  };
  window.onload = function () {
    updateTable();
    searchfilter();
    filterTasks();
    filterAndSearch();
  };