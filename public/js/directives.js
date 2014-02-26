'use strict';

angular.module('mean.system').directive('resize', function ($window) {
    return function (scope) {
        if($window.innerWidth < 768)
            scope.size = 'small';
        else
            scope.size = 'default';
//        scope.width = $window.innerWidth;
//        scope.height = $window.innerHeight;
        angular.element($window).bind('resize', function () {
            scope.$apply(function () {
                if($window.innerWidth < 768)
                    scope.size = 'small';
                else
                    scope.size = 'default';
//                scope.width = $window.innerWidth;
//                scope.height = $window.innerHeight;
            });
        });
    };
});