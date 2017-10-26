var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Term = require('./term.js')

// A model for the year object
var YearSchema = new Schema({
    name: String,
    children: [Schema.Types.ObjectId]
});

YearSchema.methods.getChildren = function(callback) {
    return Term.find({
         '_id' : { $in : this.children }
     }, callback);
};

module.exports = mongoose.model('Year', YearSchema, 'years');
