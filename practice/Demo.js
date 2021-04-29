import React, { Component, Fragment } from "react";
import "./style.css";
import axios from "axios";
import ChildComponent1 from "./ChildComponent1";
import Boss from "./Boss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
class Demo1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: "",
			showList: []
		};
		this.testAxios = this.testAxios.bind(this);
	}
	render() {
		console.log("render------组件挂载中");
		return (
			<Fragment>
				{/* 注释的写法 */}
				{/* command+/ */}
				<div>
					<label htmlFor="text1">Input something: </label>
					<input
						id="text1"
						className="input"
						value={this.state.inputValue}
						onChange={this.inputChange.bind(this)}
						// ref属性的使用
						ref={input => {
							this.input = input;
						}}
					/>
					<button onClick={this.addItem.bind(this)}>Click me!</button>
				</div>
				<ul
					ref={ul => {
						this.ul = ul;
					}}
				>
					<TransitionGroup>
						{this.state.showList.map((item, index) => {
							return (
								<CSSTransition
									timeout={2000}
									classNames="boss-text"
									unmountOnExit
									appear={true}
									key={item + index}
								>
									<ChildComponent1
										key={index + item}
										// 向子组件传值和函数
										inputItem={item}
										inputIndex={index}
										name="llllasda"
										removeItem={this.removeItem.bind(this)}
									/>
								</CSSTransition>
								// <li
								// 	onClick={this.removeItem.bind(this, index)}
								// 	key={index + item}
								// 	// html解析
								// 	dangerouslySetInnerHTML={{ __html: item }}
								// >
								// </li>
							);
						})}
					</TransitionGroup>
				</ul>
				<Boss></Boss>
			</Fragment>
		);
	}
	inputChange() {
		// console.log(e.target.value);
		this.setState({
			// inputValue: e.target.value
			inputValue: this.input.value
		});
	}

	addItem() {
		if (!this.state.inputValue) {
			return;
		} else {
			this.setState(
				{
					showList: [...this.state.showList, this.state.inputValue],
					inputValue: ""
				},
				() => {
					console.log(
						"异步回调",
						this.ul.querySelectorAll("li").length
					);
				}
			);
		}
		// setState是个异步方法，所以会晚于console.log()方法执行，导致打印的结果不是最新的
		console.log("同步执行", this.ul.querySelectorAll("li").length);
	}

	removeItem(index) {
		// console.log(index);
		// 禁止直接修改state中的值,使用局部变量传递
		let showList = this.state.showList;
		showList.splice(index, 1);
		this.setState({
			showList: showList
		});
	}
	testAxios() {
		axios
			.get("http://rap2api.taobao.org/app/mock/232271/example/item-list")
			.then(res => {
				console.log(JSON.stringify(res.data.data));
				let list = [];
				res.data.data.forEach((item, index) => {
					list.push(item.rate);
				});
				this.setState({
					showList: list
				});
			})
			.catch(e => console.log(e));
	}

	// 生命周期
	componentWillMount() {
		console.log(
			"componentWillMount-----将要挂载到页面,也可以进行数据请求axios,不推荐"
		);
	}
	componentDidMount() {
		console.log(
			"componentDidMount-----已经挂载到页面,可以进行数据请求axios"
		);
		this.testAxios();
	}

	shouldComponentUpdate() {
		console.log("shouldComponentUpdate-----组件更新");
		return true;
	}
	componentWillUpdate() {
		console.log("componentWillUpdate-----");
	}
	// render(){}
	componentDidUpdate() {
		console.log("componentDidUpdate-----");
	}
	// 组件第一次存在于DOM中，函数是不会执行的
	// 如果已经存在于DOM中，函数才会执行
	componentWillReceiveProps() {
		console.log("child-componentWillReceiveProps-------");
	}
	componentWillUnmount() {
		console.log("child-componentWillUnmount-------");
	}
}

export default Demo1;
