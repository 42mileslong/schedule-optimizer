var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// A model for the sbuject object
var SubjectSchema = new Schema({
    name: String,
    code: String,
    children: [ObjectId]
});

module.exports = mongoose.model('Subject', SubjectSchema, 'subjects');
