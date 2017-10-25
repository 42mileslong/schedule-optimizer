var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// A model for the term object
var TermSchema = new Schema({
    name: String,
    children: [ObjectId]
});

module.exports = mongoose.model('Term', TermSchema, 'terms');
