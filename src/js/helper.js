function getBorderRestrict (cropperMode, containerElement) {
  var bStyle, startX, startY, endX, endY
  if (cropperMode === 'border') {
    bStyle = getComputedStyle(containerElement)
    startX = 0
    startY = 0
    endX = parseFloat(bStyle.width)
    endY = parseFloat(bStyle.height)
  } else if (cropperMode === 'image') {
    bStyle = getComputedStyle(containerElement.firstChild)
    startX = parseFloat(bStyle.left)
    startY = parseFloat(bStyle.top)
    endX = startX + parseFloat(bStyle.width)
    endY = startY + parseFloat(bStyle.height)
  } else {
    startX = Number.MIN_VALUE
    startY = Number.MIN_VALUE
    endX = Number.MAX_VALUE
    endY = Number.MAX_VALUE
  }
  return { startX, startY, endX, endY }
}

function getComputedStyle (ele) {
  return ele.ownerDocument.defaultView.getComputedStyle(ele)
}

function getElementOffset (ele) {
  var offsetLeft = 0
  var offsetTop = 0
  while (ele) {
    offsetLeft += ele.offsetLeft
    offsetTop += ele.offsetTop
    ele = ele.offsetParent
  }
  return { left: offsetLeft, top: offsetTop }
}

function inRange (x, y, cx, cy) {
  return Math.abs(cx - x) <= 5 && Math.abs(cy - y) <= 5
}

function normalizeCoordinateDuringMoveCropper (cropperStartX, cropperStartY, cropperEndX, cropperEndY, cropperMode, containerElement) {
  var subX = 0
  var subY = 0
  var border = getBorderRestrict(cropperMode, containerElement)
  if (cropperStartX < border.startX) {
    subX = cropperStartX - border.startX
  }
  if (cropperStartY < border.startY) {
    subY = cropperStartY - border.startY
  }
  if (cropperEndX > border.endX) {
    subX = cropperEndX - border.endX
  }
  if (cropperEndY > border.endY) {
    subY = cropperEndY - border.endY
  }
  return { cropperStartX: cropperStartX - subX, cropperStartY: cropperStartY - subY, cropperEndX: cropperEndX - subX, cropperEndY: cropperEndY - subY }
}

function normalizeCoordinateDuringMoveImage (imgStartX, imgStartY, cropperStartX, cropperStartY, cropperEndX, cropperEndY, cropperMode, containerElement) {
  if (cropperMode === 'image') {
    var imgStyle = getComputedStyle(containerElement.firstChild)
    var imgEndX = imgStartX + parseFloat(imgStyle.width)
    var imgEndY = imgStartY + parseFloat(imgStyle.height)
    if (imgStartX > cropperStartX) {
      imgStartX = cropperStartX
    }
    if (imgStartY > cropperStartY) {
      imgStartY = cropperStartY
    }
    if (imgEndX < cropperEndX) {
      imgStartX += (cropperEndX - imgEndX)
    }
    if (imgEndY < cropperEndY) {
      imgStartY += (cropperEndY - imgEndY)
    }
  }
  return { leftOffset: imgStartX, topOffset: imgStartY }
}

function normalizeCoordinateDuringResize (sx, sy, ex, ey, ordX, ordY, ratio, cropperMode, containerElement) {
  var border = getBorderRestrict(cropperMode, containerElement)
  var cords = { cropperStartX: sx, cropperStartY: sy, cropperEndX: ex, cropperEndY: ey }
  cords.cropperStartX = Math.min(Math.max(cords.cropperStartX, border.startX), border.endX)
  cords.cropperEndX = Math.min(Math.max(cords.cropperEndX, border.startX), border.endX)
  cords.cropperStartY = Math.min(Math.max(cords.cropperStartY, border.startY), border.endY)
  cords.cropperEndY = Math.min(Math.max(cords.cropperEndY, border.startY), border.endY)
  if (ratio <= 0) {
    return cords
  }
  var subX = cords.cropperEndX - cords.cropperStartX
  var subY = cords.cropperEndY - cords.cropperStartY
  var positiveX = subX > 0 ? 1 : -1
  var positiveY = subY > 0 ? 1 : -1
  subX = Math.abs(subX)
  subY = Math.abs(subY)
  if (subX / ratio <= subY) {
    subY = subX / ratio
    if (ordY === -1) {
      cords.cropperStartY = cords.cropperEndY - subY * positiveY
    } else {
      cords.cropperEndY = cords.cropperStartY + subY * positiveY
    }
  } else {
    subX = subY * ratio
    if (ordX === -1) {
      cords.cropperStartX = cords.cropperEndX - subX * positiveX
    } else {
      cords.cropperEndX = cords.cropperStartX + subX * positiveX
    }
  }
  return cords
}

function normalizeCoordinateDuringCrop (sx, sy, ex, ey, ratio, cropperMode, containerElement) {
  return normalizeCoordinateDuringResize(sx, sy, ex, ey, 0, 0, ratio, cropperMode, containerElement)
}

exports.getComputedStyle = getComputedStyle
exports.getElementOffset = getElementOffset
exports.inRange = inRange
exports.normalizeCoordinateDuringMoveCropper = normalizeCoordinateDuringMoveCropper
exports.normalizeCoordinateDuringMoveImage = normalizeCoordinateDuringMoveImage
exports.normalizeCoordinateDuringResize = normalizeCoordinateDuringResize
exports.normalizeCoordinateDuringCrop = normalizeCoordinateDuringCrop
