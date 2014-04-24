'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Bookmark = mongoose.model('Bookmark');

/**
 * List of Games
 */
exports.all = function(req, res) {
    Bookmark.find().sort('seq').exec(function(err, bookmarks) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(bookmarks);
        }
    });
};