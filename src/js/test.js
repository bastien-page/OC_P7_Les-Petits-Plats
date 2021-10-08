inputAppareils.addEventListener("input", () => {
  const list = document.querySelectorAll("#dropdownappareil>p");
  if (
    inputAppareils.parentNode.getAttribute("class").includes("showDropdown") ===
    true
  ) {
    if (inputAppareils.value.length > 2) {
      for (let i = 0; i < list.length; i++) {
        if (
          item.innerText
            .toLowerCase()
            .includes(inputAppareils.value.toLowerCase())
        ) {
          selectAppareil.textContent = item.innerText;
        }
      }
    } else {
      selectAppareil.textContent = "";
    }
  } else {
    if (inputAppareils.value.length > 2) {
      for (let i = 0; i < list.length; i++) {
        if (
          item.innerText
            .toLowerCase()
            .includes(inputAppareils.value.toLowerCase())
        ) {
          selectAppareil.textContent = item.innerText;
          inputAppareils.parentNode.classList.add("showSelect");
        }
      }
    } else {
      selectAppareil.textContent = "";
      inputAppareils.parentNode.classList.remove("showSelect");
    }
  }
});
