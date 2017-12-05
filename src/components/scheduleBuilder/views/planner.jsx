import React from "react";
import { browserHistory } from 'react-router';

import CourseTable from '../planner/courseTable.jsx';

export default class Planner extends React.Component {
    constructor(props) {
      super(props);
    }

    componentWillMount() {
      console.log("Recieved Props");
      console.log(this.props.courseWork);
      var courseWork = this.props.courseWork;
    }

    render() {
      var courseWork = this.props.courseWork;
      return (
          <div className="container-fluid">
            <br />
            <div className="row">
              <div className="col-4 mx-auto">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => this.props.setView("explorer")}>Previous Step: Explorer</button>
              </div>
              <div className="col-4">
                <h1 className="text-center">Planner</h1>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => this.props.setView("builder")}>Next Step: Builder</button>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-6">
                <h3 className="text-center">Required Courses</h3>
                <CourseTable courses={courseWork.requiredCourses}/>
              </div>
              <div className="col-6">
                <h3 className="text-center">Preferred Courses</h3>
                <CourseTable courses={courseWork.preferredCourses}/>
              </div>
            </div>
          </div>
      );
    }
}
