import React from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import Video from "./pages/Video";
import Workplace from "./pages/Workplace";
import "./style.css";

function AppRouter() {
	const dynamicRouter = [
		{ path: "/", component: Index, exact: true, title: "博客首页" },
		{
			path: "/video/",
			component: Video,
			exact: false,
			title: "视频教程"
		},
		{
			path: "/workplace/",
			component: Workplace,
			exact: false,
			title: "职场技能"
		}
	];
	return (
		<Router>
			<div className="mainDiv">
				<div className="leftNav">
					<h3>一级导航</h3>
					<ul>
						{dynamicRouter.map((item, index) => {
							return (
								<li key={index}>
									<Link to={item.path}>{item.title}</Link>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="rightMain">
					{dynamicRouter.map((item, index) => {
						return (
							<Route
								key={index}
								path={item.path}
								component={item.component}
								exact={item.exact}
							></Route>
						);
					})}
				</div>
			</div>
		</Router>
	);
}

export default AppRouter;
