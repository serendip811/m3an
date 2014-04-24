'use strict';

angular.module('mean.bookmarks').factory('Bookmarks', ['$resource', function($resource) {
    return $resource(
        'bookmarks/'
    );
}]);