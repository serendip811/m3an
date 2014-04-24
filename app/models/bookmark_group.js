'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var Bookmark_groupSchema = new Schema({
    parent: {
        type: Schema.ObjectId,
        ref: 'Bookmark_group'
    },
    depth: {
        type: Number,
        default: 0
    },
    seq: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        trim: true
    }
});

/**
 * Validations
 */
Bookmark_groupSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');
/**
 * Statics
 */
/*Bookmark_groupSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};*/

mongoose.model('Bookmark_group', Bookmark_groupSchema);
