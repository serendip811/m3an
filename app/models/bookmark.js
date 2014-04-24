'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var BookmarkSchema = new Schema({
    data: {
        type: Array
    }
});

/**
 * Validations
 */
/*BookmarkSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');
BookmarkSchema.path('url').validate(function(url) {
    return url.length;
}, 'Url cannot be blank');*/
/**
 * Statics
 */
/*BookmarkSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('group').exec(cb);
};*/

mongoose.model('Bookmark', BookmarkSchema);