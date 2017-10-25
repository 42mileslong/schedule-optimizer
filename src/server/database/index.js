var secrets = require('../../../secrets.js');
var mongoose = require('mongoose');

// Connects to the MongoDB and stores references to all models
mongoose.connect(secrets.db_url);
mongoose.set("debug", true);

module.exports = {
    Head : require('../models/head.js'),
    Year : require('../models/year.js'),
    Term : require('../models/term.js'),
    Subject : require('../models/subject.js'),
    Course : require('../models/course.js'),
    Section : require('../models/section.js')
}
