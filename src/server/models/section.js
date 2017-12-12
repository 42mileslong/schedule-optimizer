var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Head = require('./head.js')

// A model for the section object
var SectionSchema = new Schema({
    code: String,
    number: String,
    type: String,
    start_date: String,
    end_date: String,
    enrollment_status: String,
    section_restrictions: String,
    section_text: String,
    special_approval: String,
    meetings: [{
        type: { type: String },
        type_verbose: String,
        start_time: String,
        end_time: String,
        days: String,
        building: String,
        room: String,
        instructors: [{
            first_name: String,
            last_name: String
        }]
    }],
    year: String,
    term: String,
    subject: String,
    course_number: String,
    iteration: Number
});

var SectionModel = mongoose.model('Section', SectionSchema, 'sections');
module.exports = SectionModel;

module.exports.findCurrent = function(params, callback) {
  Head.getHead(function(err, head) {
    params['iteration'] = head.iter_id;
    return SectionModel.find(params, callback);
  });
}