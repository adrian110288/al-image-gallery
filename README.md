#Image Gallery for Angular

This component is my small side project while I am learning Angular framework. 

![alt text](https://github.com/adrian110288/al-image-gallery/blob/master/screenshot1.png "Screenshot 1")
![alt text](https://github.com/adrian110288/al-image-gallery/blob/master/screenshot2.png "Screenshot 2")

To use it in your project include this script:
````javascript
<script src="al-image-gallery/src/imageGalleryDirective.js" /></script>
````

and this default style:
````css
<link rel="stylesheet" href="al-image-gallery/src/style.css">
````

Once the two files are included, all you have to do is include the module:
````javascript
  angular.module("myModule", ["alImageGallery"]);
````

This setup will allow you to use the image gallery directive:
````html
<al-image-gallery></al-image-gallery>
````

The directive provides three attributes to set up the gallery:
* **images** - an array of image urls to be loaded in the gallery 
* **reveal-radius** - a distance in px of how far the images spread when the gallery is hovered on
* **onImageClick** - and callback function returning the url of the clicked image

The example usage of the directive can be found in **index.html** in **src/** folder.
