# image-cropper
image cropper for javascript

## Getting Started

### Quick Start
```
npm install --save imagecropper
```

### Installation
Include files:
```
<link rel="stylesheet" type="text/css" href="/path/to/cropper.css"/>
<script src="/path/to/cropper.js"></script>
```

### Usage
Initialize with `new Cropper` method.
```
<!-- Wrap the image or canvas element with a block element (container) -->
<div>
  <img id="image" src="picture.jpg" />
</div>
<div id="preview"></div>
```

```
  var cropper = new Cropper({
    element: document.getElementById("image"),
    toolbar: true,
    aspectRatio: 1,
    preview: document.getElementById("preview")
  })
```

### Options

#### aspectRatio
+ Type: Number
+ Default: 0

Set the aspect ratio of the crop box. By default, the crop box is free ratio.

#### cropperMode
+ Type: String
+ Default: 'none'
+ Options:
  * border
  * image
  * none

Restrict the cropper to the border, the image, or with no restrictions.

#### element
+ Type: DOMElement(img)
+ Needed: Needed

Image element to crop

#### dragMode
+ Type: String
+ Default: 'crop'
+ Options:
  * crop
  * move
  * none

Dragging move of the cropper.

#### movable
+ Type: Boolean
+ Default: true

Enable to move the image.

#### preview
+ Type: DOMElement
+ Needed: Optional

Add extra elements (containers) for previewing.

#### responsive
+ Type: Boolean
+ Default: true

Rerender the cropper when resizing the window.

#### toolbar
+ Type: Boolean
+ Default: true

Whether to display toolbar.

#### zoomable
+ Type: Boolean
+ Default: true

Enable to zoom the image.

### Methods

#### getImage
##### Parameters
+ type: A String indicating the image format. The default format type is image/png
##### Return value
return cropped-image data encoded into base64
```
var image = cropper.getImage()
```

## License
[MIT](https://opensource.org/licenses/MIT) &copy; [ucev](https://github.com/ucev)
