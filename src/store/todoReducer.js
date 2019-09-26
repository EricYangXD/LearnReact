const defaultState = {
	inputValue: "Type something here!",
	list: ["adasdasdf", "asdasdasd", "qweqweqew", "wtyrtyryt"]
};

export default (state = defaultState, action) => {
	if (action.type === "todo_input_change") {
		let newState = JSON.parse(JSON.stringify(state));
		newState.inputValue = action.value;
		return newState;
	}
	if (action.type === "add_item") {
		let newState = JSON.parse(JSON.stringify(state));
		newState.list.push(newState.inputValue);
		newState.inputValue = "";
		return newState;
	}
	if (action.type === "remove_item") {
		let newState = JSON.parse(JSON.stringify(state));
		newState.list.splice(action.index, 1);
		return newState;
	}

	return state;
};
