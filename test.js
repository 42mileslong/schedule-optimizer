var express = require('express');
var app = express();
var serv = require('http').Server(app);
var mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://read:3UogYXcOGgYWCMRH@schedule-optimizer-shard-00-00-vwvrx.mongodb.net:27017,schedule-optimizer-shard-00-01-vwvrx.mongodb.net:27017,schedule-optimizer-shard-00-02-vwvrx.mongodb.net:27017/schedule_optimizer?ssl=true&replicaSet=schedule-optimizer-shard-0&authSource=admin');
var db = mongoose.connection;

//var coursesDB = mongoose.model('courses',???)

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// serv.createServer(app).listen(PORT, function() {
//     console.log("Server is listening on port 3001"); 
// });

serv.listen(PORT);
console.log("Listening to Port: " + PORT);



app.get('/', function(req,res) {
    res.sendFile(__dirname+ "/test.html");
    // report.find({}, function(err, reports) {
    // renderResult(res, reports, "Reports from the database: ");
    // });
});

// app.use("", express.static(__dirname + ""));

db.on('open', function () {
    console.log('Connected to mongo server.');
    //trying to get collection names
     mongoose.connection.db.listCollections().toArray(function (err, names) {
      if (err) {
        console.log(err);
      } else {
        console.log(names);
      }

      mongoose.connection.close();
    });
});

var io=require("socket.io")(serv,{});
io.sockets.on("connection", function(socket){           //initialize when the player connects
    socket.id=Math.random();
    SOCKET_LIST[socket.id] = socket;
    console.log("connected");

    socket.emit("hello", {message: "yo boi is here"});
    socket.on("sentData", function(data){         //assuming data has a courses list and a preferences property 
        optimize(data);
    })
    socket.on("disconnect", function(){           //Delete when the player disconnects
        delete SOCKET_LIST[socket.id];
    });
});


function Schedule(){
    var property = {
        courses: []
    }
    return property;
}

function Course(name, code, id, startTime, finishTime){
    var property = {
            name: String,
            code: Number,
            id: Number,
            startTime: Number,
            finishTime: Number,
    }
    return property;
}

var SOCKET_LIST=[];


function optimize(data){
    var reqCourses = data.courses;

    //list of all classes in a 2d Array
    classList = extractDB(reqCourses);
    //Sort the available classes for each course by their finish time
    for (var i in reqCourses){
        classList = sort(classList[i]);
    }

    //array of Schedule objects which holds all possbile schedules
    var schedules = [];
    schedules[0] = Schedule();
    schedules[0].courses.push(Course(classList[0][0].name, classList[0][0].code, classList[0][0].id, classList[0][0].startTime, classList[0][0].finishTime));

    for (var i = 1; i < classList.length; i++){
        if (doesConflict(sort(schedule.courses.push(classList[i])));
            checkschedules[0].courses.push(pickNonConflictCourse(schedule[0] ,classList[i]));
    }
} 

//finds course from the given courseList AFTER the index i that doesn't conflict with the given scehdule
function pickNonConfictCourse(schedule, courseList, i){
    // for (var j = i + 1; j < courseList.length; j++){
    //     if (courseList[j].finishTime <= jobs[i].startTime){
    //         return j;
    //     }
    // }
    // return -1;
}

function doesConflict(schedule){
    // for (var i in schedule){
    //     for (var k = i)
    //     if (jobs[j].finishTime <= jobs[i - 1].startTime){
    //         return j;
    //     }
    // }
    // return -1;
}
function extractDB(reqCourses){
    // var matchingCourses = []
    // for (m in reqCourses){
    //     matchingCourses.push([]);
    // }


    // for (var i in reqCourses){
    //     // var head = coursesDB.find({
    //     //     _id : "head"
    //     // })  
    //     // var year_obj = coursesDB.find({
    //     //     name : "2017",
    //     //     _id: { $in : head.years }
    //     // })
    //     // var term_obj = coursesDB.find({
    //     //     name : "Winter 2017",
    //     //     _id : { $in : year_obj.children }
    //     // })
         
    //     coursesDB.find({

    //         name : "hello"
    //         year: reqCourses[i].year,
    //         term.termName: reqCourses[i].termName,
    //         term.termName.subjects.name = reqCourses[i].name,
    //         term.termName.subjects.code = reqCourses[i].code,

    //         // term:{
    //         //     termName: reqCourses[i].termName,
    //         //     subjects: {
    //         //         name: reqCourses[i].name,
    //         //         code: reqCourses[i].code,
    //         //     },
    //         // },
    //     // the infromation we want from the server to optimzie the scehdule
    //     }, 'startTime endTime', function(err, foundCourse){
    //         if (err) return handleError(err);
    //         matchingCourses[i].push(foundCourse);
    //     });
    // }
    // return matchingCourses;
}

function sort(courses){  // has start time, finish time, and weight
    if (courses.length < 2){
        return courses;
    }
 
    var middle = parseInt(courses.length / 2);
    var left   = courses.slice(0, middle);
    var right  = courses.slice(middle, courses.length);
 
    return merge(sort(left), sort(right));
}

function merge(left, right){
    var result = [];
 
    while (left.length && right.length) {
        if (left[0].finishTime <= right[0].finishTime) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
 
    while (left.length){
        result.push(left.shift());
    }
 
    while (right.length){
        result.push(right.shift());
    }
 
    return result;
}


