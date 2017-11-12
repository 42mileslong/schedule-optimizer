import React from "react";
import { browserHistory } from 'react-router';

export default class Planner extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        requiredCourses:[],
        preferredCourses: []
      }
    }
    componentDidMount() {
        browserHistory.push('/planner');
    }

    render() {
        return (
            <div id="planner">This is the planning page.</div>
        );
    }
}
