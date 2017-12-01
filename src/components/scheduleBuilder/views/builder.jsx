import React from 'react';

export default class Builder extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <br />
        <div className="row">
          <div className="col-4 mx-auto">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => this.props.setView("planner")}>Previous Step: Planner</button>
          </div>
          <div className="col-4">
            <h1 className="text-center">Builder</h1>
          </div>
        </div>
        <br />
        <div className="row">

        </div>
      </div>
    )
  }

}
