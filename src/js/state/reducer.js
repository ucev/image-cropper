const defaultOptions = require('../defaults');
var defaultStates = {
  options: defaultOptions,

  // cropper border coordinations
  isCropDown: false,
  cropperStartX: -1,
  cropperStartY: -1,
  cropperEndX: -1,
  cropperEndY: -1,
  // drag point
  isDragDown: false,
  // ['top-left', 'top-center', 'top-right', 'right-center', 'bottom-right', 'bottom-center', 'bottom-left', 'left-center']
  dragPoint: "",
  // ['image', 'cropper', 'none']
  dragTraget: "none",
  dragStartX: -1,
  dragStartY: -1,
  topOffset: -1,
  leftOffset: -1,
  // cropper point move mode: ["crop", "move", "none"], default "none"
  dragMode: "none",
  //
  rootCursor: "default"
};

function inRange(x, y, cx, cy) {
  return Math.abs(cx - x) <= 5 && Math.abs(cy - y) <= 5;
}

function normalizeCoordinateDuringResize(sx, sy, ex, ey, ordX, ordY, ratio) {
  var cords = { cropperStartX: sx, cropperStartY: sy, cropperEndX: ex, cropperEndY: ey };
  if (ratio <= 0) {
    return cords;
  }
  var subX = ex - sx;
  var subY = ey - sy;
  var positiveX = subX > 0 ? 1 : -1;
  var positiveY = subY > 0 ? 1 : -1;
  subX = Math.abs(subX);
  subY = Math.abs(subY);
  if (subX / ratio <= subY) {
    subY = subX / ratio;
    if (ordY == -1) {
      cords.cropperStartY = cords.cropperEndY - subY * positiveY;
    } else {
      cords.cropperEndY = cords.cropperStartY + subY * positiveY;
    }
  } else {
    subX = subY * ratio;
    if (ordX == -1) {
      cords.cropperStartX = cords.cropperEndX - subX * positiveX;
    } else {
      cords.cropperEndX = cords.cropperStartX + subX * positiveX;
    }
  }
  return cords;
}

function normalizeCoordinateDuringCrop(sx, sy, ex, ey, ratio) {
  return normalizeCoordinateDuringResize(sx, sy, ex, ey, 0, 0, ratio);
}

