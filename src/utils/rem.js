function setRem() {
  let devicewidth = document.documentElement.clientHeight;
  let scale = devicewidth / 1080;
  // let doc = document.querySelectorAll(".shop");
  // doc.forEach((item) => {
  //   item.style.zoom = scale;
  // });
  let doc = document.body
  doc.style.zoom = scale
}

setRem();
window.onresize = function () {
  setRem();
};

export default setRem;
