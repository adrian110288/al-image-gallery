var app = angular.module("alImageGallery", []);

app.directive('alImageGallery', function() {

    return {
        restrict: "AE",
        // templateUrl: "imageGalleryTemplate.html",
        template: "<div class='image-gallery'><div class='image' ng-repeat='imageUrl in images' ng-click='onImageClick({src: imageUrl})'><img ng-src='{{imageUrl}}' alt='image{{$index}}'></div></div>",
        scope: {
            images: "=?",
            revealRadius: "@",
            onImageClick: "&"
        },
        link: function(scope, element, attrs) {

            var imageDataCache = [];
            var maxImageHeight = 0;

            angular.element(element).ready(function() {
                var gallery = $(element).find('.image-gallery')
                var images = $(gallery).find('.image');

                var loadedCount = 0;

                for (var i = 0; i < images.length; i++) {
                    var image = images[i];

                    $(image).find('img').on('load', function() {

                        loadedCount ++;

                        var imgHeight = $(this).height();
                        imageDataCache.push({
                            image: $(this).parent(),
                            height: imgHeight
                        });

                        if (imgHeight > maxImageHeight) {
                            maxImageHeight = imgHeight;
                        }

                        if (loadedCount == images.length) {
                            didAllLoad();
                        }
                    });

                }

                $(element).hover(

                    function() {

                        for (var angle = 0, index = 0; angle < 360, index < imageDataCache.length - 1; angle+=360/imageDataCache.length - 1, index ++) {

                            var cachedImage = imageDataCache[index];
                            var x, y;

                            if(angular.isUndefined(cachedImage.translation)) {
                                x = Math.cos(angle) * scope.revealRadius;
                                y = Math.sin(angle) * scope.revealRadius;

                                cachedImage.translation = {
                                    x: x,
                                    y: y
                                };
                            }
                            else {
                                x = cachedImage.translation.x;
                                y = cachedImage.translation.y;
                            }

                            $(cachedImage.image).css({transform: 'translate('+ x + 'px, ' + y +'px)'});
                        }
                    },

                    function() {
                        for (var i = 0; i < imageDataCache.length; i++) {
                            var cachedImage = imageDataCache[i];

                            $(cachedImage.image).css(
                                {
                                    transform: 'translate(0px, 0px) rotate(' + cachedImage.rotation + 'deg)'
                                }
                            );
                        }
                    }
                );

                gallery.height(maxImageHeight);

            });

            var didAllLoad = function() {
                for (var i = 0; i < imageDataCache.length; i++) {

                    var cachedImage = imageDataCache[i];

                    setOffsetTop(cachedImage);
                    setRandomRotation(cachedImage, i);
                }
            }

            var setOffsetTop = function(cachedImage) {
                var diff = maxImageHeight - cachedImage.height;
                cachedImage.image.css({top: diff/2 + "px"});
                cachedImage.offsetTop = diff/2;
            }

            var setRandomRotation = function(cachedImage, index) {
                var randomRotation = (Math.random() * 5) * (index%2 == 0? 1 : -1);
                cachedImage.image.css({transform: 'rotate(' + randomRotation + 'deg)'});
                cachedImage.rotation = randomRotation;
            }
        }
    }
});
