'use strict';

angular.module('mean.game.worms').controller('GameWormsController', ['$scope','$window', '$routeParams', '$location', 'Global', 'Worms', function ($scope, $window, $routeParams, $location, Global, Worms) {
    var RECT_SIZE = 10;
    var worms=[];

    $scope.init = function(){

        var r = $routeParams;
        var g = Global;
        var w = Worms;
        r = null;
        g = null;
        w = null;
        
        worms.push(new Worm(50,50));

        var timer = setInterval(function(){
            worms[0].moveRight();
        }, 1000);

        var timer2 = setInterval(function(){
            worms[0].moveDown();
        }, 700);

    };

    var render = function(){
        var canvas = angular.element('#gameCanvas')[0];
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        for(var i=0;i<worms.length;i++){
            console.log(worms[i]);
            for(var j=0;j<worms[i].coords.length;j++){
                context.fillRect(worms[i].coords[j].x, worms[i].coords[j].y,RECT_SIZE,RECT_SIZE);
            }
        }
    };

    var Worm = function(x, y){
        this.coords = [];
        this.coords.push(new Coord(x, y));
        this.coords.push(new Coord(x+10, y+10));
        this.coords.push(new Coord(x+20, y+20));
        this.coords.push(new Coord(x+30, y+30));
        this.last_c = null;

        this.moveLeft = function(){this.move(-10,0);};
        this.moveRight = function(){this.move(10,0);};
        this.moveUp = function(){this.move(0,-10);};
        this.moveDown = function(){this.move(0,10);};
        this.move = function(x, y){
            for(var i=this.coords.length-1;i>0;i--){
                this.coords[i].x = this.coords[i-1].x;
                this.coords[i].y = this.coords[i-1].y;
            }
            this.coords[0].x += x;
            this.coords[0].y += y;
            render();
        };
    };
    var Coord = function(x, y){
        this.x = x;
        this.y = y;
    };
}]);