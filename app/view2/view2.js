(function () {
    'use strict';

    angular.module('myApp.view2', ['ngRoute'])

        .config(configure)
        .controller('View2Ctrl', View2Ctrl);

    View2Ctrl.$inject = ['FileUploader'];
    function View2Ctrl(FileUploader) {
        var vm = this;
        vm.uploader = new FileUploader({
            url: 'api/video/upload',
            alias: 'file'
        });

        // FILTERS

        vm.uploader.filters.push({
            name: 'customFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });
    }

    configure.$inject = ['$routeProvider'];
    function configure($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl',
            controllerAs: 'vm'
        });
    }
})();
