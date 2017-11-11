var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Subject = require('./subject.js')

// A model for the term object
var TermSchema = new Schema({
    name: String,
    year: String,
    iter_id: Number
});

TermSchema.methods.getChildren = function(callback) {
    return Subject.find({
         '_id' : { $in : this.children }
     }, callback);
};

TermSchema.methods.getChildWhere = function(fieldName, value, callback) {
    var query = {
         '_id' : { $in : this.children }
    };
    query[fieldName] = value;
    return Subject.findOne(query, callback);
};


module.exports = mongoose.model('Term', TermSchema, 'terms');
