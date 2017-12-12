var express = require('express');
var http = require('http');
var promise = require('request-promise');
var request = require("request");
var database = require('../database');


/**
  * Implement this to return stuff from the /optimize API request
  * courseList is an array of Course objects - see
  * https://github.com/CS196Illinois/schedule-optimizer/wiki/Data-Schema
  *
  * @param {Array} courseList   An array of courses, find schedules that match
  * @param {Function} callback  Callback that will be evoked when finished
  */
module.exports.generate = function(courseList, callback) {
  getAvailableSectionsForCourses(courseList, function(sectionList) {
    callback(generateGenetic(sectionList));
  });
};

/**
  * Calls the given callback with a 2D array of Section objects corresponding
  * to the list of Course objects passed in.
  *
  * @param {Array} courseList   An array of courses whose sections to find
  * @param {Function} callback  Callback that will be evoked when finished
  */
function getAvailableSectionsForCourses(courseList, callback) {
    var allSections = [];

    var elementList = [];
    for (var i = 0; i < courseList.length; i++) {
      var course = courseList[i];

      course.section_types.forEach(sectionType => {
        var element = Object.assign({}, course);
        element.section_type = sectionType;
        elementList.push(element);
      });
    }

    var numCourses = elementList.length;

    for (var i = 0; i < elementList.length; i++) {
        var course = elementList[i];

        // Call method for each individual section
        getCourseSections(allSections, course, function() {
            // This lets us count how many callbacks finished - once they're all
            // done, return
            numCourses--;
            if (numCourses == 0) {
                callback(allSections);
            }
        });
    }
}

/**
  * Gets all sections for a given course and inserts it at the given index of
  * the passed allSections array, before calling the passed callback function
  *
  * @param {Array} allSections  Array to insert within
  * @param {Object} course      A course object, defined by the Course schema (https://github.com/CS196Illinois/schedule-optimizer/wiki/Data-Schema)
  * @param {Function} callback  Callback that will be evoked when finished
  */
function getCourseSections(allSections, course, callback) {
    var searchParams = {};
    searchParams['year'] = course['year'];
    searchParams['term'] = course['term'];
    searchParams['subject'] = course['subject'];
    searchParams['course_number'] = course['number'];
    searchParams['meetings'] = {'$elemMatch' : {'type_verbose' : course['section_type']}};

    // Get current sections that correspond with search parameters
    database.Section.findCurrent(
        searchParams,
        function(err, sections) {
            if (sections[0].meetings[0].start_time != "ARRANGED") {
                for (var i = 0; i < sections.length; i++) {
                    sections[i].start_time = timeToInt(sections[i].meetings[0].start_time);
                    sections[i].end_time = timeToInt(sections[i].meetings[0].end_time);
                    sections[i].days = Array.from(sections[i].meetings[0].days);
                    sections[i].type = sections[i].meetings[0].type;
                    sections[i].score = 100;
                }
                allSections.push(sections);
            }
            callback();
        }
    );
}

/**
 * Generates a sorted list of schedules given the parameters
 *
 * @param {Array} courseList  List of lists of sections for each course to be included in schedule
 * @return {Array}            List of lists of sections where each sublist is a complete schedule
 */
function generate(courseList) {
    // INIT

    // Schedules should be initialized as a list of lists where each list contains 1 value
    var schedules = [];

    var baseIndex = 0;
    while (baseIndex < courseList.length && courseList[baseIndex] === undefined) {
      baseIndex++;
    }

    if (baseIndex != courseList.length) {
      for (var i = 0; i < courseList[0].length; i++) {
          schedules.push([courseList[0][i]]);
      }


      // CHECK
      for (var i = 1; i < courseList.length; i++) {
          var temp = [];
          for (var j = 0; j < schedules.length; j++) {
              var s = addCourse(schedules[j], courseList[i]);
              if (s.length > 0) {
                  temp = temp.concat(s);
              }
          }
          schedules = temp;
      }

      return schedules.slice(0, 25).map(a => a.map(b => b.number));
    } else {
      return [[]];
    }
}

