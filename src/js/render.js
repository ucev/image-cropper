var actions = undefined;

var rootElement = undefined,
  containerElement = undefined,
  toolbarElement = undefined,
  containerElementStyle = undefined,
  sourceImage = undefined,
  previewCanvas = undefined,
  previewContext = undefined;
var srcImageWidth, srcImageHeight,
  previewCanvasWidth, previewCanvasHeight;
var handlerTopLeft, handlerTopCenter, handlerTopRight, handlerRightCenter,
  handlerBottomRight, handlerBottomCenter, handlerBottomLeft, handlerLeftCenter;
var coverTopLeft, coverTopCenter, coverTopRight, coverRightCenter,
  coverBottomRight, coverBottomCenter, coverBottomLeft, coverLeftCenter, coverCenterCenter;

var toolbarButtons = {
  movePhoto: {
    name: "移动图片",
    className: "fa fa-arrows",
    action: setModeMove,
  },
  crop: {
    name: "剪裁",
    className: "fa fa-crop",
    action: setModeCrop,
  },
  zoomOut: {
    name: "放大",
    className: "fa fa-search-plus",
    action: photoZoomOut,
  },
  zoomIn: {
    name: "缩小",
    className: "fa fa-search-minus",
    action: photoZoomIn
  },
};

function createIcon(options) {
  var ele = document.createElement("a");
  ele.className = options.className;
  if (typeof options.action == "function") {
    var that = this;
    ele.addEventListener("click", function(e) {
      options.action.call(that);
      e.stopPropagation();
    });
    ele.addEventListener("mousedown", (e) => {e.stopPropagation();});
    ele.addEventListener("mouseup", (e) => {e.stopPropagation();});
    ele.addEventListener("mousemove", (e) => {e.stopPropagation();});
  }
  return ele;
}

function getElementOffset(ele) {
  var offsetLeft = 0, offsetTop = 0;
  while (ele) {
    offsetLeft += ele.offsetLeft;
    offsetTop += ele.offsetTop;
    ele = ele.offsetParent;
  }
  return { left: offsetLeft, top: offsetTop };
}

function toggleMode(mode, extras = {}) {
  this.actions.toggleMode(mode, extras);
}

function setModeCrop() {
  this.toggleMode("crop");
}

function setModeMove() {
  var img = this.containerElement.firstChild;
  var s = getComputedStyle(img);
  var top = parseInt(s.top);
  var left = parseInt(s.left);
  this.toggleMode("move", { top: top, left: left });
}

function photoZoom(percent) {
  var ele = this.containerElement.firstChild;
  var cs = getComputedStyle(this.containerElement);
  var cw = parseInt(cs.width);
  var ch = parseInt(cs.height);
  var es = getComputedStyle(ele);
  var ew = parseInt(es.width);
  var eh = parseInt(es.height);
  var ept = parseInt(es.top);
  var epl = parseInt(es.left);
  var cx = -epl + cw / 2;
  var cy = -ept + ch / 2;
  var newW = ew + cw * percent;
  var newH = eh + ch * percent;
  if (newW <= 20 || newH <= 20) {
    return;
  }
  var newL = newW * (cx / ew) - cw / 2;
  var newT = newH * (cy / eh) - ch / 2;
  ele.style.width = newW + "px";
  ele.style.height = newH + "px";
  ele.style.left = -newL + "px";
  ele.style.top = -newT + "px";
}

function photoZoomOut() {
  this.photoZoom(0.1);
}

function photoZoomIn() {
  this.photoZoom(-0.1);
}

function getSelectedRect(state) {
  state = state || this.actions.getState();
  var s = getComputedStyle(this.containerElement.firstChild);
  var offset = getElementOffset(this.containerElement);
  var tWidth = parseInt(s.width);
  var tHeight = parseInt(s.height);
  var tTop = parseInt(s.top);
  var tLeft = parseInt(s.left);
  var sX = Math.min(state.cropperStartX, state.cropperEndX) - offset.left,
    sY = Math.min(state.cropperStartY, state.cropperEndY) - offset.top,
    eX = Math.max(state.cropperStartX, state.cropperEndX) - offset.left,
    eY = Math.max(state.cropperStartY, state.cropperEndY) - offset.top;
  var ratioX = this.srcImageWidth / tWidth,
    ratioY = this.srcImageHeight / tHeight;
  var srcX = (-tLeft + sX) * ratioX,
    srcY = (-tTop + sY) * ratioY,
    srcWidth = (eX - sX) * ratioX,
    srcHeight = (eY - sY) * ratioY;
  return {x: srcX, y: srcY, width: srcWidth, height: srcHeight};
}

