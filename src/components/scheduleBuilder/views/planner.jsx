import React from "react";
import { browserHistory } from 'react-router';

import CourseTable from '../planner/courseTable.jsx';

// The Planner displays the user's selected courses, a place that the user can
// quickly remove chosen courses and mull over their total credit hours
export default class Planner extends React.Component {
    constructor(props) {
      super(props);
    }

    componentWillMount() {
      // Load coursework
      console.log("Recieved Props");
      console.log(this.props.courseWork);
      var courseWork = this.props.courseWork;
    }

    render() {
      var courseWork = this.props.courseWork;
      // Only allow the user to go to the next page once a year/term is picked
      return (
          <div className="container-fluid">
            <br />
            <div className="row">
              <div className="col-4 mx-auto">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-lg"
                  onClick={() => this.props.setView("explorer")}>Previous Step: Explorer</button>
              </div>
              <div className="col-4">
                <h1 className="text-center">Planner</h1>
              </div>
              <div className="col-4" style={{'text-align' : 'right'}}>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-lg"
                  disabled={
                    courseWork.requiredCourses.length > 0 ? false : true
                  }
                  onClick={() => this.props.setView("builder")}>Next Step: Builder</button>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-6">
                <h3 className="text-center">Required Courses</h3>
                <CourseTable
                  courseType="requiredCourses"
                  courseWork={this.props.courseWork}
                  selectCourses={this.props.selectCourses}/>
              </div>
              <div className="col-6">
                <h3 className="text-center">Preferred Courses</h3>
                <CourseTable
                  courseType="preferredCourses"
                  courseWork={this.props.courseWork}
                  selectCourses={this.props.selectCourses}/>
              </div>
            </div>
          </div>
      );
    }
}
