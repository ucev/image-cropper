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
      this.draw(this.actions.getState());
    });
    this.initCropper(this.actions.getState().options);
    var keyEvents = _keyEvents(this.actions);
    var mouseEvents = _mouseEvents(this.actions);
    window.document.addEventListener("keydown", keyEvents);
    //this.rootElement.addEventListener("keydown", keyEvents);
    this.rootElement.addEventListener("mousedown", mouseEvents);
    this.rootElement.addEventListener("mousemove", mouseEvents);
    this.rootElement.addEventListener("mouseup", mouseEvents);
  }
  clearCropper() {
    return _viewRender.clearCropper.call(this);
  }
  createIcon() {
    return _viewRender.createIcon.call(this);
  }
  draw() {
    return _viewRender.draw.apply(this, arguments);
  }
  drawCovers() {
    return _viewRender.drawCovers.apply(this, arguments);
  }
  drawCropper() {
    return _viewRender.drawCropper.apply(this, arguments);
  }
  drawHandlers() {
    return _viewRender.drawHandlers.apply(this, arguments);
  }
  drawPreview() {
    return _viewRender.drawPreview.apply(this, arguments);
  }
  getElementOffset() {
    return _viewRender.getElementOffset.apply(this, arguments);
  }
  getImage() {
    return _viewRender.getImage.apply(this, arguments);
  }
  getSelectedRect() {
    return _viewRender.getSelectedRect.apply(this, arguments);
  }
  initCropper() {
    return _viewRender.initCropper.apply(this, arguments);
  }
  initCropperStyle() {
    return _viewRender.initCropperStyle.apply(this, arguments);
  }
  photoZoom() {
    return _viewRender.photoZoom.apply(this, arguments);
  }
  photoZoomIn() {
    return _viewRender.photoZoomIn.call(this);
  }
  photoZoomOut() {
    return _viewRender.photoZoomOut.call(this);
  }
  setModeCrop() {
    return _viewRender.setModeCrop.apply(this, arguments);
  }
  setModeMove() {
    return _viewRender.setModeMove.apply(this, arguments);
  }
  toggleMode() {
    return _viewRender.toggleMode.apply(this, arguments);
  }
};

module.exports = ImageCropper;
