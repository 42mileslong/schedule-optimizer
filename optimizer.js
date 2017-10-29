/*var express = require('express');
var serv = require('http');
var app = express();
var mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://heroku-site:LMDPiqBxsBnoPDGh@narc-cluster-shard-00-00-uij1v.mongodb.net:27017,narc-cluster-shard-00-01-uij1v.mongodb.net:27017,narc-cluster-shard-00-02-uij1v.mongodb.net:27017/test?ssl=true&replicaSet=narc-cluster-shard-0&authSource=admin');


//what options are given to the users, 

//what are the factors of the optimization : travel time ? starting time ? instructor ?
//name of the collection? ( is it all in one collection?)

//should i generate every possible schedule ? 


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

serv.createServer(app).listen(PORT, function() {
    console.log("Server is listening on port 3000"); 
});


app.get('/', function(req,res) {
    report.find({}, function(err, reports) {
    renderResult(res, reports, "Reports from the database: ");
    });
});

var io=require("socket.io")(serv,{});
io.sockets.on("connection", function(socket){           //initialize when the player connects
    socket.id=Math.random();
    SOCKET_LIST[socket.id]=socket;

    socket.on("sentData", function(data){   //assuming data has a courses list and a preferences property 
        optimize(data);
    })
    socket.on("disconnect", function(){           //Delete when the player disconnects
        delete SOCKET_LIST[socket.id];
    });
});*/

var SOCKET_LIST=[];


var optimizedSchedule = [];

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

function Schedule(arr){
    var property = {
        courses : arr,
    }
    return property;
}

var schedules = [];

generate();

function generate(){
    //var reqCourses = data.courses;

    //get request to server. it returns a 2d array
//    classList = extractDB(reqCourses);

    var classList = [];
    classList.push([{startTime: 1, finishTime: 2}, {startTime: 3, finishTime: 4}]);
    classList.push([{startTime:3, finishTime: 5},{startTime: 2, finishTime: 6}]);
    classList.push([{startTime: 0, finishTime: 3},{startTime: 7, finishTime: 8}]);


    //Sort the available classes for each course by their finish time
    // for (var i in classList){
    //     classList[i] = sort(classList[i]);
    // }

    //array of Schedule objects which holds all possbile schedules

    //schedules[0] = Schedule();
    //schedules[0].courses.push(Course(classList[0][0].name, classList[0][0].code, classList[0][0].id, classList[0][0].startTime, classList[0][0].finishTime));

    oneRecursiveBoi([], 0, classList);
}
//topC : the list of courses from upper for loops, it's empty if we are on first course
//i : the index of the class we want to pick courses
function oneRecursiveBoi(topC, i, classList){

    if (i == classList.length){
        if (noConflict(sort(topC))){
            schedules.push(Schedule(topC));
            console.log("one Schedule: ");
            for (i in topC) console.log(topC[i]);
        }
    } else {
        for (var k in classList[i]){
            var currentSch = topC;
            currentSch.push(classList[i][k]);

            oneRecursiveBoi(currentSch, i + 1, classList);

            currentSch.pop();   
        }
    }
}

function noConflict(arr){
    for (var i = 1; i < arr.length; i++){
        if (arr[i - 1].finishTime > arr[i].startTime){
            return false;
        }
    }
    return true;
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