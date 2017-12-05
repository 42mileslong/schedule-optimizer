import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/views/home';
import ScheduleBuilder from './components/views/scheduleBuilder';

export default function(obj) {
  return (
      <Route path='/' component={App}>
          <IndexRoute component={Home} />
          <Route
            path='scheduleBuilder'
            component={ScheduleBuilder}/>
      </Route>
  )
};
