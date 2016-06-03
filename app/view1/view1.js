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
    View1Ctrl.$inject = ['ImageService', 'Video'];
    function View1Ctrl(ImageService, Video) {
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
        vm.fetchFrame = fetchFrame;
        activate();

        function activate() {
            Video.query({}).then(function (res) {
                vm.videos = res;
            })
        }

        function fetchFrame() {
            vm.imageUrl = '/api/video/' + vm.selectedVideo.id + '/frame/' + vm.frameNumber;
        }

        function update() {
            vm.image = ImageService.getImage(vm.imageUrl);
        }
    }
})();
