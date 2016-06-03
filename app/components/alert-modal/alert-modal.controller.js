(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('AlertModalController', AlertModalController);

    AlertModalController.$inject = ['$modalInstance', 'title', 'message'];

    /* @ngInject */
    function AlertModalController($modalInstance, title, message) {
        var vm = this;
        vm.title = title;
        vm.message = message;
        vm.title = 'AlertModalController';
        vm.ok = ok;
        vm.cancel = cancel;


        activate();

        ////////////////
        function ok() {
            $modalInstance.close('ok');
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }

        function activate() {

        }
    }

})();

