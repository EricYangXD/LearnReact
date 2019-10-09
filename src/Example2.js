import React, { useState, Component } from "react";
// Hooks 方式
function Example2() {
	const [age, setAge] = useState(26); //数组解构并设置初始值10
	const [gender, setGender] = useState("Male"); //数组解构并设置初始值10
	const [career, setCareer] = useState("Front-end Engineer"); //数组解构并设置初始值10
	return (
		<div>
			<p>I am Eric Yang, I am {age} years old.</p>
			<p>I am a {gender}.</p>
			<p>My job is {career}</p>
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

export default Example2;
