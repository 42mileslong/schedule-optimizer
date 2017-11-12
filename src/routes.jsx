import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/views/home';
import Explorer from './components/views/explorer';
import Planner from './components/views/planner';

export default (
    <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='explorer' component={Explorer} />
        <Route path='planner' component={Planner} />
    </Route>
);
