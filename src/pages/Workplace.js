import React from "react";
import { Route, Link } from "react-router-dom";
import Getup from "./workplace/Getup";
import Money from "./workplace/Money";

function Workplace() {
	return (
		<div>
			<div className="topNav">
				<ul>
					<li>
						<Link to="/workplace/money">Money 教程</Link>
						<Link to="/workplace/getup">Getup 教程</Link>
					</li>
				</ul>
			</div>
			<div className="videoContent">
				<div>
					<h3>职场技能</h3>
				</div>
				<Route path="/workplace/money/" component={Money}></Route>
				<Route path="/workplace/getup/" component={Getup}></Route>
			</div>
		</div>
	);
}

export default Workplace;
