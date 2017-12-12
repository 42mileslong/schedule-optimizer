import React from 'react';
import ScheduleView from './../builder/scheduleView';

// This page displays finished schedules to the user
export default class Builder extends React.Component {
  render() {
    var courses = this.props.courseWork.requiredCourses;
    return (
      <div className="container-fluid">
        <br />
        <div className="row">
          <div className="col-4">
            <button
              type="button"
              className="btn btn-outline-primary btn-lg"
              onClick={() => this.props.setView("planner")}>Previous Step: Planner</button>
          </div>
          <div className="col-4" style={{'text-align' : 'right'}}>
            <h1 className="text-center">Builder</h1>
          </div>
        </div>
        <br />
        <div className="scheduleView">
          <ScheduleView
            config={this.props.config}
            courses={courses}
            />
        </div>
      </div>
    )
  }

}
