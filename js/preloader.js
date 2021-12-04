window.addEventListener("load", (e) => {
  const elementPreloaderContainer = document.querySelector(
    "#preloader-container"
  );

  const elementOmitPreloader = document.querySelector("#omit-preloader");

  elementOmitPreloader.addEventListener("click", () => {
    elementPreloaderContainer.classList.add("none");
  });

  setTimeout(() => {
    elementPreloaderContainer.classList.add("none");
  }, 9000);
});
