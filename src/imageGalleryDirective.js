var app = angular.module("alImageGallery", []);

app.directive('alImageGallery', function() {

    return {
        restrict: "AE",
        // templateUrl: "imageGalleryTemplate.html",
        template: "<div class='image-gallery'><div class='image' ng-repeat='imageUrl in images'><img ng-src='{{imageUrl}}' alt='image{{$index}}'></div></div>",
        scope: {
            images: "=?"
        },
        link: function(scope, element, attrs) {
            scope.images=['img/image1.jpg', 'img/image2.jpg', 'img/image3.jpg', 'img/image4.jpg', 'img/image5.jpg', 'img/image6.jpg'];

            var imageHeightCache = [];
            var maxHeight = 0;

            angular.element(element).ready(function() {
                var imageContainer = $(element).find('.image-gallery')
                var images = $(element).find('.image img');

                var loadedCount = 0;

                for (var i = 0; i < images.length; i++) {
                    var image = images[i];

                    $(image).on('click', function() {
                        console.log($(this).attr('alt'));
                    });

                    $(image).on('load', function() {

                        loadedCount ++;

                        var imgHeight = $(this).height();
                        imageHeightCache.push({
                            image: $(this),
                            height: imgHeight
                        });

                        if (imgHeight > maxHeight) {
                            maxHeight = imgHeight;
                            imageContainer.height(maxHeight);
                        }

                        if (loadedCount == images.length) {
                            didAllLoad();
                        }
                    });
                }

                $(element).hover(function() {
                    for (var i = 0; i < imageHeightCache.length; i++) {
                        var imageCache = imageHeightCache[i];

                        var randomXTranslate = Math.random() * 120 + 'px';
                        var randomYTranslate = Math.random() * 120 + 'px';

                        $(imageCache.image).parent().css(
                            {
                                transform: 'translate(' + randomXTranslate + ', ' + randomYTranslate + ')'
                            }
                        );
                    }
                }, function() {
                    for (var i = 0; i < imageHeightCache.length; i++) {
                        var imageCache = imageHeightCache[i];

                        $(imageCache.image).parent().css(
                            {
                                transform: 'translate(0px, 0px) rotate(' + imageCache.rotation + ')'
                            }
                        );
                    }
                });

            });

            var didAllLoad = function() {

                for (var i = 0; i < imageHeightCache.length; i++) {
                    var cached = imageHeightCache[i];

                    if(cached.height < maxHeight) {
                        var diff = maxHeight - cached.height;
                        cached.image.parent().css({top: diff/2 + "px"});
                    }

                    var rot = setRandomRotation(cached.image.parent());
                    cached.rotation = rot;
                }
            }

            var setRandomRotation = function(element) {
                var randomRotation = (imageHeightCache.indexOf(element)%2 ==0? '-' : '') + Math.random() * 5 + 'deg';
                element.css({transform: 'rotate(' + randomRotation + ')'});

                return randomRotation;
            }
        }
    }
});
