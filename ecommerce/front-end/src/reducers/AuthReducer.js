// a reducer is a function that returns a piece of state


export default function(state = [], action){
	console.log("from authReducer.js", action)
	switch(action.type){
		case "AUTH_ACTION":
			console.log(action.payload);
			//var newState = {...state};
			//I am going to update. I care about this action
			return action.payload.data;
			break;
		case 'LOGOUT':
			return [];
			break;
		default:
			return state;
	}
	// if(action.type === 'AUTH_ACTION'){
	// 	//var newSate = {...state}
	// 	// I'm going to update. I care about this action
	// 	return action.payload.data//new state and not what it used to be - moves it to mapStateToProps
	// }else if(action.type === "LOGOUT"){
	// 	return [];
	// }else{
	// 	// I don't care about this action. i am going to return what I already had.
	// 	return state;
	// }

	console.log(action)
}

