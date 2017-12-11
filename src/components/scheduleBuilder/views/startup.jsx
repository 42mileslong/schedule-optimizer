import React from 'react';

import TermSelector from '../startup/termSelector';

export default class Startup extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="container-fluid startup-content">
        <br />
        <div className="row">
          <div className="col-4 offset-md-4 text-center">
            <h1>Startup</h1>
          </div>
          <div className="col-4" style={{'text-align' : 'right'}}>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              disabled={this.props.config.term.name ? false : true}
              onClick={() => this.props.setView("explorer")}>Next Step: Explorer</button>
          </div>
        </div>
        <br />
        <div className="row">
          <TermSelector
            selectConfig={this.props.selectConfig}
            selectCourses={this.props.selectCourses}
            config={this.props.config}/>
        </div>
        <br />

      </div>
    )
  }
}
