'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Bookmark_group = mongoose.model('Bookmark_group');

/**
 * List of Games
 */
exports.all = function(req, res) {
    Bookmark_group.find().sort('depth seq').exec(function(err, bookmark_groups) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(bookmark_groups);
        }
    });
};