function getImage(type = "image/png") {
  var {x: srcX, y: srcY, width: srcWidth, height: srcHeight} = this.getSelectedRect();
  if (srcWidth <= 10 || srcHeight <= 10) return;
  var canvas = document.createElement("canvas");
  canvas.setAttribute("width", srcWidth);
  canvas.setAttribute("height", srcHeight);
  var ctx = canvas.getContext("2d");
  ctx.drawImage(sourceImage, srcX, srcY, srcWidth, srcHeight, 0, 0, srcWidth, srcHeight);
  return canvas.toDataURL(type);
}

function drawPreview(state) {
  if (!this.previewContext) return;
  var {x: srcX, y: srcY, width: srcWidth, height: srcHeight} = this.getSelectedRect(state);
  if (srcWidth <= 10 || srcHeight <= 10) return;
  // 
  var dx, dy, dWidth, dHeight;
  // 横向画满
  if (this.previewCanvasWidth / srcWidth * srcHeight <= this.previewCanvasHeight) {
    dWidth = this.previewCanvasWidth;
    dHeight = this.previewCanvasWidth / srcWidth * srcHeight;
    dx = 0;
    dy = (this.previewCanvasHeight - dHeight) / 2;
  } else {
    dWidth = this.previewCanvasHeight / srcHeight * srcWidth;
    dHeight = this.previewCanvasHeight;
    dx = (this.previewCanvasWidth - dWidth) / 2;
    dy = 0;
  }
  this.previewContext.clearRect(0, 0, this.previewCanvasWidth, this.previewCanvasHeight);
  this.previewContext.drawImage(this.sourceImage, srcX, srcY, srcWidth, srcHeight, dx, dy, dWidth, dHeight);
}

function getComputedStyle(ele) {
  return ele.ownerDocument.defaultView.getComputedStyle(ele);
}

function setCropperCoverStyle(cover, top, left, width, height) {
  cover.style.top = top + "px";
  cover.style.left = left + "px";
  cover.style.width = width + "px";
  cover.style.height = height + "px";
  cover.style.display = "block";
}

function setCropperHandlerStyle(handler, top, left) {
  handler.style.top = top + "px";
  handler.style.left = left + "px";
  handler.style.display = "block";
}

function setCropperBorderStyle(border, top, left, width, height) {
  border.style.top = top + "px";
  border.style.left = left + "px";
  if (width) {
    border.style.width = width + "px";
  }
  if (height) {
    border.style.height = height + "px";
  }
  border.style.display = "block";
}

function drawHandlers(startX, startY, endX, endY) {
  if (!this.handlerTopLeft) {
    this.handlerTopLeft = document.createElement("span");
    this.handlerTopLeft.className = "cropper-handler cropper-handler-top-left";
    this.containerElement.appendChild(this.handlerTopLeft);
  }
  if (!this.handlerTopCenter) {
    this.handlerTopCenter = document.createElement("span");
    this.handlerTopCenter.className = "cropper-handler cropper-handler-top-center";
    this.containerElement.appendChild(this.handlerTopCenter);
  }
  if (!this.handlerTopRight) {
    this.handlerTopRight = document.createElement("span");
    this.handlerTopRight.className = "cropper-handler cropper-handler-top-right";
    this.containerElement.appendChild(this.handlerTopRight);
  }
  if (!this.handlerRightCenter) {
    this.handlerRightCenter = document.createElement("span");
    this.handlerRightCenter.className = "cropper-handler cropper-handler-right-center";
    this.containerElement.appendChild(this.handlerRightCenter);
  }
  if (!this.handlerBottomRight) {
    this.handlerBottomRight = document.createElement("span");
    this.handlerBottomRight.className = "cropper-handler cropper-handler-bottom-right";
    this.containerElement.appendChild(this.handlerBottomRight);
  }
  if (!this.handlerBottomCenter) {
    this.handlerBottomCenter = document.createElement("span");
    this.handlerBottomCenter.className = "cropper-handler cropper-handler-bottom-center";
    this.containerElement.appendChild(this.handlerBottomCenter);
  }
  if (!this.handlerBottomLeft) {
    this.handlerBottomLeft = document.createElement("span");
    this.handlerBottomLeft.className = "cropper-handler cropper-handler-bottom-left";
    this.containerElement.appendChild(this.handlerBottomLeft);
  }
  if (!this.handlerLeftCenter) {
    this.handlerLeftCenter = document.createElement("span");
    this.handlerLeftCenter.className = "cropper-handler cropper-handler-left-center";
    this.containerElement.appendChild(this.handlerLeftCenter);
  }
  setCropperHandlerStyle(this.handlerTopLeft, startY - 2, startX - 2);
  setCropperHandlerStyle(this.handlerTopCenter, startY - 2, (startX + endX) / 2);
  setCropperHandlerStyle(this.handlerTopRight, startY - 2, endX - 4);
  setCropperHandlerStyle(this.handlerRightCenter, (startY + endY) / 2, endX - 4);
  setCropperHandlerStyle(this.handlerBottomRight, endY - 4, endX - 4);
  setCropperHandlerStyle(this.handlerBottomCenter, endY - 4, (startX + endX) / 2);
  setCropperHandlerStyle(this.handlerBottomLeft, endY - 4, startX - 2);
  setCropperHandlerStyle(this.handlerLeftCenter, (startY + endY) / 2, startX - 2);
}

