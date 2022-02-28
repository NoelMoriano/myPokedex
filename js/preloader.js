window.addEventListener("load", () => {
  const elementPreloaderContainer = document.querySelector(
    "#preloader-container"
  );

  if (localStorage.getItem("preloader") >= 2) {
    elementPreloaderContainer.classList.add("none");
    window.scrollTo(0, 0);
  }

  //change theme
  const theme = localStorage.getItem("theme");

  if (theme) {
    themeDefault(theme);
  } else {
    themeDefault("light");
  }

  // Change image type
  switch (localStorage.getItem("imageType")) {
    case "tipo1":
      {
        elementBtnRadio1.setAttribute("checked", true);
        [elementBtnRadio2, elementBtnRadio3, elementBtnRadio4].forEach(
          (element) => element.removeAttribute("checked", false)
        );
      }
      break;
    case "tipo2":
      {
        elementBtnRadio2.setAttribute("checked", true);
        [elementBtnRadio1, elementBtnRadio3, elementBtnRadio4].forEach(
          (element) => element.removeAttribute("checked", false)
        );
      }
      break;
    case "tipo3":
      {
        elementBtnRadio3.setAttribute("checked", true);
        [elementBtnRadio1, elementBtnRadio2, elementBtnRadio4].forEach(
          (element) => element.removeAttribute("checked", false)
        );
      }
      break;
    case "tipo4":
      {
        elementBtnRadio4.setAttribute("checked", true);
        [elementBtnRadio1, elementBtnRadio2, elementBtnRadio3].forEach(
          (element) => element.removeAttribute("checked", false)
        );
      }
      break;
    default: {
      localStorage.setItem("imageType", "tipo4");
      elementBtnRadio4.setAttribute("checked", true);

      [elementBtnRadio1, elementBtnRadio2, elementBtnRadio3].forEach(
        (element) => element.removeAttribute("checked", false)
      );
    }
  }

  localStorage.setItem(
    "preloader",
    (+localStorage.getItem("preloader") || 0) + 1
  );

  // onclick omit
  const elementOmitPreloader = document.querySelector("#omit-preloader");

  elementOmitPreloader.addEventListener("click", () => {
    elementPreloaderContainer.classList.add("none");
    window.scrollTo(0, 0);
  });

  setTimeout(() => {
    elementPreloaderContainer.classList.add("none");
  }, 9000);
});
