/**
 * Created by road on 16. 6. 30.
 */
'use strict';

angular.module('mainApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: '/view/view1.html',
        controller: 'View1Ctrl'
    });
}])

.controller('View1Ctrl', [function() {
    console.log('view1');
}]);