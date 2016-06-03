(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('AlertModal', AlertModal);

    AlertModal.$inject = ['$uibModal'];

    /* @ngInject */
    function AlertModal($uibModal) {
        var service = {
            info: info,
            warning: warning,
            danger: danger
        };
        return service;

        ////////////////

        function info(message) {
            return $uibModal.open({
                templateUrl: 'components/alert-modal/alert-modal.html',
                controller: 'AlertModalController',
                controllerAs: 'vm',
                size: 'sm',
                resolve: {
                    title: function () {
                        return 'Information';
                    },
                    message: function () {
                        return message;
                    }
                }
            })
        }
    }

})();

