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
            return openAlert('Information', message);
        }

        function warning(message) {
            return openAlert('Warning', message);
        }

        function danger(message) {
            return openAlert('Danger', message);
        }

        function openAlert(title, message) {
            return $uibModal.open({
                templateUrl: 'components/alert-modal/alert-modal.html',
                controller: 'AlertModalController',
                controllerAs: 'vm',
                size: 'sm',
                resolve: {
                    title: function () {
                        return title;
                    },
                    message: function () {
                        return message;
                    }
                }
            })
        }
    }

})();

