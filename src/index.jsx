import React from 'react';
import ReactDom from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import 'bootstrap';

require('bootstrap');
import 'bootstrap/dist/css/bootstrap.min.css';

require('./stylesheets/base.scss');
require('./stylesheets/explorer.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseWork: {
        requiredCourses: [],
        preferedCourses: []
      }
    }
    this.selectCourses = this.selectCourses.bind(this);
  }

  selectCourses(type, courses) {
    var state = this.state;
    state[type] = courses;
    this.setState(state);
    sessionStorage.setItem("state", this.state);
  }

  render() {
    //  routes(this) passes modification methods to Routes
    return (
      <Router
        history={browserHistory}
        routes={routes(this)} />
    )
  }
}

ReactDom.render(
    <App />,
    document.querySelector('#app')
);
