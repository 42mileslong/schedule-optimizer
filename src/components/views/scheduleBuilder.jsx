import React from 'react';
import Explorer from './../scheduleBuilder/views/explorer';
import Planner from './../scheduleBuilder/views/planner';
import Startup from './../scheduleBuilder/views/startup';
import Builder from './../scheduleBuilder/views/builder';

export default class ScheduleBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCriteria: {
        avalibility: {},
        subjects: [],
        creditHours: [],
        textSearch: ""
      },
      courseWork: {
        requiredCourses: [],
        preferredCourses: []
      },
      config: {
        term: {}
      },
      view: "startup"
    }

    this.updateSearchCriteria = this.updateSearchCriteria.bind(this);
    this.selectConfig = this.selectConfig.bind(this);
    this.selectCourses = this.selectCourses.bind(this);
    this.setView = this.setView.bind(this);
  }

  updateSearchCriteria(searchCriteria) {
    this.setState({
      searchCriteria: searchCriteria,
    });
  }

  selectConfig(type, value) {
    var config = this.state.config;
    config[type] = value;
    console.log("Setting Config");
    console.log(config[type]);
    this.setState({
      config: config
    });
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
          courseWork={this.state.courseWork}
          config={this.state.config}
          searchCriteria={this.state.searchCriteria}
          updateSearchCriteria={this.updateSearchCriteria}
          setView={this.setView}/>
      );
    } else if (view == "planner") {
      return (
        <Planner
          courseWork={this.state.courseWork}
          setView={this.setView}/>
      )
    } else if (view == "startup") {
      return (
        <Startup
          selectConfig={this.selectConfig}
          selectCourses={this.selectCourses}
          courseWork={this.state.courseWork}
          config={this.state.config}
          setView={this.setView}/>
      )
    } else if (view == "builder") {
      return (
        <Builder
          selectConfig={this.selectConfig}
          courseWork={this.state.courseWork}
          config={this.state.config}
          setView={this.setView}/>
      )

    }
  }
  render() {
    return (
      <div className="section scheduleBuilder">
        <div className="scheduleBuilder-background background-image-parralax">
        </div>
        <div className="section-content">
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => this.setView("startup")}>Startup</button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                disabled={this.state.config.term.name ? false : true}
                onClick={() => this.setView("explorer")}>Explorer</button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                disabled={this.state.config.term.name ? false : true}
                onClick={() => this.setView("planner")}>Planner</button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                disabled={
                  this.state.config.term.name ? (
                    this.state.courseWork.requiredCourses.length > 0 ? false : true
                  ) : true
                }
                onClick={() => this.setView("builder")}>Builder</button>
            </li>
          </ul>
          <div>
            {  this.renderSection()}
          </div>
        </div>
      </div>

    )


  }
}
