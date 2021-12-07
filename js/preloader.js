window.addEventListener("load", () => {
  const elementPreloaderContainer = document.querySelector(
    "#preloader-container"
  );

  //change theme
  const theme = localStorage.getItem("theme");

  themeDefault(theme);

  // Change image type
  const imageType = localStorage.getItem("imageType");
  imageType === "2d"
    ? elementBtnRadio1.classList.add("checked")
    : elementBtnRadio2.classList.add("checked");

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
