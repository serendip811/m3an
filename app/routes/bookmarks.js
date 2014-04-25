'use strict';

// Articles routes use articles controller
var bookmarks = require('../controllers/bookmarks');

module.exports = function(app) {
    app.get('/bookmarks', bookmarks.all);
};