const defaultOptions = require('../defaults')

const getComputedStyle = require('../helper').getComputedStyle
const getElementOffset = require('../helper').getElementOffset
const inRange = require('../helper').inRange
const normalizeCoordinateDuringMoveCropper = require('../helper').normalizeCoordinateDuringMoveCropper
const normalizeCoordinateDuringMoveImage = require('../helper').normalizeCoordinateDuringMoveImage
const normalizeCoordinateDuringCrop = require('../helper').normalizeCoordinateDuringCrop
const normalizeCoordinateDuringResize = require('../helper').normalizeCoordinateDuringResize

var defaultStates = {
  options: defaultOptions,

  // container element
  containerElement: null,

  // cropper border coordinations
  isCropDown: false,
  cropperStartX: -1,
  cropperStartY: -1,
  cropperEndX: -1,
  cropperEndY: -1,
  // drag point
  isDragDown: false,
  // ['top-left', 'top-center', 'top-right', 'right-center', 'bottom-right', 'bottom-center', 'bottom-left', 'left-center']
  dragPoint: '',
  // ['image', 'cropper', 'none']
  dragTraget: 'none',
  dragStartX: -1,
  dragStartY: -1,
  topOffset: -1,
  leftOffset: -1,
  // cropper point move mode: ["crop", "move", "none"], default "none"
  dragMode: 'none',
  //
  rootCursor: 'default'
}

function cropperBorderEnd (state, action) {
  if (state.isCropDown) {
    var sX = Math.min(state.cropperStartX, state.cropperEndX)
    var sY = Math.min(state.cropperStartY, state.cropperEndY)
    var eX = Math.max(state.cropperStartX, state.cropperEndX)
    var eY = Math.max(state.cropperStartY, state.cropperEndY)
    return Object.assign({}, state, { isCropDown: false, cropperStartX: sX, cropperStartY: sY, cropperEndX: eX, cropperEndY: eY })
  } if (state.isDragDown) {
    return Object.assign({}, state, { isDragDown: false, dragTarget: 'none' })
  } else {
    return Object.assign({}, state)
  }
}

