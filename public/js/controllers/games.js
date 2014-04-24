'use strict';

angular.module('mean.games').controller('GamesController', ['$scope', '$routeParams', '$location', 'Global', 'Games', function ($scope, $routeParams, $location, Global, Games) {
    $scope.global = Global;

    $scope.find = function() {
        console.log('test');
        Games.query(function(games) {
            $scope.games = games;
        });
    };
}]);