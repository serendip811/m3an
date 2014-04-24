'use strict';

angular.module('mean', [
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ui.bootstrap',
        'ui.route',
        'mean.system',
        'mean.articles',
        'mean.chat',
        'mean.games',
        'mean.games.worms',
        'mean.bookmarks'
    ]);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.chat', []);
angular.module('mean.games', []);
angular.module('mean.games.worms', []);
angular.module('mean.bookmarks', []);