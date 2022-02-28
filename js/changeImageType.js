const elementBtnRadio1 = document.querySelector("#btnradio1");
const elementBtnRadio2 = document.querySelector("#btnradio2");
const elementBtnRadio3 = document.querySelector("#btnradio3");
const elementBtnRadio4 = document.querySelector("#btnradio4");

elementBtnRadio1.addEventListener("click", () => {
  onClickCheckedAdd(elementBtnRadio1);
  localStorage.setItem("imageType", "tipo1");
  [elementBtnRadio2, elementBtnRadio3, elementBtnRadio4].forEach((element) =>
    onClickCheckedRemove(element)
  );
  initialApp();
});

elementBtnRadio2.addEventListener("click", () => {
  onClickCheckedAdd(elementBtnRadio2);
  localStorage.setItem("imageType", "tipo2");
  [elementBtnRadio1, elementBtnRadio3, elementBtnRadio4].forEach((element) =>
    onClickCheckedRemove(element)
  );
  initialApp();
});

elementBtnRadio3.addEventListener("click", () => {
  onClickCheckedAdd(elementBtnRadio3);
  localStorage.setItem("imageType", "tipo3");
  [elementBtnRadio1, elementBtnRadio2, elementBtnRadio4].forEach((element) =>
    onClickCheckedRemove(element)
  );
  initialApp();
});

elementBtnRadio4.addEventListener("click", () => {
  onClickCheckedAdd(elementBtnRadio4);
  localStorage.setItem("imageType", "tipo4");
  [elementBtnRadio1, elementBtnRadio2, elementBtnRadio3].forEach((element) =>
    onClickCheckedRemove(element)
  );
  initialApp();
});

const onClickCheckedAdd = (elementBtnRadio) =>
  elementBtnRadio.setAttribute("checked", true);

const onClickCheckedRemove = (elementBtnRadio) =>
  elementBtnRadio.removeAttribute("checked", false);
