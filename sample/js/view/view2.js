/**
 * Created by road on 16. 6. 30.
 */
'use strict';

angular.module('mainApp.view2', ['ngRoute'])
    
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view2', {
        templateUrl: '/view/view2.html',
        controller: 'View2Ctrl'
    });
}])

.controller('View2Ctrl', [function() {
    console.log('view2');
}]);