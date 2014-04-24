'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var GameSchema = new Schema({
    title: {
        type: String,
        default: '',
        trim: true
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    isUsed: {
        type: Boolean,
        default: true
    },
    minPlayer: {
        type: Number,
        default: 0
    },
    maxPlayer: {
        type: Number,
        default: 0
    }
});

/**
 * Validations
 */
GameSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');
GameSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');
/**
 * Statics
 */
/*GameSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};*/

mongoose.model('Game', GameSchema);