function cropperBorderMove (state, action) {
  if (!state.containerElement) return state
  var ele = state.containerElement
  var cropperMode = state.options.cropperMode
  var offset = getElementOffset(state.containerElement)
  action.x -= offset.left
  action.y -= offset.top
  var cords
  if (state.isCropDown) {
    cords = normalizeCoordinateDuringCrop(state.cropperStartX, state.cropperStartY, action.x, action.y, state.options.aspectRatio, cropperMode, ele)
    return Object.assign({}, state, cords)
  } else if (state.isDragDown) {
    var subX = state.dragStartX - action.x
    var subY = state.dragStartY - action.y
    var aspectRatio = state.options.aspectRatio
    if (state.dragTarget === 'cropper') {
      switch (state.dragPoint) {
        case 'top-left':
          cords = normalizeCoordinateDuringResize(state._cropperStartX - subX, state._cropperStartY - subY, state.cropperEndX, state.cropperEndY, -1, -1, aspectRatio, cropperMode, ele)
          break
        case 'top-center':
          // cords = aspectRatio == 0 ? { cropperStartY: state._cropperStartY - subY } : {};
          cords = normalizeCoordinateDuringResize(state.cropperStartX, state._cropperStartY - subY, state.cropperEndX, state.cropperEndY, 0, -1, aspectRatio, cropperMode, ele)
          break
        case 'top-right':
          cords = normalizeCoordinateDuringResize(state.cropperStartX, state._cropperStartY - subY, state._cropperEndX - subX, state.cropperEndY, 1, -1, aspectRatio, cropperMode, ele)
          break
        case 'right-center':
          // cords = aspectRatio == 0 ? { cropperEndX: state._cropperEndX - subX } : {};
          cords = normalizeCoordinateDuringResize(state.cropperStartX, state.cropperStartY, state._cropperEndX - subX, state.cropperEndY, 1, 0, aspectRatio, cropperMode, ele)
          break
        case 'bottom-right':
          cords = normalizeCoordinateDuringResize(state.cropperStartX, state.cropperStartY, state._cropperEndX - subX, state._cropperEndY - subY, 1, 1, aspectRatio, cropperMode, ele)
          break
        case 'bottom-center':
          // cords = aspectRatio == 0 ? { cropperEndY: state._cropperEndY - subY } : {};
          cords = normalizeCoordinateDuringResize(state.cropperStartX, state.cropperStartY, state.cropperEndX, state._cropperEndY - subY, 0, 1, aspectRatio, cropperMode, ele)
          break
        case 'bottom-left':
          cords = normalizeCoordinateDuringResize(state._cropperStartX - subX, state.cropperStartY, state.cropperEndX, state._cropperEndY - subY, -1, 1, aspectRatio, cropperMode, ele)
          break
        case 'left-center':
          // cords = aspectRatio == 0 ? { cropperStartX: state._cropperStartX - subX } : {};
          cords = normalizeCoordinateDuringResize(state._cropperStartX - subX, state.cropperStartY, state.cropperEndX, state.cropperEndY, -1, 0, aspectRatio, cropperMode, ele)
          break
        default:
          cords = normalizeCoordinateDuringMoveCropper(state._cropperStartX - subX, state._cropperStartY - subY, state._cropperEndX - subX, state._cropperEndY - subY, cropperMode, ele)
          break
      }
      return Object.assign({}, state, cords)
    } else if (state.dragTarget === 'image') {
      var newOffset = normalizeCoordinateDuringMoveImage(state._leftOffset - subX, state._topOffset - subY, state.cropperStartX, state.cropperStartY, state.cropperEndX, state.cropperEndY, cropperMode, ele)
      return Object.assign({}, state, newOffset)
    } else {
      return Object.assign({}, state)
    }
  } else {
    var obj = {}
    var x = action.x
    var y = action.y
    var sX = state.cropperStartX
    var sY = state.cropperStartY
    var eX = state.cropperEndX
    var eY = state.cropperEndY
    if (inRange(x, y, sX, sY) || inRange(x, y, eX, eY)) {
      obj.rootCursor = 'nwse-resize'
    } else if (inRange(x, y, sX, eY) || inRange(x, y, eX, sY)) {
      obj.rootCursor = 'nesw-resize'
    } else if (inRange(x, y, (sX + eX) / 2, sY) || inRange(x, y, (sX + eX) / 2, eY)) {
      obj.rootCursor = 'ns-resize'
    } else if (inRange(x, y, sX, (sY + eY) / 2) || inRange(x, y, eX, (sY + eY) / 2)) {
      obj.rootCursor = 'ew-resize'
    } else if (x > sX && x < eX && y > sY && y < eY) {
      obj.rootCursor = 'move'
    } else {
      if (state.dragMode === 'move') {
        obj.rootCursor = 'move'
      } else {
        obj.rootCursor = 'default'
      }
    }
    return Object.assign({}, state, obj)
  }
}