function drawCovers(startX, startY, endX, endY) {
  if (!this.coverTopLeft) {
    this.coverTopLeft = document.createElement("div");
    this.coverTopLeft.className = "cropper-cover cropper-cover-top-left";
    this.containerElement.appendChild(this.coverTopLeft);
  }
  if (!this.coverTopCenter) {
    this.coverTopCenter = document.createElement("div");
    this.coverTopCenter.className = "cropper-cover cropper-cover-top-center";
    this.containerElement.appendChild(this.coverTopCenter);
  }
  if (!this.coverTopRight) {
    this.coverTopRight = document.createElement("div");
    this.coverTopRight.className = "cropper-cover cropper-cover-top-right";
    this.containerElement.appendChild(this.coverTopRight);
  }
  if (!this.coverRightCenter) {
    this.coverRightCenter = document.createElement("div");
    this.coverRightCenter.className = "cropper-cover cropper-cover-right-center";
    this.containerElement.appendChild(this.coverRightCenter);
  }
  if (!this.coverBottomRight) {
    this.coverBottomRight = document.createElement("div");
    this.coverBottomRight.className = "cropper-cover cropper-cover-bottom-right";
    this.containerElement.appendChild(this.coverBottomRight);
  }
  if (!this.coverBottomCenter) {
    this.coverBottomCenter = document.createElement("div");
    this.coverBottomCenter.className = "cropper-cover cropper-cover-bottom-center";
    this.containerElement.appendChild(this.coverBottomCenter);
  }
  if (!this.coverBottomLeft) {
    this.coverBottomLeft = document.createElement("div");
    this.coverBottomLeft.className = "cropper-cover cropper-cover-bottom-left";
    this.containerElement.appendChild(this.coverBottomLeft);
  }
  if (!this.coverLeftCenter) {
    this.coverLeftCenter = document.createElement("div");
    this.coverLeftCenter.className = "cropper-cover cropper-cover-left-center";
    this.containerElement.appendChild(this.coverLeftCenter);
  }
  if (!this.coverCenterCenter) {
    this.coverCenterCenter = document.createElement("div");
    this.coverCenterCenter.className = "cropper-cover cropper-cover-center-center";
    this.containerElement.appendChild(this.coverCenterCenter);
  }
  var rect = this.containerElement.getBoundingClientRect();
  var rootWidth = rect.width;
  var rootHeight = rect.height;
  setCropperCoverStyle(this.coverTopLeft, 0, 0, startX, startY);
  setCropperCoverStyle(this.coverTopCenter, 0, startX, endX - startX, startY);
  setCropperCoverStyle(this.coverTopRight, 0, endX, rootWidth - endX, startY);
  setCropperCoverStyle(this.coverRightCenter, startY, endX, rootWidth - endX, endY - startY);
  setCropperCoverStyle(this.coverBottomRight, endY, endX, rootWidth - endX, rootHeight - endY);
  setCropperCoverStyle(this.coverBottomCenter, endY, startX, endX - startX, rootHeight - endY);
  setCropperCoverStyle(this.coverBottomLeft, endY, 0, startX, rootHeight - endY);
  setCropperCoverStyle(this.coverLeftCenter, startY, 0, startX, endY - startY);
  setCropperCoverStyle(this.coverCenterCenter, startY, startX, endX - startX, endY - startY);
}

function initCropperStyle(src) {
  var target = document.createElement("div");
  var container = document.createElement("div");
  var styles = [
    'width', 'height',
    'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom',
    'marginLeft', 'marginTop', 'marginRight', 'marginBottom',
  ];
  var computedStyle = getComputedStyle(src);
  for (var k of styles) {
    target.style[k] = computedStyle[k];
    container.style[k] = computedStyle[k];
  }
  target.className = "cropper-container";
  container.className = "cropper-img-container";
  return [target, container];
}

