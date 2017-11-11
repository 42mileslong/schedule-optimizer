var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Term = require('./term.js')

// A model for the year object
var YearSchema = new Schema({
    name: String,
    iteration: Number
});

YearSchema.methods.getChildren = function(callback) {
    return Term.find({
         '_id' : { $in : this.children }
     }, callback);
};

YearSchema.methods.getChildWhere = function(fieldName, value, callback) {
    var query = {
         '_id' : { $in : this.children }
    };
    query[fieldName] = value;
    return Term.findOne(query, callback);
};

module.exports = mongoose.model('Year', YearSchema, 'years');
