/* eslint-disable no-underscore-dangle, global-require */

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl-redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers';


import ExampleContainer from './containers/example.container';

import './app.component.scss';
import './images/favicon.ico';


const composeEnhancers = (process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const initialState = {
  intl: {
    locale: 'en',
  },
};

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk)),
);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./redux/reducers', () => {
    const nextRootReducer = require('./redux/reducers').default;
    store.replaceReducer(nextRootReducer);
  });
}


@hot(module)
export default class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router>
            <Route path="/" component={ExampleContainer} />
          </Router>
        </IntlProvider>
      </Provider>
    );
  }
}
