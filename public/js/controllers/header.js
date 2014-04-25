'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Games',
        'link': 'games',
        'auth': false
    }, {
        'title': 'Chat',
        'link': 'chat',
        'auth': true
    }, {
        'title': 'Bookmarks',
        'link': 'bookmarks',
        'auth': false
    }, {
        'title': 'Articles',
        'link': 'articles',
        'auth': false
    }, {
        'title': 'Create New Article',
        'link': 'articles/create',
        'auth': true
    }];
    
    $scope.isCollapsed = false;
}]);