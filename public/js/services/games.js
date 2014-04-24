'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.games').factory('Games', ['$resource', function($resource) {
    return $resource(
        'games/'
    );
}]);