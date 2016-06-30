/**
 * Created by road on 16. 6. 30.
 */
'use strict';

angular.module('mainApp', [
    'ngRoute',
    'mainApp.view1',
    'mainApp.view2',
    'mainApp.version'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/view1'});
}]);