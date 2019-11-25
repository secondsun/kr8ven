import React from "react";
import ReactDOM from "react-dom";
import { App } from '@app/index';
import { Provider } from 'react-redux'
import configureStore from './store';

if (process.env.NODE_ENV !== "production") {
  // tslint:disable-next-line
  const axe = require("react-axe"); // eslint-disable-line
  axe(React, ReactDOM, 1000);
}

ReactDOM.render( 
  
  <Provider store={configureStore()}>
    <App />
  </Provider>, 
  
  document.getElementById("root") as HTMLElement);
