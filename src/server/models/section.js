var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// A model for the section object
var SectionSchema = new Schema({
    code: String,
    number: String,
    start_date: String,
    end_date: String,
    meetings: [{
        type: String,
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
    children: [ObjectId]
});

module.exports = mongoose.model('Section', SectionSchema, 'sections');
