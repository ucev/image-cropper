//const actions = require('./state/action');



exports.keyEvents = function (actions) {
  return function (e) {
    console.log("key event");
    console.log(e);
    switch (e.keyCode) {
      case 27: // ESC
        actions.clearCropper();
        break;
      default:
        break;
    }
  }
};

exports.mouseEvents = function (actions) {
  /**
   * 没有考虑 触摸板 或 触摸屏 的情况
   * 仅仅是鼠标点击事件
   */
  return function mouseEvents(e) {
    console.log("click");
    var pageXOffset = window.pageXOffset,
      pageYOffset = window.pageYOffset;
    var x = e.clientX + pageXOffset,
      y = e.clientY + pageYOffset;
    switch (e.type) {
      case "mousedown":
        actions.cropperBorderStart(x, y);
        break;
      case "mouseup":
        actions.cropperBorderEnd();
        break;
      case "mousemove":
        actions.cropperBorderMove(x, y);
        break;
      default:
        break;
    }
    e.preventDefault();
  };
}
