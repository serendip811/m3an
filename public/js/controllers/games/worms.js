'use strict';

angular.module('mean.games.worms').controller('GameWormsController', ['$scope','$window', '$routeParams', '$location', 'Global', 'Worms', function ($scope, $window, $routeParams, $location, Global, Worms) {

    var CANVAS_WIDTH = 500;
    var CANVAS_HEIGHT = 320;
    var RECT_SIZE = 10;

    var pWorm = [];
    var worms = [];
    var feeds = [];
    var canvas;
    var context;

    $scope.init = function(){
        var r = $routeParams;
        var g = Global;
        var w = Worms;
        r = null;
        g = null;
        w = null;
        
        pWorm = new Worm(50,50);

        canvas = angular.element('#gameCanvas')[0];
        canvas.focus();
        context = canvas.getContext('2d');

        //var timer = 
        setInterval(function(){
            pWorm.lastMove();
        }, 1000);

        setInterval(function(){
            makeFeed();
        }, 3000);

    };

    $scope.moveLeft = function(){
        pWorm.moveLeft();
    };
    $scope.moveRight = function(){
        pWorm.moveRight();
    };
    $scope.moveUp = function(){
        pWorm.moveUp();
    };
    $scope.moveDown = function(){
        pWorm.moveDown();
    };

    var render = function(){
        context.clearRect(0, 0, canvas.width, canvas.height);

        for(var i=0;i<pWorm.coords.length;i++){
            context.fillRect(pWorm.coords[i].x, pWorm.coords[i].y,RECT_SIZE,RECT_SIZE);
        }

        for(i=0;i<worms.length;i++){
            for(var j=0;j<worms[i].coords.length;j++){
                context.fillRect(worms[i].coords[j].x, worms[i].coords[j].y,RECT_SIZE,RECT_SIZE);
            }
        }
        for(i=0;i<feeds.length;i++){
            context.fillRect(feeds[i].coord.x, feeds[i].coord.y,RECT_SIZE,RECT_SIZE);
        }
    };

    var makeFeed = function(){
        var feed = new Feed(
                        Math.floor(Math.random()*CANVAS_WIDTH/10)*10,
                        Math.floor(Math.random()*CANVAS_HEIGHT/10)*10
                    );
        feeds.push(feed);
    };

    var Feed = function(x, y){
        this.coord = new Coord(x, y);
    };

    var Worm = function(x, y){
        this.coords = [];
        this.coords.push(new Coord(x, y));
        this.last_c = this.coords[0];
        
        this.moveLeft = function(){
            this.move(-10,0);
            this.lastMove = this.moveLeft;
        };
        this.moveRight = function(){
            this.move(10,0);
            this.lastMove = this.moveRight;
        };
        this.moveUp = function(){
            this.move(0,-10);
            this.lastMove = this.moveUp;
        };
        this.moveDown = function(){
            this.move(0,10);
            this.lastMove = this.moveDown;
        };
        this.move = function(m_x, m_y){
            this.last_c = this.coords[this.coords.length-1];
            for(var i=this.coords.length-1;i>0;i--){
                this.coords[i].x = this.coords[i-1].x;
                this.coords[i].y = this.coords[i-1].y;
            }
            this.coords[0].x += m_x;
            this.coords[0].y += m_y;
            if(this.collisionCheck()){
                alert('끝!');
            }
            render();
        };
        this.addTail = function(){
            this.coords.push(new Coord(this.last_c.x, this.last_c.y));
        };

        this.collisionCheck = function(){
            for(var i=1;i<pWorm.coords.length;i++){
                /*jslint eqeq: true*/
                if(pWorm.coords[i].x == this.coords[0].x && pWorm.coords[i].y == this.coords[0].y){
                    return true;
                }
            }

            for(i=0;i<worms.length;i++){
                for(var j=0;j<worms[i].coords.length;j++){
                    context.fillRect(worms[i].coords[j].x, worms[i].coords[j].y,RECT_SIZE,RECT_SIZE);
                    /*jslint eqeq: true*/
                    if(worms[i].coords[j].x == this.coords[0].x && worms[i].coords[j].y == this.coords[0].y){
                        return true;
                    }
                }
            }
            var remove_index;
            for(i=0;i<feeds.length;i++){
                /*jslint eqeq: true*/
                if(feeds[i].coord.x == this.coords[0].x && feeds[i].coord.y == this.coords[0].y){
                    this.addTail();
                    remove_index = i;
                }
            }

            if(remove_index > -1){
                feeds.splice(remove_index, 1);
            }
        };

        this.lastMove = this.moveRight;

    };
    var Coord = function(x, y){
        this.x = x;
        this.y = y;
    };
}]);