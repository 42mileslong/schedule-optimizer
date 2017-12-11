var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Head = require('./head.js')

// A model for the year object
var YearSchema = new Schema({
    name: String,
    iteration: Number
});

var YearModel = mongoose.model('Year', YearSchema, 'years');
module.exports = YearModel;

module.exports.findCurrent = function(params, callback) {
  Head.getHead(function(err, head) {
    params['iteration'] = head.iter_id;
    return YearModel.find(params, callback);
  });
}
