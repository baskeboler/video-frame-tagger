(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('Video', Video);

    Video.$inject = ['$resource'];

    /* @ngInject */
    function Video($resource) {
        var service = {
            query: query,
            get: get,
            save: save,
            $resource: $resource('/api/video/:id', {
                query: {method: 'GET', isArray: true},
                get: {method: 'GET'},
                save: {method: 'POST'},
                update: {method: 'PUT'}
            })
        };
        return service;

        ////////////////

        function query(q) {
            return this.$resource.query(q).$promise;
        }

        function get(obj) {
            return this.$resource.get(obj).$promise;
        }

        function save(obj) {
            return this.$resource.save(obj).$promise;
        }

        function update(object) {
            return this.$resource.update(obj).$promise;
        }
    }

})();

