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
  <img id="image" src="picture.jpg">
</div>
<div id="preview"></div>
```

```
  var cropper = new Cropper({
    ele: getElementById("image"),
    toolbar: true, 
    aspectRatio: 1,
    preview: getElementById("preview")
  })
```

### Options
#### aspectRatio
+ Type: Number
+ Default: 0
Set the aspect ratio of the crop box. By default, the crop box is free ratio.  
#### element
+ Type: DOMElement(img)
+ Needed: Needed
Img element to crop
#### toolbar
+ Type: Boolean
+ Default: true
Whether to display toolbar.  
#### preview
+ Type: DOMElement
+ Needed: Optional
Add extra elements (containers) for previewing.

## License
[MIT](https://opensource.org/licenses/MIT) &copy; [ucev](https://github.com/ucev)