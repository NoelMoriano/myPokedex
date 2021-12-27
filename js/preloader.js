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
    if (imageType === "2d") {
      elementBtnRadio1.setAttribute("checked", true);
      elementBtnRadio2.removeAttribute("checked");
    } else {
      elementBtnRadio2.setAttribute("checked", true);
      elementBtnRadio1.removeAttribute("checked");
    }
  } else {
    localStorage.setItem("imageType", "3d");
    elementBtnRadio1.removeAttribute("checked");
    elementBtnRadio2.setAttribute("checked", true);
  }

  // onclick omit
  const elementOmitPreloader = document.querySelector("#omit-preloader");

  elementOmitPreloader.addEventListener("click", () => {
    elementPreloaderContainer.classList.add("none");
    window.scrollTo(0, 0);
  });

  setTimeout(() => {
    elementPreloaderContainer.classList.add("none");
    window.scrollTo(0, 0);
  }, 9000);
});
