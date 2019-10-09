import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Index() {
	useEffect(() => {
		console.log("Index mounted");
		return () => {
			console.log("Index unmounted");
		};
	}, []);
	return <h2>Index</h2>;
}
function List() {
	useEffect(() => {
		console.log("List mounted");
		return () => {
			console.log("List unmounted");
		};
	}, []);
	return <h2>List</h2>;
}

// Hooks 方式
function Example() {
	const [count, addCount] = useState(0); //数组解构并设置初始值
	// useState不能存在于判断语句之中
	//相当于
	// let _useState=userState(0);
	// const count=_useState[0]
	// const addCount=_useState[1]
	// 使用useEffect代替生命周期函数钩子：是个异步执行的
	// componentDidMount 和 componentDidUpdate
	useEffect(() => {
		console.log(`useEffect ----> You clicked ${count} times.`);
		return () => {
			console.log("===========================");
		};
	}, [count]);
	return (
		<div>
			<p>You clicked {count} times</p>
			<button
				onClick={() => {
					addCount(count + 1);
				}}
			>
				Click me!
			</button>
			<Router>
				<ul>
					<li>
						<Link to="/">Index</Link>
					</li>
					<li>
						<Link to="/list/">List</Link>
					</li>
				</ul>
				<Route path="/" exact component={Index}></Route>
				<Route path="/list/" component={List}></Route>
			</Router>
		</div>
	);
}

// Class 方式
// class Example extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			count: 0
// 		};
// 	}
// 	render() {
// 		return (
// 			<div>
// 				<p>You clicked {this.state.count} times</p>
// 				<button onClick={this.btnClick.bind(this)}>Click me!</button>
// 			</div>
// 		);
// 	}
// 	btnClick() {
// 		this.setState({
// 			count: this.state.count + 1
// 		});
// 	}
// }

export default Example;
