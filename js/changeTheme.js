const elementCheckboxTheme = document.querySelector("#checkbox-theme");
const elementIconTheme = document.querySelector("#icon-theme");

elementCheckboxTheme.addEventListener("click", () => {
  if (elementCheckboxTheme.checked === true) {
    localStorage.setItem("theme", "dark");
    themeDefault("dark");
  } else {
    localStorage.setItem("theme", "light");
    themeDefault("light");
  }
});
