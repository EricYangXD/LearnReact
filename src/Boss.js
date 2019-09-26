import React, { Component, Fragment } from "react";
// import PropTypes from "prop-types";

import { CSSTransition } from "react-transition-group";
// Transition
// CSSTransition
// TransitionGroup

class Boss extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShow: true
		};
		this.toToggle = this.toToggle.bind(this);
	}
	render() {
		return (
			<Fragment>
				<CSSTransition
					in={this.state.isShow}
					timeout={2000}
					classNames="boss-text"
					unmountOnExit
				>
					<div>Boss级人物--孙悟空</div>
				</CSSTransition>
				{/* <div className={this.state.isShow ? "show" : "hide"}>
					Boss级人物--孙悟空
				</div> */}
				<div>
					<button onClick={this.toToggle}>召唤Boss</button>
				</div>
			</Fragment>
		);
	}
	toToggle() {
		this.setState({
			isShow: !this.state.isShow
		});
	}
}

export default Boss;
