'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Game = mongoose.model('Game');

/**
 * List of Games
 */
exports.all = function(req, res) {
    Game.find().sort('-created').exec(function(err, games) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(games);
        }
    });
};

exports.usedAll = function(req, res) {
    Game.find({'isUsed':true}).sort('-created').exec(function(err, games) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(games);
        }
    });
};