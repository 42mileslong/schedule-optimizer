import React from 'react';
import Filter from './filter/filter';
import CourseList from './courseList/courseList';

export default class Schedule extends React.Component {
  constructor() {
    super()
    this.state = {
      scheduleData: {},
      terms: [],
      searchCriteria: {
        avalibility: {},
        subjects: []
      },
      coursesToDisplay: []
    }
    this.updateSearchCriteria = this.updateSearchCriteria.bind(this);
  }

  updateSearchCriteria(searchCriteria) {
<<<<<<< HEAD
    console.log(searchCriteria);
=======
    var allCourses = [];
    console.log(this.state.scheduleData);

    this.state.scheduleData[0].terms[0].subjects.forEach(subject => {
      //  Add dept info to course.
      var subjectName = subject.name;
      var subjectCode = subject.code;

      subject.courses.forEach(course => {
        course.subject = subjectName;
        course.code = subjectCode;
        allCourses.push(course);
      });
    });
    var filteredCourses = allCourses.filter(course => {
      //  Filter by Subject
      var index = searchCriteria.subjects.indexOf(course.subject);
      if (index  == -1) {
        return false;
      }
      return true;
    });
>>>>>>> 6e980704fe845da0da352beb1fd48bcb83fb8a49
    this.setState({
      searchCriteria: searchCriteria,
    });
  }

  render() {
    return (
      <div className="container-fluid schedule">
        <h1>Schedule</h1>
        <div className="row">


        </div>
        <div className="row">
          <Filter
            searchCriteria={this.state.searchCriteria}
            scheduleData={this.state.scheduleData}
            onChange={this.updateSearchCriteria}/>

          <CourseList
            searchCriteria={this.state.searchCriteria}
            />
        </div>
      </div>
    );
  }
}
