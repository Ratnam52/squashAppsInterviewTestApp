import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { TabScreen } from './components';
import store from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <TabScreen />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

