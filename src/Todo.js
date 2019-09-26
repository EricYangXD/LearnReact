import React, { Fragment } from "react";
// import React, { Component, Fragment } from "react";
// import axios from "axios";
import { Button, Input } from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";

// 无状态组件化
const Todo = props => {
	let { inputChange, inputValue, list, addTodoItem, removeTodoItem } = props;
	return (
		<Fragment>
			<Input
				style={{ width: "250px", marginRight: "10px" }}
				allowClear
				value={inputValue}
				onChange={inputChange}
			></Input>
			<Button onClick={addTodoItem}>Add item</Button>
			<div>
				<ul>
					{list.map((item, index) => {
						return (
							<li
								key={item + index}
								onClick={removeTodoItem.bind(this, index)}
							>
								{item}
							</li>
						);
					})}
				</ul>
			</div>
		</Fragment>
	);
};

// 非无状态组件
// class Todo extends Component {
// 	render() {
// 		let {
// 			inputChange,
// 			inputValue,
// 			list,
// 			addTodoItem,
// 			removeTodoItem
// 		} = this.props;
// 		return (
// 			<Fragment>
// 				<Input
// 					style={{ width: "250px", marginRight: "10px" }}
// 					allowClear
// 					value={inputValue}
// 					onChange={inputChange}
// 				></Input>
// 				<Button onClick={addTodoItem}>Add item</Button>
// 				<div>
// 					<ul>
// 						{list.map((item, index) => {
// 							return (
// 								<li
// 									key={item + index}
// 									onClick={removeTodoItem.bind(this, index)}
// 								>
// 									{item}
// 								</li>
// 							);
// 						})}
// 					</ul>
// 				</div>
// 			</Fragment>
// 		);
// 	}
// }
// 连接器的映射关系配置
const stateToProps = state => {
	return {
		inputValue: state.inputValue,
		list: state.list
	};
};

const dispatchToProps = dispatch => {
	return {
		inputChange(e) {
			let action = {
				type: "todo_input_change",
				value: e.target.value
			};
			dispatch(action);
		},
		addTodoItem() {
			let action = {
				type: "add_item"
			};
			dispatch(action);
		},
		removeTodoItem(index) {
			let action = {
				type: "remove_item",
				index
			};
			console.log(index);
			dispatch(action);
		}
	};
};

export default connect(
	stateToProps,
	dispatchToProps
)(Todo);
