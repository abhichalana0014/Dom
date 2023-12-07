export const showToast = (type, message) => {
    const toastBox = document.getElementById("toastBox") || createToastBox();

    let toast = document.createElement("div");

    let bgColor, iconColor, iconPath, sliderColor;

    if (type === "success") {
      bgColor = "bg-green-200";
      iconColor = "text-green-500";
      sliderColor = "after:bg-green-400";
      iconPath =
        '<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>';
    } else if (type === "error") {
      bgColor = "bg-red-200";
      iconColor = "text-red-500";
      sliderColor = "after:bg-red-400";
      iconPath =
        '<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>';
    } else if (type === "invalid") {
      bgColor = "bg-orange-200";
      iconColor = "text-orange-500";
      sliderColor = "after:bg-orange-400";
      iconPath =
        '<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>';
    } else {
      bgColor = "bg-green-200";
      iconColor = "text-green-500";
      iconPath =
        '<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>';
    }

    toast.setAttribute(
      "class",
      `w-72 h-auto ${bgColor} font-medium mb-5 shadow-sm flex items-center gap-2 px-4 shadow-xl rounded relative  translate-x-full animate-moveleft after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 ${sliderColor} after:animate-bottomslider`
    );

    toast.innerHTML = `
      <div class="z-50 inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${iconColor} bg-white rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          ${iconPath}
        </svg>
        <span class="sr-only">Check icon</span>
      </div>
      <div class="ml-3 text-sm font-normal">${message}</div>
    `;

    toastBox.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const createToastBox = () => {
    let toastBox = document.createElement("div");
    toastBox.setAttribute(
      "class",
      "fixed top-0 right-5 flex items-end flex-col overflow-hidden p-3"
    );
    toastBox.setAttribute("id", "toastBox");
    document.body.appendChild(toastBox);
    return toastBox;
  };