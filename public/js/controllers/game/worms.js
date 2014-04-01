'use strict';

angular.module('mean.game.worms').controller('GameWormsController', ['$scope','$window', '$routeParams', '$location', 'Global', 'Worms', function ($scope, $window, $routeParams, $location, Global, Worms) {
    var RECT_SIZE = 10;
    var worms;

    $scope.init = function(){

        var r = $routeParams;
        var g = Global;
        var w = Worms;
        r = null;
        g = null;
        w = null;
        
        new Worm()
        player_coords.push(new Coord(50, 50))

        var timer = setInterval(function(){
            render();
        }, 1000);

    };

    $scope.moveLeft = function(){
        move(-10, 0);
    };

    $scope.moveRight = function(){
        move(10, 0);
    };

    $scope.moveUp = function(){
        move(0, -10);
    };

    $scope.moveDown = function(){
        move(0, 10);
    };

    var addTail = function(){
        
    }

    var move = function(x, y){
        for(var i=0;i<player_coords.length;i++){
            player_coords[i].x += x;
            player_coords[i].y += y;
        }
        render();
    };

    var render = function(){
        var canvas = angular.element('#gameCanvas')[0];
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        for(var i=0;i<player_coords.length;i++){
            //console.log(player_coords[i]);
            context.fillRect(player_coords[i].x, player_coords[i].y,RECT_SIZE,RECT_SIZE);
        }
    };

    var Worm = function(x, y){
        this.coords = [];
        this.coords.push(new Coord(x, y));
        this.last_c = null;
    }
    var Coord = function(x, y){
        this.x = x;
        this.y = y;
    };
}]);