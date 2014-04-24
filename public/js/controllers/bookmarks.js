'use strict';

angular.module('mean.bookmarks', ['angularBootstrapNavTree']).controller('BookmarksController', ['$scope', '$routeParams', '$location', 'Global', 'Bookmarks', 'Bookmark_groups', function ($scope, $routeParams, $location, Global, Bookmarks, Bookmark_groups) {
    $scope.global = Global;

    $scope.find = function() {
        var tree;
        Bookmarks.query(function(bookmarks) {
            $scope.my_data = [{
                label: 'Languages',
                children: ['Jade','Less','Coffeescript']
            }]
        });
/*        Bookmark_groups.query(function(bookmark_groups) {
            $scope.bookmark_groups = bookmark_groups;
        });*/
    };
}]);