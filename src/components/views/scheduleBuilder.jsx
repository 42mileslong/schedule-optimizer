import React from 'react';
import Explorer from './../scheduleBuilder/views/explorer';
import Planner from './../scheduleBuilder/views/planner';
import Startup from './../scheduleBuilder/views/startup';
import Builder from './../scheduleBuilder/views/builder';

// Main encompassing class for schedule builder page
export default class ScheduleBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Search criteria for explorer page, maintained between pages so the user
      // can return to their query later
      searchCriteria: {
        avalibility: {},
        subjects: [],
        creditHours: [],
        textSearch: ""
      },
      // Selected coursework, to be submitted to optimizer
      courseWork: {
        requiredCourses: [],
        preferredCourses: []
      },
      // Configuration (term) selected by the user
      config: {
        term: {}
      },
      // Current 'tab' open (starts at 'startup' page)
      view: "startup"
    }

    this.updateSearchCriteria = this.updateSearchCriteria.bind(this);
    this.selectConfig = this.selectConfig.bind(this);
    this.selectCourses = this.selectCourses.bind(this);
    this.setView = this.setView.bind(this);
  }

  /**
    * Updates the Explorer page's search criteria, updating this class's state
    *
    * @param {Object} searchCriteria  The new searchCriteria object
    */
  updateSearchCriteria(searchCriteria) {
    this.setState({
      searchCriteria: searchCriteria,
    });
  }

  /**
    * Selects a specific option in the builder's config
    *
    * @param {String} type   The string key in the builder's config to modify
    * @param {Object} value  The new value for that config option
    */
  selectConfig(type, value) {
    var config = this.state.config;
    config[type] = value;
    console.log("Setting Config");
    console.log(config[type]);
    this.setState({
      config: config
    });
  }

  /**
    * Updates the user's selected coursework, for a given type (preferredCourses,
    * requiredCourses)
    *
    * @param {String} type  The course type to update (preferredCourses, requiredCourses)
    * @param {Array} value  The new array of courses
    */
  selectCourses(type, courses) {
    var state = this.state;
    state.courseWork[type] = courses;
    console.log("Setting Course");
    console.log(state.courseWork[type]);
    this.setState(state);
  }

  /**
    * Sets the view that the user is currently looking at
    *
    * @param {String} view  The title of the view to make active ('startup', 'builder')
    */
  setView(view) {
    this.setState({
      view: view
    });
  }

  /**
    * Renders the main content of the page
    */
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
          selectCourses={this.selectCourses}
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
                className={"nav-link btn btn-link " + (this.state.view === "startup" ? "selected" : "")}
                onClick={() => this.setView("startup")}>Welcome</button>
            </li>
            <li className="nav-item">
              <button
                className={"nav-link btn btn-link " + (this.state.view === "explorer" ? "selected" : "")}
                disabled={this.state.config.term.name ? false : true}
                onClick={() => this.setView("explorer")}>Explorer</button>
            </li>
            <li className="nav-item">
              <button
                className={"nav-link btn btn-link " + (this.state.view === "planner" ? "selected" : "")}
                disabled={this.state.config.term.name ? false : true}
                onClick={() => this.setView("planner")}>Planner</button>
            </li>
            <li className="nav-item">
              <button
                className={"nav-link btn btn-link " + (this.state.view === "builder" ? "selected" : "")}
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
