import React, { Component } from "react";
import "antd/dist/antd.css";
import { Input, Button, List } from "antd";
// 有状态组件
class TodoListUI extends Component {
	render() {
		return (
			<div style={{ margin: "10px" }}>
				<div>
					<Input
						placeholder={this.props.inputValue}
						style={{ width: "250px", marginRight: "10px" }}
						onChange={this.props.changeInputValue}
						allowClear
					/>
					<Button onClick={this.props.clickBtn}>ADD ITEM</Button>
				</div>
				<div style={{ margin: "10px", width: "300px" }}>
					<List
						bordered
						dataSource={this.props.list}
						renderItem={(item, index) => (
							<List.Item
								onClick={
									() => {
										this.props.deleteItem(index);
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
	}
}

export default TodoListUI;
