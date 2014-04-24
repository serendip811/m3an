'use strict';

angular.module('mean.bookmarks').factory('Bookmarks', ['$resource', function($resource) {
    return $resource(
        'bookmarks/'
    );
}]);

angular.module('mean.bookmarks').factory('Bookmark_groups', ['$resource', function($resource) {
    return $resource(
        'bookmark_groups/'
    );
}]);