/**
 * Generates a sorted list of schedules given the parameters using a genetic algorithm
 *
 * @param {Array} courseList  List of lists of sections for each course to be included in schedule
 * @return {Array}            List of lists of sections where each sublist is a complete schedule
 */
function generateGenetic(courseList) {
    const generations = 100;
    const population = 100;
    const topN = 10;
    const createN = Math.floor(population/topN);
    
    var schedules = [...Array(topN).keys()].map(i => [[getRandomSection(courseList)], 0]);

    for (var g = 0; g < generations; g++) {
        // CREATE
        var newSchedules = [];

        for (var i = 0; i < schedules.length; i++) {
            for (var j = 0; j < createN; j++) {
                var rand = getRandomSection(courseList);
                if (checkSchedule(schedules[i][0], rand)) {
                    newSchedules.push([schedules[i][0].concat(rand), 0]);
                } else {
                    newSchedules.push([removeRandomSection(schedules[i][0]), 0]);
                }
            }
        }

        schedules = newSchedules;

        
        // SCORE
        for (var i = 0; i < schedules.length; i++) {
            schedules[i][1] = scoreSchedule(schedules[i][0]);
        }
        
        // WEED
        schedules.sort(function(a, b) {
            return b[1] - a[1];
        });
        
        schedules = schedules.slice(0, topN);
    }

    return schedules.map(a => a[0].map(b => b.number));
}

/**
 * Returns a random section from the aray
 */
function getRandomSection(courseList) {
    var rand = Math.floor(Math.random() * courseList.length);
    return courseList[rand][Math.floor(Math.random() * courseList[rand].length)];
}

/**
 * Removes a random element from the array
 */
function removeRandomSection(schedule) {
    var section = schedule[Math.floor(Math.random() * schedule.length)];
    
    return schedule.filter(function(s) {
        return !(s.subject === section.subject && s.course_number === section.course_number);
    });
}

/**
 * Sums the scores of each section added to the schedule
 */
function scoreSchedule(schedule) {
    if (schedule.length === 0) {
        return 0;
    } else {
        return schedule.map(section => section.score).reduce((prev, next) => prev + next);
    }
}
        

/**
 * Tries to add every section for a course to a given schedule.
 * Returns all schedules where the given section did not introduce a conflict.
 *
 * @param {Array} schedule  List of sections that make a schedule
 * @param {Array} course    List of sections for a course
 * @return {Array}          List of lists of acceptable schedules
 */
function addCourse(schedule, course) {
    var output = [];

    for (var i = 0; i < course.length; i++) {
        if (checkSchedule(schedule, course[i])) {
            output.push(schedule.concat(course[i]));
        }
    }

    return output;
}

/**
 * Checks if the given schedule conflicts with the given section
 *
 * @param {Array} schedule  List of sections
 * @param {Object} section  Section object
 * @return {Boolean}        True if the section was added, False otherwise
 */
function checkSchedule(schedule, section) {
    for (var i = 0; i < schedule.length; i++) {
        if (checkConflict(schedule[i], section)) {
            return false;
        }

        if (schedule[i].subject === section.subject && schedule[i].course_number === section.course_number && schedule[i].type === section.type) {
            return false;
        }
    }

    return true;
}

/**
 * Checks if two sections overlap in times.
 *
 * @param {Object} s1  Section object
 * @param {Object} s2  Section object
 * @return {Boolean}   True if there is a conflict, False otherwise
 */
function checkConflict(s1, s2) {
    if (s1.days.some((n) => s2.days.includes(n))) {
        return s1.start_time <= s2.end_time &&  s1.end_time >= s2.start_time;
    } else {
        return false;
    }
}

/**
 * Converts a time in the format XX:XX AM to an integer, for display purposes
 *
 * @param {String} time The time to convert
 */
function timeToInt(time) {
    var startAmPm = time.split(' ')[1];
    var startClock = time.split(' ')[0];
    var startHour = parseInt(startClock.split(':')[0]) - 6;
    if (startAmPm === 'PM' && startClock.split(':')[0] !== '12') {
        startHour += 12;
    }
    var startMinute = parseInt(startClock.split(':')[1]);
    return startHour * 60 + startMinute;
}
