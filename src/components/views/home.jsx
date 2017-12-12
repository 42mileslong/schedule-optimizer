import React, { Component } from "react";
import { browserHistory } from 'react-router';
export default class Home extends Component {
    componentDidMount() {
        browserHistory.push('/');
    }

    render() {
        return (
            <div className="cover-container">
              <div className="section opener text-center">
                <div className="opener-background background-image-parralax">
                </div>
                <div className="section-content col-8 offset-md-2">
                  <div className="opener-content">
                    <h1 className="opener-title">Schedule Optimizer</h1>
                    <h5 className="opener-subtitle">We generate customized schedules without you wasting time dealing with the details.</h5>
                    <a href="scheduleBuilder" className="opener-button btn btn-outline-light">START HERE</a>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}
