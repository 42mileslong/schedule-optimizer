var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Course = require('./course.js')

// A model for the sbuject object
var SubjectSchema = new Schema({
    name: String,
    name_verbose: String,
    year: String,
    term: String,
    college_code: String,
    iteration: Number
});

SubjectSchema.methods.getChildren = function(callback) {
    return Course.find({
         '_id' : { $in : this.children }
     }, callback);
};

SubjectSchema.methods.getChildWhere = function(fieldName, value, callback) {
    var query = {
         '_id' : { $in : this.children }
    };
    query[fieldName] = value;
    return Course.findOne(query, callback);
};

module.exports = mongoose.model('Subject', SubjectSchema, 'subjects');
