import React from "react";
import { browserHistory } from 'react-router';

import CourseTable from '../planner/courseTable.jsx';

export default class Planner extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        courseWork: {
          requiredCourses:[],
          preferredCourses: []
        }
      }
    }

    componentWillReceiveProps() {
      console.log("Recieved Props");
      console.log(this.props.courseWork);
      var courseWork = this.props.courseWork;
      this.setState({
        courseWork: {
          requiredCourses: courseWork.requiredCourses,
          preferredCourses: courseWork.preferredCourses
        }
      })
    }

    render() {
      var courseWork = this.state.courseWork;
      return (
          <div className="container-fluid">
            <br />
            <div className="row">
              <div className="col-12 text-center">
                <h1>Planner</h1>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-6">
                <h3>Required Courses</h3>
                <CourseTable courses={courseWork.requiredCourses}/>
              </div>
              <div className="col-6">
                <h3>Preferred Courses</h3>
                <CourseTable courses={courseWork.preferredCourses}/>
              </div>
            </div>
          </div>
      );
    }
}
