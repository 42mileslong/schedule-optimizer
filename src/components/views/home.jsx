import React, { Component } from "react";
import { browserHistory } from 'react-router';
export default class Home extends Component {
    componentDidMount() {
        browserHistory.push('/');
    }

    render() {
        return (
            <div className="cover-container">
              <div className="section opener-background">
                <div className="opener text-center">
                  <br/><br/><br/><br/><br/><br/>
                  <div>
                    <h1 className="opener-title">Schedule Optimizer</h1>
                    <h5 className="opener-subtitle">registration simplified.</h5>
                  </div>
                  <br/><br/>
                  <div>
                    <a href="scheduleBuilder" className="opener-button btn btn-outline-light">Start Generating Custom Schedules</a>
                  </div>
                </div>
              </div>
              <div className="section text-center">
                <div className="section-content">
                  <h1 classNAme="section-header">Dynamically Created Schedules</h1>
                  <div className="row">
                    <div className="col-4">

                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}
