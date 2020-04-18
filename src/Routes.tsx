import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { routes } from './constants';

import { RouteNotFound } from './pages';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(({ component: Component, ...otherProps }) => (
          <Route key={otherProps.path} {...otherProps}>
            <Component />
          </Route>
        ))}
        <Route component={RouteNotFound} />
      </Switch>
    </BrowserRouter>
  );
}