function initCropper(options) {
  var ele = options.element;
  if (!ele) {
    throw new Error("没有指定目标节点");
    return;
  }
  [this.rootElement, this.containerElement] = this.initCropperStyle(ele);
  var parent = ele.parentNode;
  var nextNode = ele.nextSibling;
  parent.removeChild(ele);
  this.containerElement.appendChild(ele);
  this.rootElement.appendChild(this.containerElement);
  // 
  ele.style.position = "absolute";
  parent.insertBefore(this.rootElement, nextNode);
  this.containerElementStyle = getComputedStyle(this.containerElement);
  // tool bar 

  if (options.toolbar) {
    this.toolbarElement = document.createElement("div");
    this.toolbarElement.className = "cropper-toolbar";
    for (var item in toolbarButtons) {
      this.toolbarElement.appendChild(createIcon.call(this, toolbarButtons[item]));
    }
    this.rootElement.appendChild(this.toolbarElement);
  }
  // preview or get image canvas
  this.sourceImage = new Image();
  var that = this;
  this.sourceImage.onload = function () {
    that.srcImageWidth = that.sourceImage.width;
    that.srcImageHeight = that.sourceImage.height;
    // canvas
    that.previewCanvas = document.createElement("canvas");
    that.previewCanvas.className = "cropper-preview-canvas";
    if (options.preview) {
      options.preview.appendChild(that.previewCanvas);
      var ps = getComputedStyle(options.preview);
      that.previewCanvasWidth = parseInt(ps.width);
      that.previewCanvasHeight = parseInt(ps.height);
    } else {
      that.previewCanvasWidth = srcImageWidth;
      that.previewCanvasHeight = srcImageHeight;
    }
    that.previewCanvas.setAttribute("width", that.previewCanvasWidth);
    that.previewCanvas.setAttribute("height", that.previewCanvasHeight);
    that.previewContext = that.previewCanvas.getContext("2d");
  }
  this.sourceImage.src = ele.src;
  return this.containerElement;
}

function drawCropper(x1, y1, x2, y2) {
  var startX = Math.min(x1, x2);
  var startY = Math.min(y1, y2);
  var endX = Math.max(x1, x2);
  var endY = Math.max(y1, y2);
  if (endY - startY < 10 && endX - startX < 10) return;
  var offset = getElementOffset(this.containerElement);
  startX -= offset.left;
  startY -= offset.top;
  endX -= offset.left;
  endY -= offset.top;
  this.drawCovers(startX, startY, endX, endY);
  this.drawHandlers(startX, startY, endX, endY);
}

function clearCropper() {
  var handlers = this.containerElement.getElementsByClassName("cropper-handler");
  handlers = Array.from(handlers);
  for (var h of handlers) {
    h.style.display = "none";
  }
  var covers = this.containerElement.getElementsByClassName("cropper-cover");
  covers = Array.from(covers);
  for (var c of covers) {
    c.style.display = "none";
  }
}

exports.draw = function (state) {
  this.containerElement.style.cursor = state.rootCursor;
  if (state.dragTarget == "image") {
    var img = this.containerElement.firstChild;
    img.style.top = state.topOffset + "px";
    img.style.left = state.leftOffset + "px";
  }
  if (state.options.preview) {
    this.drawPreview(state);
  }
  switch (state.pointerMode) {
    case "crop":
    case "move":
      var sX = state.cropperStartX,
        sY = state.cropperStartY,
        eX = state.cropperEndX,
        eY = state.cropperEndY;
      if (sX == -1 || sY == -1 || eX == -1 || eY == -1) {
        return;
      }
      return this.drawCropper(sX, sY, eX, eY);
    default:
      return this.clearCropper();
  }/**/
};

exports.clearCropper = clearCropper;
exports.createIcon = createIcon;
exports.drawCovers = drawCovers;
exports.drawCropper = drawCropper;
exports.drawHandlers = drawHandlers;
exports.drawPreview = drawPreview;
exports.getElementOffset = getElementOffset;
exports.getImage = getImage;
exports.getSelectedRect = getSelectedRect;
exports.initCropper = initCropper;
exports.initCropperStyle = initCropperStyle;
exports.photoZoom = photoZoom;
exports.setModeCrop = setModeCrop;
exports.setModeMove = setModeMove;
exports.toggleMode = toggleMode;
exports.photoZoomOut = photoZoomOut;
exports.photoZoomIn = photoZoomIn;
