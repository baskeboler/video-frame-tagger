(function () {
    'use strict';

    angular
        .module('gg.directives')
        .factory('ImageService', ImageService);

    ImageService.$inject = [];

    /* @ngInject */
    function ImageService() {
        var images = {};
        var service = {
            getImage: getImage,
            setSelection: setSelection
        };
        return service;

        ////////////////
        function setSelection(url, selection) {
            var image = getImage(url);
            image.selection = angular.copy(selection);
            images[url] = image;
        }

        function getImage(url) {
            if (!angular.isDefined(images[url])) {
                var imgData = {
                    url: url,
                    selection: null
                }
                images[url] = imgData;
            }
            return images[url];
        }
    }
})();

