import React from "react";
import "antd/dist/antd.css";
import { Input, Button, List } from "antd";
// 无状态组件:没有任何逻辑，只有UI
const TodoListUI = props => {
	return (
		<div style={{ margin: "10px" }}>
			<div>
				<Input
					placeholder={props.inputValue}
					style={{ width: "250px", marginRight: "10px" }}
					onChange={props.changeInputValue}
					allowClear
				/>
				<Button onClick={props.clickBtn}>ADD ITEM</Button>
			</div>
			<div style={{ margin: "10px", width: "300px" }}>
				<List
					bordered
					dataSource={props.list}
					renderItem={(item, index) => (
						<List.Item
							onClick={
								() => {
									props.deleteItem(index);
								}
								// this.props.deleteItem.bind( this, index)
							}
						>
							{item}
						</List.Item>
					)}
				></List>
			</div>
		</div>
	);
};

export default TodoListUI;
