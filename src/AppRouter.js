import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Index from "./pages/Index";
import List from "./pages/List";
import Home from "./pages/Home";
// 路由传值步骤：
// 1.设置规则：在<Route>中path后设置规则，即指明传参的意义
// 2.传递值  ：浏览器直接输入或
// 3.接收值  ：在组件中使用this.props.match.params获取对应的值，然后通过setState设置
// 4.显示内容：直接通过this.state获取值

function AppRputer() {
	return (
		<Router>
			<ul>
				<li>
					<Link to="/">FirstPage</Link>
				</li>
				<li>
					<Link to="/list/">List</Link>
				</li>
			</ul>
			{/* exact:精确匹配,一般首页需要 */}
			<Route path="/" exact component={Index} />
			<Route path="/list/:id" component={List} />
			<Route path="/Home/" component={Home} />
		</Router>
	);
}

export default AppRputer;
