import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';
import './styles/styles.scss';
import Main from './main';
import './i18n';

ReactDOM.render(
  <Provider store={store as any}>
    <Main />
  </Provider>,
  document.getElementById('root')
);