const reducer = (state = defaultStates, action) => {
  switch (action.type) {
    case "CLEAR_CROPPER":
      return Object.assign({}, state, { isCropDown: false, cropperStartX: -1, cropperStartY: -1, cropperEndX: -1, cropperEndY: -1, dragMode: "none", rootCursor: "default" })
    case "CROPPER_BORDER_END":
      if (state.isCropDown) {
        var sX = Math.min(state.cropperStartX, state.cropperEndX);
        var sY = Math.min(state.cropperStartY, state.cropperEndY);
        var eX = Math.max(state.cropperStartX, state.cropperEndX);
        var eY = Math.max(state.cropperStartY, state.cropperEndY);
        return Object.assign({}, state, { isCropDown: false, cropperStartX: sX, cropperStartY: sY, cropperEndX: eX, cropperEndY: eY });
      } if (state.isDragDown) {
        return Object.assign({}, state, { isDragDown: false, dragTarget: "none" });
      } else {
        return Object.assign({}, state);
      }
    case "CROPPER_BORDER_MOVE":
      if (state.isCropDown) {
        var cords = normalizeCoordinateDuringCrop(state.cropperStartX, state.cropperStartY, action.x, action.y, state.options.aspectRatio);
        return Object.assign({}, state, cords);
      } else if (state.isDragDown) {
        var subX = state.dragStartX - action.x;
        var subY = state.dragStartY - action.y;
        var aspectRatio = state.options.aspectRatio;
        if (state.dragTarget == "cropper") {
          var cords;
          switch (state.dragPoint) {
            case "top-left":
              cords = normalizeCoordinateDuringResize(state._cropperStartX - subX, state._cropperStartY - subY, state.cropperEndX, state.cropperEndY, -1, -1, aspectRatio);
              break;
            case "top-center":
              cords = aspectRatio == 0 ? { cropperStartY: state._cropperStartY - subY } : {};
              break;
            case "top-right":
              cords = normalizeCoordinateDuringResize(state.cropperStartX, state._cropperStartY - subY, state._cropperEndX - subX, state.cropperEndY, 1, -1, aspectRatio);
              break;
            case "right-center":
              cords = aspectRatio == 0 ? { cropperEndX: state._cropperEndX - subX } : {};
              break;
            case "bottom-right":
              cords = normalizeCoordinateDuringResize(state.cropperStartX, state.cropperStartY, state._cropperEndX - subX, state._cropperEndY - subY, 1, 1, aspectRatio);
              break;
            case "bottom-center":
              cords = aspectRatio == 0 ? { cropperEndY: state._cropperEndY - subY } : {};
              break;
            case "bottom-left":
              cords = normalizeCoordinateDuringResize(state._cropperStartX - subX, state.cropperStartY, state.cropperEndX, state._cropperEndY - subY, -1, 1, aspectRatio);
              break;
            case "left-center":
              cords = aspectRatio == 0 ? { cropperStartX: state._cropperStartX - subX } : {};
              break;
            default:
              cords = { cropperStartX: state._cropperStartX - subX, cropperStartY: state._cropperStartY - subY, cropperEndX: state._cropperEndX - subX, cropperEndY: state._cropperEndY - subY };
              break;
          }
          return Object.assign({}, state, cords);
        } else if (state.dragTarget == "image") {
          return Object.assign({}, state, { topOffset: state._topOffset - subY, leftOffset: state._leftOffset - subX });
        } else {
          return Object.assign({}, state);
        }
      } else {
        var obj = {};
        var x = action.x;
        var y = action.y;
        var sX = state.cropperStartX,
          sY = state.cropperStartY,
          eX = state.cropperEndX,
          eY = state.cropperEndY;
        if (inRange(x, y, sX, sY) || inRange(x, y, eX, eY)) {
          obj.rootCursor = "nwse-resize";
        } else if (inRange(x, y, sX, eY) || inRange(x, y, eX, sY)) {
          obj.rootCursor = "nesw-resize";
        } else if (inRange(x, y, (sX + eX) / 2, sY) || inRange(x, y, (sX + eX) / 2, eY)) {
          obj.rootCursor = "ns-resize";
        } else if (inRange(x, y, sX, (sY + eY) / 2) || inRange(x, y, eX, (sY + eY) / 2)) {
          obj.rootCursor = "ew-resize";
        } else if (x > sX && x < eX && y > sY && y < eY) {
          obj.rootCursor = "move";
        } else {
          if (state.dragMode == "move") {
            obj.rootCursor = "move";
          } else {
            obj.rootCursor = "default";
          }
        }
        return Object.assign({}, state, obj);
      }
    case "CROPPER_BORDER_START":
      if (state.dragMode == "none") {
        return Object.assign({}, state, { isCropDown: true, cropperStartX: action.x, cropperStartY: action.y, cropperEndX: action.x, cropperEndY: action.y, dragMode: "crop" });
      } else {
        var obj = {};
        obj.isDragDown = true;
        obj.dragTarget = "cropper";
        obj.dragStartX = action.x;
        obj.dragStartY = action.y;
        obj._cropperStartX = state.cropperStartX;
        obj._cropperStartY = state.cropperStartY;
        obj._cropperEndX = state.cropperEndX;
        obj._cropperEndY = state.cropperEndY;
        var x = action.x;
        var y = action.y;
        var sX = state.cropperStartX,
          sY = state.cropperStartY,
          eX = state.cropperEndX,
          eY = state.cropperEndY;
        if (inRange(x, y, sX, sY)) {
          obj.dragPoint = "top-left";
        } else if (inRange(x, y, (sX + eX) / 2, sY)) {
          obj.dragPoint = "top-center";
        } else if (inRange(x, y, eX, sY)) {
          obj.dragPoint = "top-right";
        } else if (inRange(x, y, eX, (sY + eY) / 2)) {
          obj.dragPoint = "right-center";
        } else if (inRange(x, y, eX, eY)) {
          obj.dragPoint = "bottom-right";
        } else if (inRange(x, y, (sX + eX) / 2, eY)) {
          obj.dragPoint = "bottom-center";
        } else if (inRange(x, y, sX, eY)) {
          obj.dragPoint = "bottom-left";
        } else if (inRange(x, y, sX, (sY + eY) / 2)) {
          obj.dragPoint = "left-center";
        } else if (action.x > sX && action.x < eX && action.y > sY && action.y < eY) {
          obj.dragPoint = "";
        } else {
          if (state.dragMode == "crop") {
            obj.isDragDown = false;
            obj.dragStartY = -1;
            obj.dragStartY = -1;
            obj.dragPoint = "";
            obj.isCropDown = true;
            obj.cropperStartX = action.x;
            obj.cropperStartY = action.y;
            obj.cropperEndX = action.x;
            obj.cropperEndY = action.y;
          } else {
            obj.isDragDown = true;
            obj.dragTarget = "image";
            obj.dragStartX = action.x;
            obj.dragStartY = action.y;
            obj._leftOffset = state.leftOffset;
            obj._topOffset = state.topOffset;
          }
        }
        return Object.assign({}, state, obj);
      }
    case "SET_MODE":
      var obj = {};
      obj.dragMode = action.mode;
      var extras = action.extras;
      if (obj.dragMode == 'move') {
        obj.rootCursor = "move";
        obj.topOffset = extras.top;
        obj.leftOffset = extras.left;
      } else {
        obj.rootCursor = "default";
      }
      return Object.assign({}, state, obj)
    case "SET_OPTIONS":
      var newOptions = Object.assign({}, state.options, action.options);
      return Object.assign({}, state, { options: newOptions, dragMode: newOptions.dragMode || state.dragMode });
    default:
      return Object.assign({}, state);
  }
};

module.exports = reducer;
