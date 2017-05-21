const Actions = require('./state/action');

const _viewRender = require('./render');

const _events = require('./events');
const _keyEvents = _events.keyEvents;
const _mouseEvents = _events.mouseEvents;

class ImageCropper {
  constructor(options) {
    this.actions = new Actions();
    this.actions.setOptions(options);
    this.actions.subscribe(() => {
      this.draw();
    }); 
    var curState = this.actions.getState();
    this.initCropper(curState.options);
    window.addEventListener("resize", () => {
      this.onresize();
    })
    var keyEvents = _keyEvents(this.actions);
    var mouseEvents = _mouseEvents(this.actions);
    window.document.addEventListener("keydown", keyEvents);
    this.rootElement.addEventListener("mousedown", mouseEvents);
    this.rootElement.addEventListener("mousemove", mouseEvents);
    this.rootElement.addEventListener("mouseup", mouseEvents);
  }
};

Object.assign(ImageCropper.prototype, _viewRender);

module.exports = ImageCropper;
