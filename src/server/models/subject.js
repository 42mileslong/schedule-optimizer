var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Course = require('./course.js')

// A model for the sbuject object
var SubjectSchema = new Schema({
    name: String,
    code: String,
    children: [ObjectId]
});

SubjectSchema.methods.getChildren = function(callback) {
    return Course.find({
         '_id' : { $in : this.children }
     }, callback);
};

module.exports = mongoose.model('Subject', SubjectSchema, 'subjects');
