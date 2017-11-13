var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Head = require('./head.js')

// A model for the term object
var TermSchema = new Schema({
    name: String,
    year: String,
    iteration: Number
});

var TermModel = mongoose.model('Term', TermSchema, 'terms');
module.exports = TermModel;

module.exports.findCurrent = function(params, callback) {
  Head.getHead(function(err, head) {
    params['iteration'] = head.iter_id;
    return TermModel.find(params, callback);
  });
}
