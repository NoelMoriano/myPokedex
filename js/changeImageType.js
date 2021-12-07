const elementBtnRadio1 = document.querySelector("#btnradio1");
const elementBtnRadio2 = document.querySelector("#btnradio2");

elementBtnRadio1.addEventListener("click", () => {
  onClickCheckedAdd(elementBtnRadio1);
  onClickCheckedRemove(elementBtnRadio2);
  localStorage.setItem("imageType", "2d");
  initialApp();
});

elementBtnRadio2.addEventListener("click", () => {
  onClickCheckedAdd(elementBtnRadio2);
  onClickCheckedRemove(elementBtnRadio1);
  localStorage.setItem("imageType", "3d");
  initialApp();
});

const onClickCheckedAdd = (elementBtnRadio) =>
  elementBtnRadio.setAttribute("checked", true);

const onClickCheckedRemove = (elementBtnRadio) =>
  elementBtnRadio.removeAttribute("checked");
