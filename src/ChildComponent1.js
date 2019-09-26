import React, { Component } from "react";
import PropTypes from "prop-types"; //用于进行数据校验，防止后期出现逻辑错误

class ChildComponent1 extends Component {
	constructor(props) {
		super(props);
		// 在构造函数里绑定有利于性能优化且方便
		this.handleClick = this.handleClick.bind(this);
	}
	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.inputItem !== this.props.inputItem) {
			return true;
		} else {
			return false;
		}
		// 阻止子组件不必要的更新
	}
	render() {
		return (
			<li onClick={this.handleClick}>
				{this.props.name}--{this.props.inputItem}
			</li>
		);
	}

	handleClick() {
		console.log(this.props.inputIndex);
		// 调用父组件的函数
		this.props.removeItem(this.props.inputIndex);
	}
}
// 要检验的数据,注意大小写的区别
ChildComponent1.propTypes = {
	inputIndex: PropTypes.number,
	// inputItem: PropTypes.number.isRequired,
	removeItem: PropTypes.func
};
ChildComponent1.defaultProps = {
	name: "asdasdad"
};
export default ChildComponent1;
