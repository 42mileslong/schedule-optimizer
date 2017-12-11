var express = require('express');
var http = require('http');
var app = express();
var mongoose = require('mongoose');
var promise = require('request-promise');
var request = require("request");


//##################################################################//
//what options are given to the users,

//what are the factors of the optimization : travel time ? starting time ? instructor ?

//is there a way to know the current free spots in each classes? ( probably have to scrape the course management website)

//TODO: alpri is already sending the data for each course so >>> only make api calls to server to get section data.
//##################################################################//



// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

// serv.createServer(app).listen(PORT, function() {
//     console.log("Server is listening on port 3000");
// });


// app.get('/', function(req,res) {
//     report.find({}, function(err, reports) {
//     renderResult(res, reports, "Reports from the database: ");
//     });
// });

// var io=require("socket.io")(serv,{});
// io.sockets.on("connection", function(socket){           //initialize when the player connects
//     socket.id=Math.random();
//     SOCKET_LIST[socket.id]=socket;

//     socket.on("sentData", function(data){   //assuming data has a courses list and a preferences property
//         fetchData(data.courses);
//     })
//     socket.on("disconnect", function(){           //Delete when the player disconnects
//         delete SOCKET_LIST[socket.id];
//     });
// });

var SOCKET_LIST=[];


var optimizedSchedule = [];

function Course(name, code, id, startTime, finishTime, startDate, finishDate){
    var property = {
            name: name,
            code: code,
            id: id,
            startDate: startDate,
            finishDate: finishDate,
            startTime: startDate,
            finishTime: finishDate,
    }
    return property;
}

function Schedule(arr){
    var property = {
        courses : arr,
    }
    return property;
}

//array to hold the courses the user requireds
var reqCourses = []

//array to hold the user's optional courses
var optCourses = []

//2D array to hold generated schedules
var schedules = [];
samCourses = [{
    year: '2018',
    term: 'Summer',
    subject: 'PSYC',
    code: '100',
}, {
    year: '2018',
    term: 'Summer',
    subject: 'CSE',
    code: '440',
}];

//data{
//     courseWork: {
//         requiredCourses: [],    >> look at Ben's code to figure out the properties of course objects.
//         preferredCourses: [],
//     }
//     config: {
//         maxCreditHours: int,
//         minCreditHours: int
//         term: {} ???
//     }
// }

socket.on("connection", )
socket.on("scheduleData", function(data){
    reqCourses = data.courseWork.requiredCourses
    optCourses = data.courseWork.preferredCourses
});


var p = getAvailableCourses(reqCourses);
//console.log(p);
generate();

function generate(){
    //var reqCourses = data.courses;

    //get request to server. it returns a 2d array
//    classList = extractDB(reqCourses);

    var classList = [];
    classList.push([{startTime: 3, finishTime: 5}, {startTime: 9, finishTime: 10}]);
    classList.push([{startTime:0, finishTime: 1},{startTime: 2, finishTime: 6}]);
    classList.push([{startTime: 1, finishTime: 4},{startTime: 7, finishTime: 8}]);

    generateSchedule(classList);

}
//topC : the list of courses from upper for loops, it's empty if we are on first course
//i : the index of the class we want to pick courses

function generateSchedule(classList){
    oneRecursiveBoi([], 0, classList);
}
function oneRecursiveBoi(topC, i, classList){

    if (i == classList.length){
            schedules.push(Schedule(topC));
            console.log("one Schedule: ");
            //for (i in topC) console.log(topC[i]);
    } else {
        var k = 0;
        var next = nextNonConflict(topC, classList[i], k);
        while (next != -1){
            var currentSch = topC;
            currentSch.push(classList[i][next]);

            oneRecursiveBoi(currentSch, i + 1, classList);

            currentSch.pop();
            k = next + 1;
            next = nextNonConflict(topC, classList[i], k);
        }
    }
}

// function oneRecursiveBoi(topC, i, classList){

//     if (i == classList.length){
//         if (noConflict(sort(topC))){
//             schedules.push(Schedule(topC));
//             console.log("one Schedule: ");
//             for (i in topC) console.log(topC[i]);
//         }
//     } else {
//         for (var k in classList[i]){
//             var currentSch = topC;
//             currentSch.push(classList[i][k]);

//             oneRecursiveBoi(currentSch, i + 1, classList);

//             currentSch.pop();
//         }
//     }
// }

//checks if there is a conflict in the givven schedule
//arr : the
function noConflict(arr){
    arr = sort(arr);
    for (var i = 1; i < arr.length; i++){
        if (arr[i - 1].finishTime > arr[i].startTime){
            return false;
        }
    }
    return true;
}

//Finds the INDEX of the next course from the courses in courseList from k index
//and onward that doesn't conflict with the current courses in schedule
//schedule: the current schedule
//courseList: list of courses we are searching thu
//k: index of the courseList we are starting the search from
function nextNonConflict(schedule, courseList, k){
    for (var i = k; i < courseList.length; i++){
        schedule.push(courseList[i]);
        if (noConflict(schedule)){
            schedule.pop();
            return i;
        }
        schedule.pop();
    }
    return -1;
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

function getTotalDistance(){

}

function profScore(){

}

function rankSchedules(SchList){

}

//puts all the available classes for the give courses in a 2d arr.
//different rows are different courses and different column are available classes of those courses
function getAvailableCourses(arr){
    allCourses = [];
    for (var i = 0; i < arr.length; i++){

        allCourses.push([]);
        var add = 'http://localhost:5000/api/section?year=' + arr[i].year + '&term=' + arr[i].term + '&subject=' + arr[i].subject + '&course_number=' + arr[i].code;

        sendRequest(allCourses, arr, add, i);

    }
    return allCourses;
}

//allCourses: 2d array of all courses: rows represent different courses and columns represent different classes of each course
//arr: list of desired courses
//add: address of the request
//i : the index of the course we are currently getting information for
function sendRequest(allCourses, arr, add, i){
    request(add, function(err, response, chunk) {
        var obj = JSON.parse(chunk);

        for (k in obj){
            if (meetsFilter(k)){
                allCourses[i].push(Course(arr[i].subject, arr[i].code, obj[k]._id, obj[k].meetings[0].start_time, obj[k].meetings[0].end_time, obj[k].start_date, obj[k].end_date));
            }
        }
    });
}


//checks if the given class meets the filters given by
//the class we want to check
function meetsFilter(class){
    //come up with a way to store the periods of time the users wants to take courses. ( maybe ?? dictionary??)
}
