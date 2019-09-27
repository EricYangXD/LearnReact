import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [
				{ cid: 123, title: "Page AAA" },
				{ cid: 456, title: "Page BBB" },
				{ cid: 789, title: "Page CCC" }
			]
		};
		// 重定向 方法2
		this.props.history.push("/home/");
	}
	render() {
		return (
			<div>
				{/* 重定向 方法1
                <Redirect to="/home/" /> */}
				<h2>Reacr Router Dom</h2>
				<ul>
					{this.state.list.map((item, index) => {
						return (
							<li key={index}>
								<Link to={"/list/" + item.cid}>
									{item.title}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default Index;
