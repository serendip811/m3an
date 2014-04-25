'use strict';
angular.module('mean.system').directive('myBookmark', function ($compile) {
    return {
        restrict: 'E',
        scope:{
            marks:'='
        },
        transclude:true,
        template:''+
        '<ul>'+
            '<li data-ng-repeat="mark in marks.children">'+
            '{{mark.label}}'+
                '<my-bookmark marks="mark">'+
                '</my-bookmark>'+
            '</li>'+
            '<li data-ng-repeat="link in marks.bookmarks">'+
                '<a href="{{link.url}}">{{link.label}}</a>'+
            '</li>'+
        '</ul>',
        compile: function(tElement, tAttr, transclude) {
            //We are removing the contents/innerHTML from the element we are going to be applying the 
            //directive to and saving it to adding it below to the $compile call as the template
            var contents = tElement.contents().remove();
            var compiledContents;
            return function(scope, iElement) {

                if(!compiledContents) {
                    //Get the link function with the contents frome top level template with 
                    //the transclude
                    compiledContents = $compile(contents, transclude);
                }
                //Call the link function to link the given scope and
                //a Clone Attach Function, http://docs.angularjs.org/api/ng.$compile :
                // "Calling the linking function returns the element of the template. 
                //    It is either the original element passed in, 
                //    or the clone of the element if the cloneAttachFn is provided."
                compiledContents(scope, function(clone) {
                    //Appending the cloned template to the instance element, "iElement", 
                    //on which the directive is to used.
                    iElement.append(clone);
                });
            };
        }
    };
});

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
            element.bind('mouseup', function () {
                // stop drawing
                drawing = false;
            });

            // canvas reset
/*            function reset() {
                element[0].width = element[0].width;
            }*/

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

                /*jslint eqeq: true*/
                if(e.keyCode == 37){
                    scope.moveLeft();
                }
                /*jslint eqeq: true*/
                else if(e.keyCode == 38){
                    scope.moveUp();
                }
                /*jslint eqeq: true*/
                else if(e.keyCode == 39){
                    scope.moveRight();
                }
                /*jslint eqeq: true*/
                else if(e.keyCode == 40){
                    scope.moveDown();
                }
            });
        }
    };
});