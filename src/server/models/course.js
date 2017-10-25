var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// A model for the sbuject object
var CourseSchema = new Schema({
    name: String,
    number: String,
    description: String,
    credit_hours: String,
    children: [ObjectId]
});

module.exports = mongoose.model('Course', CourseSchema, 'courses');
