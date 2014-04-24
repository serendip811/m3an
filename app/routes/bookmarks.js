'use strict';

// Articles routes use articles controller
var bookmarks = require('../controllers/bookmarks');
var bookmark_groups = require('../controllers/bookmark_groups');

module.exports = function(app) {

    app.get('/bookmarks', bookmarks.all);
    app.get('/bookmark_groups', bookmark_groups.all);

    

};