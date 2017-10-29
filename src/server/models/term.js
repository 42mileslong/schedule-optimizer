var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Subject = require('./subject.js')

// A model for the term object
var TermSchema = new Schema({
    name: String,
    children: [ObjectId]
});

TermSchema.methods.getChildren = function(callback) {
    return Subject.find({
         '_id' : { $in : this.children }
     }, callback);
};

module.exports = mongoose.model('Term', TermSchema, 'terms');
