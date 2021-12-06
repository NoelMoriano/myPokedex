const elementCheckboxTheme = document.querySelector("#checkbox-theme");
const elementIconTheme = document.querySelector("#icon-theme");

elementCheckboxTheme.addEventListener("click", () => {
  if (elementCheckboxTheme.checked === true) {
    document.body.style.background = "url('../images/aqua_maker2.png')";
    document.body.style.color = "#e5e5e5";
    elementIconTheme.src = "./images/moon.png";
  } else {
    document.body.style.background = "rgba(0, 0, 0, 0.02)";
    document.body.style.color = "rgb(94 94 94)";
    elementIconTheme.src = "./images/sun.png";
  }
});
