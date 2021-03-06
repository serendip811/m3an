'use strict';

//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
        when('/chat', {
            templateUrl: 'views/chat/lobby.html'
        }).
        when('/chat/lobby', {
            templateUrl: 'views/chat/lobby.html'
        }).
        when('/chat/:roomId', {
            templateUrl: 'views/chat/room.html'
        }).
        when('/games', {
            templateUrl: 'views/games/list.html'
        }).
        when('/game/worms', {
            templateUrl: 'views/games/worms.html'
        }).
        when('/bookmarks', {
            templateUrl: 'views/bookmarks/list.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);