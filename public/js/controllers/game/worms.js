'use strict';

angular.module('mean.game.worms').controller('GameWormsController', ['$scope','$window', '$routeParams', '$location', 'Global', 'Worms', function ($scope, $window, $routeParams, $location, Global, Worms) {
    $scope.init = function(){
        var canvas = angular.element('#gameCanvas')[0];
        var context = canvas.getContext('2d');
        var r = $routeParams;
        var g = Global;
        var w = Worms;
        r = null;
        g = null;
        w = null;
        console.log($window);
        context.fillRect(0,0,50,50);
    };
}]);