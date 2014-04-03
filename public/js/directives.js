'use strict';

angular.module('mean.system').directive('resize', function ($window) {
    return function (scope) {
        if($window.innerWidth < 768)
            scope.size = 'small';
        else
            scope.size = 'default';
        scope.innerWidth = $window.innerWidth;
        scope.innerHeight = $window.innerHeight;

        angular.element($window).bind('resize', function () {
            scope.$apply(function () {
                if($window.innerWidth < 768)
                    scope.size = 'small';
                else
                    scope.size = 'default';
                scope.innerWidth = $window.innerWidth;
                scope.innerHeight = $window.innerHeight;
            });
        });
    };
});
angular.module('mean.system').directive('drawing', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            var ctx = element[0].getContext('2d');

            // variable that decides if something should be drawn on mousemove
            var drawing = false;

            // the last coordinates before the current move
            var lastX;
            var lastY;

            element.bind('mousedown', function (event) {
                if (event.offsetX !== undefined) {
                    lastX = event.offsetX;
                    lastY = event.offsetY;
                } else { // Firefox compatibility
                    lastX = event.layerX - event.currentTarget.offsetLeft;
                    lastY = event.layerY - event.currentTarget.offsetTop;
                }

                // begins new line
                ctx.beginPath();

                drawing = true;
            });
            element.bind('mousemove', function (event) {
                if (drawing) {
                    var currentX;
                    var currentY;
                    // get current mouse position
                    if (event.offsetX !== undefined) {
                        currentX = event.offsetX;
                        currentY = event.offsetY;
                    } else {
                        currentX = event.layerX - event.currentTarget.offsetLeft;
                        currentY = event.layerY - event.currentTarget.offsetTop;
                    }

                    draw(lastX, lastY, currentX, currentY);

                    // set current coordinates to last one
                    lastX = currentX;
                    lastY = currentY;
                }

            });
            element.bind('mouseup', function (event) {
                // stop drawing
                drawing = false;
            });

            // canvas reset
            function reset() {
                element[0].width = element[0].width;
            }

            function draw(lX, lY, cX, cY) {
                // line from
                ctx.moveTo(lX, lY);
                // to
                ctx.lineTo(cX, cY);
                // color
                ctx.strokeStyle = '#4bf';
                // draw it
                ctx.stroke();
            }
        }
    };
});
angular.module('mean.system').directive('ngKeydown', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
             element.on('keydown', function(e){
                //40 down
                //39 right
                //38 up
                //37 left
                if(e.keyCode == 37){
                    scope.moveLeft();
                }else if(e.keyCode == 38){
                    scope.moveUp();
                }else if(e.keyCode == 39){
                    scope.moveRight();
                }else if(e.keyCode == 40){
                    scope.moveDown();
                }
             });
        }
    };
});