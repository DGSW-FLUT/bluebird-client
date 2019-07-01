import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import stores from './stores';

import App from './containers/App';

const Root = () => (
  <Provider {...stores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

export default Root;
