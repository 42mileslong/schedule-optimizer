import React from 'react';
import ReactDom from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import 'bootstrap';

require('bootstrap');
import 'bootstrap/dist/css/bootstrap.min.css';

require('./stylesheets/base.scss');
require('./stylesheets/explorer.scss');

ReactDom.render(
    <Router history={browserHistory} routes={routes} />,document.querySelector('#app')
);
