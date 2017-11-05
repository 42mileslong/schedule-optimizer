import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/views/home';
import Explorer from './components/views/explorer';

export default (
    <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='courses' component={Explorer} />
        <Route path='*' component={Home} />
    </Route>
);
