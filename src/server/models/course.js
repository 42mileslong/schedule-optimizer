var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Section = require('./section.js')

// A model for the sbuject object
var CourseSchema = new Schema({
    name: String,
    number: String,
    description: String,
    search_field: String,
    credit_hours: String,
    min_credit_hours: Number,
    max_credit_hours: Number,
    year: String,
    term: String,
    subject: String,
    iteration: Number
});

CourseSchema.methods.getChildren = function(callback) {
    return Section.find({
         '_id' : { $in : this.children }
     }, callback);
};

CourseSchema.methods.getChildWhere = function(fieldName, value, callback) {
    var query = {
         '_id' : { $in : this.children }
    };
    query[fieldName] = value;
    return Section.findOne(query, callback);
};

module.exports = mongoose.model('Course', CourseSchema, 'courses');
