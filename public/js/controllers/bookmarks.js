'use strict';

angular.module('mean.bookmarks').controller('BookmarksController', ['$scope', '$routeParams', '$location', 'Global', 'Bookmarks', function ($scope, $routeParams, $location, Global, Bookmarks) {
    $scope.global = Global;

    $scope.find = function() {
        $scope.query = 'test';
        Bookmarks.query(function(bookmarks) {
            $scope.bookmarks = bookmarks[0];
        });
    };
}]);