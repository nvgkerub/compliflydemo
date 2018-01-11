import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import ReduxThunk from 'redux-thunk';
import reducers from '../../reducers';
import AppWithNavigationState from '../../Router';
// import store from '../../Store';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;