function cropperBorderStart (state, action) {
  if (!state.containerElement) return state
  var offset = getElementOffset(state.containerElement)
  action.x -= offset.left
  action.y -= offset.top
  if (state.dragMode === 'none') {
    return Object.assign({}, state, { isCropDown: true, cropperStartX: action.x, cropperStartY: action.y, cropperEndX: action.x, cropperEndY: action.y, dragMode: 'crop' })
  } else {
    var obj = {}
    obj.isDragDown = true
    obj.dragTarget = 'cropper'
    obj.dragStartX = action.x
    obj.dragStartY = action.y
    obj._cropperStartX = state.cropperStartX
    obj._cropperStartY = state.cropperStartY
    obj._cropperEndX = state.cropperEndX
    obj._cropperEndY = state.cropperEndY
    var x = action.x
    var y = action.y
    var sX = state.cropperStartX
    var sY = state.cropperStartY
    var eX = state.cropperEndX
    var eY = state.cropperEndY
    if (inRange(x, y, sX, sY)) {
      obj.dragPoint = 'top-left'
    } else if (inRange(x, y, (sX + eX) / 2, sY)) {
      obj.dragPoint = 'top-center'
    } else if (inRange(x, y, eX, sY)) {
      obj.dragPoint = 'top-right'
    } else if (inRange(x, y, eX, (sY + eY) / 2)) {
      obj.dragPoint = 'right-center'
    } else if (inRange(x, y, eX, eY)) {
      obj.dragPoint = 'bottom-right'
    } else if (inRange(x, y, (sX + eX) / 2, eY)) {
      obj.dragPoint = 'bottom-center'
    } else if (inRange(x, y, sX, eY)) {
      obj.dragPoint = 'bottom-left'
    } else if (inRange(x, y, sX, (sY + eY) / 2)) {
      obj.dragPoint = 'left-center'
    } else if (action.x > sX && action.x < eX && action.y > sY && action.y < eY) {
      obj.dragPoint = ''
    } else {
      if (state.dragMode === 'crop') {
        obj.isDragDown = false
        obj.dragStartY = -1
        obj.dragStartY = -1
        obj.dragPoint = ''
        obj.isCropDown = true
        obj.cropperStartX = action.x
        obj.cropperStartY = action.y
        obj.cropperEndX = action.x
        obj.cropperEndY = action.y
      } else {
        obj.isDragDown = true
        obj.dragTarget = 'image'
        obj.dragStartX = action.x
        obj.dragStartY = action.y
        obj._leftOffset = state.leftOffset
        obj._topOffset = state.topOffset
      }
    }
    return Object.assign({}, state, obj)
  }
}

function repositionCropper (state) {
  var imgStyle = getComputedStyle(state.containerElement.firstChild)
  var imgStartX = parseFloat(imgStyle.left)
  var imgStartY = parseFloat(imgStyle.top)
  var imgEndX = imgStartX + parseFloat(imgStyle.width)
  var imgEndY = imgStartY + parseFloat(imgStyle.height)
  if (state.cropperStartX >= imgStartX && state.cropperStartX <= imgEndX &&
    state.cropperStartY >= imgStartY && state.cropperStartY <= imgEndY &&
    state.cropperEndX >= imgStartX && state.cropperEndX <= imgEndX &&
    state.cropperEndY >= imgStartY && state.cropperEndY <= imgEndY) {
    return state
  } else {
    return Object.assign({}, state, { cropperStartX: -1, cropperStartY: -1, cropperEndX: -1, cropperEndY: -1 })
  }
}

const reducer = (state = defaultStates, action) => {
  switch (action.type) {
    case 'CLEAR_CROPPER':
      return Object.assign({}, state, { isCropDown: false, cropperStartX: -1, cropperStartY: -1, cropperEndX: -1, cropperEndY: -1, dragMode: 'none', rootCursor: 'default' })
    case 'CROPPER_BORDER_END':
      return cropperBorderEnd(state, action)
    case 'CROPPER_BORDER_MOVE':
      return cropperBorderMove(state, action)
    case 'CROPPER_BORDER_START':
      return cropperBorderStart(state, action)
    case 'REPOSITION_CROPPER':
      return repositionCropper(state)
    case 'SET_CONTAINER_ELEMENT':
      return Object.assign({}, state, { containerElement: action.element })
    case 'SET_MODE':
      var obj = {}
      obj.dragMode = action.mode
      var extras = action.extras
      if (obj.dragMode === 'move') {
        obj.rootCursor = 'move'
        obj.topOffset = extras.top
        obj.leftOffset = extras.left
      } else {
        obj.rootCursor = 'default'
      }
      return Object.assign({}, state, obj)
    case 'SET_OPTIONS':
      var newOptions = Object.assign({}, state.options, action.options)
      return Object.assign({}, state, { options: newOptions, dragMode: newOptions.dragMode || state.dragMode })
    default:
      return Object.assign({}, state)
  }
}

module.exports = reducer
