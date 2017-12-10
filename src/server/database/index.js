var mongoose = require('mongoose');
var db_url;

try {
    var secrets = require('../../../secrets.js');
    db_url = secrets.db_url;
} catch (e) {
    db_url = process.env.DB_URL
}

// Connects to the MongoDB and stores references to all models
mongoose.connect(db_url);
mongoose.set("debug", true);

module.exports = {
    Head : require('../models/head.js'),
    Year : require('../models/year.js'),
    Term : require('../models/term.js'),
    Subject : require('../models/subject.js'),
    Course : require('../models/course.js'),
    Section : require('../models/section.js')
}
