import React, { Component } from "react";
// import PropTypes from "prop-types";
import store from "./store";
// import axios from "axios";
import {
	changeInputValueAction,
	addItemAction,
	deleteItemAction,
	// getListAction,
	getTodoList,
	getMyListAction
} from "./store/actionCreators";
// import TodoListUI from "./TodoListUI";
import TodoListUI from "./TodoListUIStateless";

class TodoList extends Component {
	constructor(props) {
		super(props);
		// console.log(store.getState());
		this.state = store.getState();
		this.changeInputValue = this.changeInputValue.bind(this);
		this.clickBtn = this.clickBtn.bind(this);
		this.storeChange = this.storeChange.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		store.subscribe(this.storeChange);
	}
	render() {
		return (
			<TodoListUI
				changeInputValue={this.changeInputValue}
				clickBtn={this.clickBtn}
				storeChange={this.storeChange}
				deleteItem={this.deleteItem}
				inputValue={this.state.inputValue}
				list={this.state.list}
			></TodoListUI>
		);
	}

	componentDidMount() {
		// 不使用redux-chunk的写法
		// axios
		// 	.get(
		// 		"http://rap2api.taobao.org/app/mock/232271/example/item-list"
		// 		// "https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList"
		// 	)
		// 	.then(res => {
		// 		// console.log(res.data.data);
		// 		let data = [];
		// 		res.data.data.forEach((item, index) => {
		// 			data.push(item.rate);
		// 		});
		// 		const action = getListAction(data);
		// 		store.dispatch(action);
		// 	});
		// 使用redux-chunk的写法
		// const action = getTodoList();
		// store.dispatch(action);
		// 使用redux-saga的写法
		const action = getMyListAction();
		store.dispatch(action);
		console.log(action);
	}

	changeInputValue(e) {
		const action = changeInputValueAction(e.target.value);
		store.dispatch(action);
	}
	clickBtn() {
		if (!this.state.inputValue) {
			console.log("null");
			return;
		}
		const action = addItemAction();
		store.dispatch(action);
	}
	deleteItem(index) {
		const action = deleteItemAction(index);
		store.dispatch(action);
	}

	storeChange() {
		this.setState(store.getState());
	}
}

export default TodoList;
