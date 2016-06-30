/**
 * Created by road on 16. 6. 30.
 */
'use strinct';

angular.module('mainApp.version.interpolate-filter', [])

.filter('interpolate', ['version', function(version) {
    return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    };
}]);