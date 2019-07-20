import React from 'react';
import { Route } from 'react-router-dom';

const RouteLayout = ({ layout: Layout, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      )
    }
  />
);

export default RouteLayout;
