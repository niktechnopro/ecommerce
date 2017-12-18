import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
// import Student from './Student';
// import NavBar from './NavBar';
import 'normalize.css/normalize.css';


// get createStore method from the redux module as well as the apply MiddleWare method
import {createStore, applyMiddleware} from 'redux'; //these are in brockets - they imported as specific methods

// createStore needs a reducer/ specifically a Root reducer
import RootReducer from './reducers/RootReducer';
// we are going to need ajax a lot. we will use it in our Redux Actions which means... we need redux-promise
import reduxPromise from 'redux-promise';
// create the store ... the ugly way
import { Provider } from 'react-redux';

//all imports must be before first const

const theStore = applyMiddleware(reduxPromise)(createStore)(RootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//the friendly way/...the next 3 lines are the same as line above
// const middleWare = applyMiddleware(reduxPromise);
// const storeWithMid = middleWare(createStore);
// const theStore = storeWithMid(RootReducer);//store with middleware

//monitor store update
theStore.subscribe(()=>{
	console.log("store updated", theStore.getState());
})

console.log('this is the store', theStore);
// if I see x()() - x is returning a function and that function also returning a function
// We have set up Redux. Now we need a way to tell React about it - anser: PROVIDER!

// Hand render the Provide and hand Provider theStore
// Put App inside of the provider, so that everything inside of App,

// will know about the Provider/theStore
ReactDOM.render(
	<Provider store={theStore} >
		<App />
	</Provider>, 
	document.getElementById('root')
	);
// registerServiceWorker();
//we have made a temp component called student