// This is a master or root reducer
// Each reducer contains a piece of state
// The root reducer contains all the reducers
// I.e., the root reducer contains ALL pieces of state.
// or the entire application state/

// in order to get all the "little" reducers or pieces of state into one big.
// "root" reducer, we need the combineReducers method from redux
import { combineReducers } from 'redux';

// Import each individual reducer to hand to combineReducers
// First: AuthReducer - for authentication
import AuthReducer from './AuthReducer';
import ProductLineReducer from './ProductLineReducer';

// combineReducers takes an object as an arg
// that arg has key:value pair = stateName: reducerFunction
// the redecerFunction will return a value

const rootReducer = combineReducers({
	auth: AuthReducer,
	pl: ProductLineReducer
})

export default rootReducer;
