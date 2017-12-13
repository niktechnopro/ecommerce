// a reducer is a function that returns a piece of state


export default function(state = [], action){
	console.log("from authReducer.js", action)
	if(action.type === 'AUTH_ACTION'){
		// I'm going to update. I care about this action
		return action.payload//new state and not what it used to be - moves it to mapStateToProps
	}else{
		// I don't care about this action. i am going to return what I already had.
		return state;
	}
}

