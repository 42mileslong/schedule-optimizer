import React from 'react';

import TermSelector from '../startup/termSelector';

export default class Startup extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="container-fluid">
        <br />
        <div className="row">
          <div className="col-12 text-center">
            <h1>Startup</h1>
          </div>
        </div>
        <br />
        <div className="row">
          <TermSelector
            selectConfig={this.props.selectConfig}
            config={this.props.config}/>
        </div>
      </div>
    )
  }
}
