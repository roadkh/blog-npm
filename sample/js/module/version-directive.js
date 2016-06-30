/**
 * Created by road on 16. 6. 30.
 */
'use strict';

angular.module('mainApp.version.version-directive', [])

.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
        elm.text(version);
    };
}]);