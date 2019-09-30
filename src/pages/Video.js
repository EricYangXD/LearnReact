import React from "react";
import { Route, Link } from "react-router-dom";
import Flutter from "./video/Flutter";
import ReactPages from "./video/ReactPages";
import Vuejs from "./video/Vuejs";

function Video() {
	return (
		<div>
			<div className="topNav">
				<ul>
					<li>
						<Link to="/video/reactpages">React 教程</Link>
						<Link to="/video/flutter">Flutter 教程</Link>
						<Link to="='/video/vuejs">Vuejs 教程</Link>
					</li>
				</ul>
			</div>
			<div className="videoContent">
				<div>
					<h3>视频教程</h3>
				</div>
				<Route path="/video/reactpages/" component={ReactPages}></Route>
				<Route path="/video/flutter/" component={Flutter}></Route>
				<Route path="/video/vuejs/" component={Vuejs}></Route>
			</div>
		</div>
	);
}

export default Video;
