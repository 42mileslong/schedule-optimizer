var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Section = require('./section.js')

// A model for the sbuject object
var CourseSchema = new Schema({
    name: String,
    number: String,
    description: String,
    credit_hours: String,
    children: [ObjectId]
});

CourseSchema.methods.getChildren = function(callback) {
    return Section.find({
         '_id' : { $in : this.children }
     }, callback);
};

module.exports = mongoose.model('Course', CourseSchema, 'courses');
