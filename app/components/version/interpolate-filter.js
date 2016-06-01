(function () {
    'use strict';

    angular
        .module('myApp.version.interpolate-filter', [])
        .filter('interpolate', interpolate);
    interpolate.$inject = ['version'];
    function interpolate(version) {
        return interpolateFilter;

        ////////////////

        function interpolateFilter(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }

})();

