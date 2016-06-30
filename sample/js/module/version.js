/**
 * Created by road on 16. 6. 30.
 */
'use strict';

angular.module('mainApp.version', [
    'mainApp.version.interpolate-filter',
    'mainApp.version.version-directive'
])

.value('version', '0.1');
