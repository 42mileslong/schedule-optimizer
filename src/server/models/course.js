var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Head = require('./head.js')

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

var CourseModel = mongoose.model('Course', CourseSchema, 'courses');
module.exports = CourseModel;

module.exports.findCurrent = function(params, callback) {
  Head.getHead(function(err, head) {
    params['iteration'] = head.iter_id;
    return CourseModel.find(params, callback);
  });
}
