/**
 * Created by ramone on 01/06/16.
 */
(function () {
    'use strict';

    angular
        .module('gg.directives')
        .directive('imgAreaSelect', imgAreaSelect);

    imgAreaSelect.$inject = ['ImageService'];

    /* @ngInject */
    function imgAreaSelect(ImageService) {
        var directive = {
            // transclude: true,
            // bindToController: true,
            // controller: ImgAreaSelectCtrl,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            $(element).imgAreaSelect({
                handles: true,
                fadeSpeed: 200,
                onSelectChange: function (img, selection) {
                    scope.$apply(function () {
                        preview(img, selection);
                    })
                }
            });
            $(element).load(function () {
                initImage();

            });
            function initImage() {
                var i = ImageService.getImage(element.attr('src'));
                i.naturalWidth = element.prop('naturalWidth');
                i.naturalHeight = element.prop('naturalHeight');
                i.width = element.prop('width');
                i.height = element.prop('height');
                i.scaleWidth = i.naturalWidth / i.width;
                i.scaleHeight = i.naturalHeight / i.height;
            }

            function preview(img, selection) {
                // console.log(selection);
                var i = ImageService.getImage(img.attributes.src.value);
                var photoWidth = img.width;

                var photoHeight = img.height;
                var previewWidth = $('#preview').width();
                var previewHeight = $('#preview').height();
                if (!selection.width || !selection.height)
                    return;
                ImageService.setSelection(img.attributes.src.value, selection);
                // scope.selection = selection;

                var scaleX = 100 / selection.width;
                var scaleY = 100 / selection.height;

                var ratio = Math.min(100 / selection.width, 100 / selection.height);

                $('#preview img').css({
                    width: photoWidth * ratio,
                    height: photoHeight * ratio,
                    marginLeft: -selection.x1 * ratio,
                    marginTop: -selection.y1 * ratio
                });

                // scope.$digest()
                $('#preview').css({
                    width: ratio * selection.width,
                    height: ratio * selection.height
                });

                $('#photo').data('selection', selection);
            }
        }
    }

    ImgAreaSelectCtrl.$inject = ['$q'];

    /* @ngInject */
    function ImgAreaSelectCtrl($q) {

    }

})();

