var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Head = require('./head.js')

// A model for the sbuject object
var SubjectSchema = new Schema({
    name: String,
    name_verbose: String,
    year: String,
    term: String,
    iteration: Number
});

var SubjectModel = mongoose.model('Subject', SubjectSchema, 'subjects');
module.exports = SubjectModel;

module.exports.findCurrent = function(params, callback) {
  Head.getHead(function(err, head) {
    params['iteration'] = head.iter_id;
    return SubjectModel.find(params, callback);
  });
}
