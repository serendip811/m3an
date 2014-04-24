'use strict';

// Articles routes use articles controller
var games = require('../controllers/games');

module.exports = function(app) {

    app.get('/games', games.usedAll);

};