import {
	ADD_ITEM,
	DELETE_ITEM,
	CHANGE_INPUT_VALUE,
	GET_LIST
} from "./actionTypes";
const defaultState = {
	inputValue: "Type something here!",
	list: ["adasdasdf", "asdasdasd", "qweqweqew", "wtyrtyryt"]
};
export default (state = defaultState, action) => {
	// console.log(state, action);
	// reducer里只能接收state不能改变state
	// reducer必须是纯函数，不能做其余操作
	if (action.type === CHANGE_INPUT_VALUE) {
		let newState = JSON.parse(JSON.stringify(state));
		newState.inputValue = action.value;
		return newState;
	}
	if (action.type === ADD_ITEM) {
		let newState = JSON.parse(JSON.stringify(state));
		newState.list.push(newState.inputValue);
		// newState.inputValue = "";
		return newState;
	}
	if (action.type === DELETE_ITEM) {
		let newState = JSON.parse(JSON.stringify(state));
		newState.list.splice(action.index, 1);
		return newState;
	}
	if (action.type === GET_LIST) {
		let newState = JSON.parse(JSON.stringify(state));
		newState.list = action.data;
		return newState;
	}
	return state;
};
