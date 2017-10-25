var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// A model for the head object
var HeadSchema = new Schema({
    children: [ObjectId]
});

module.exports = mongoose.model('Meta', HeadSchema, 'meta');
