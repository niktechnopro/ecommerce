import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import Student from './Student';
import NavBar from './NavBar';
import 'normalize.css/normalize.css';

// get createStore method from the redux module as well as the apply MiddleWare method
import {createStore, applyMiddleware} from 'redux'; //these are in brockets - they imported as specific methods

// createStore needs a reducer/ specifically a Root reducer
import RootReducer from './reducers/RootReducer';

ReactDOM.render(
	<App />, 
	document.getElementById('root')
	);
// registerServiceWorker();
//we have made a temp component called student