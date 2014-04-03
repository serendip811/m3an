'use strict';

angular.module('mean.game.worms').controller('GameWormsController', ['$scope','$window', '$routeParams', '$location', 'Global', 'Worms', function ($scope, $window, $routeParams, $location, Global, Worms) {
    var RECT_SIZE = 10;
    var worms=[];
    var canvas;
    var context;

    $scope.init = function(){
        var r = $routeParams;
        var g = Global;
        var w = Worms;
        r = null;
        g = null;
        w = null;
        
        worms.push(new Worm(50,50));

        canvas = angular.element('#gameCanvas')[0];
        canvas.focus();
        context = canvas.getContext('2d');

        var timer = setInterval(function(){
//            worms[0].lastMove();
            var b = Math.floor((Math.random()*5)+1);
            if(b==1){
                worms[0].addTail();
            }
            
        }, 1000);

    };

    $scope.moveLeft = function(){
        worms[0].moveLeft();
//        worms[0].lastMove = worms[0].moveLeft;
    };
    $scope.moveRight = function(){
        worms[0].moveRight();
    };
    $scope.moveUp = function(){
        worms[0].moveUp();
    };
    $scope.moveDown = function(){
        worms[0].moveDown();
    };

    var render = function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        for(var i=0;i<worms.length;i++){
            for(var j=0;j<worms[i].coords.length;j++){
                context.fillRect(worms[i].coords[j].x, worms[i].coords[j].y,RECT_SIZE,RECT_SIZE);
            }
        }
    };

    var Worm = function(x, y){
        this.coords = [];
        this.coords.push(new Coord(x, y));
        this.last_c = this.coords[0];
        
        this.moveLeft = function(){this.move(-10,0);};
        this.moveRight = function(){this.move(10,0);};
        this.moveUp = function(){this.move(0,-10);};
        this.moveDown = function(){this.move(0,10);};
        this.move = function(m_x, m_y){
            this.last_c = this.coords[this.coords.length-1];
            for(var i=this.coords.length-1;i>0;i--){
                this.coords[i].x = this.coords[i-1].x;
                this.coords[i].y = this.coords[i-1].y;
            }
            this.coords[0].x += m_x;
            this.coords[0].y += m_y;
            render();
        };
        this.addTail = function(){
            this.coords.push(new Coord(this.last_c.x, this.last_c.y));
        }

//        this.lastMove = this.moveRight;

    };
    var Coord = function(x, y){
        this.x = x;
        this.y = y;
    };
}]);