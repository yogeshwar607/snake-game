import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {PlayerEntry, GameSelection} from './components'
import * as serviceWorker from './serviceWorker';
import { Router } from '@reach/router'

ReactDOM.render(
 
   <Router>
     <App path="/" />
    <PlayerEntry  path="/playerentry"/>
    <GameSelection  path="/gameselection"/>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
