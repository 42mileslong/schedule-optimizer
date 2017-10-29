var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Year = require('./year.js')

// A model for the head object
var HeadSchema = new Schema({
    children: [ObjectId]
});

HeadSchema.methods.getChildren = function(callback) {
    return Year.find({
         '_id' : { $in : this.children }
     }, callback);
};

HeadSchema.methods.getChildWhere = function(fieldName, value, callback) {
    var query = {
         '_id' : { $in : this.children }
    };
    query[fieldName] = value;
    return Year.findOne(query, callback);
};

module.exports = mongoose.model('Meta', HeadSchema, 'meta');
