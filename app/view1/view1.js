(function () {
    'use strict';

    angular.module('myApp.view1', ['ngRoute', 'gg.directives'])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/view1', {
                templateUrl: 'view1/view1.html',
                controller: 'View1Ctrl',
                controllerAs: 'vm'
            });
        }])

        .controller('View1Ctrl', View1Ctrl);
    View1Ctrl.$inject = ['ImageService'];
    function View1Ctrl(ImageService) {
        var vm = this;
        vm.videos = [{
            name: 'video1.mp4'
        }, {
            name: 'video2.mp4'
        }, {
            name: 'video3.mp4'
        }, {
            name: 'video4.mp4'
        }];
        vm.imageUrl = 'image.jpg';
        vm.image = ImageService.getImage(vm.imageUrl);
        vm.update = update;

        function update() {
            vm.image = ImageService.getImage(vm.imageUrl);
        }
    }
})();
