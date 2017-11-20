import React from 'react';
import Explorer from './../scheduleBuilder/views/explorer';
import Planner from './../scheduleBuilder/views/planner';
import Startup from './../scheduleBuilder/views/startup';

export default class ScheduleBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseWork: {
        requiredCourses: [],
        preferedCourses: []
      },
      view: "startup"
    }
    this.selectCourses = this.selectCourses.bind(this);
    this.setView = this.setView.bind(this);
  }

  selectCourses(type, courses) {
    var state = this.state;
    state.courseWork[type] = courses;
    console.log("Setting Course");
    console.log(state.courseWork[type]);
    this.setState(state);
  }

  setView(view) {
    this.setState({
      view: view
    });
  }

  renderSection() {
    var view = this.state.view;
    if (view == "explorer") {
      return (
        <Explorer
          selectCourses={this.selectCourses}
          courseWork={this.state.courseWork}/>
      );
    } else if (view == "planner") {
      return (
        <Planner
          courseWork={this.state.courseWork}/>
      )
    } else if (view == "startup") {
      return (
        <Startup
          courseWork={this.state.courseWork} />
      )
    }
  }
  render() {
    return (
      <div>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={() => this.setView("startup")}>Startup</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={() => this.setView("explorer")}>Explorer</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={() => this.setView("planner")}>Planner</button>
          </li>
        </ul>
        {  this.renderSection()}
      </div>

    )


  }
}
