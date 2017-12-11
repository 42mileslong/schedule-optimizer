var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// A model for the head object
var HeadSchema = new Schema({
    children: [ObjectId],
    iter_id: Number
});


var HeadModel = mongoose.model('Meta', HeadSchema, 'meta');
module.exports = HeadModel;

module.exports.getHead = function(callback) {
    return HeadModel.findOne({}, callback);
}
