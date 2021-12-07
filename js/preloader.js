window.addEventListener("load", () => {
  const elementPreloaderContainer = document.querySelector(
    "#preloader-container"
  );

  //change theme
  const theme = localStorage.getItem("theme");

  if (theme) {
    themeDefault(theme);
  } else {
    themeDefault("light");
  }

  // Change image type
  const imageType = localStorage.getItem("imageType");

  if (imageType) {
    imageType === "2d"
      ? elementBtnRadio1.setAttribute("checked", true)
      : elementBtnRadio2.setAttribute("checked", true);
  } else {
    localStorage.setItem("imageType", "3d");
  }

  // onclick omit
  const elementOmitPreloader = document.querySelector("#omit-preloader");

  elementOmitPreloader.addEventListener("click", () => {
    elementPreloaderContainer.classList.add("none");
  });

  setTimeout(() => {
    elementPreloaderContainer.classList.add("none");
  }, 9000);

  window.scrollTo(0, 0);
});
