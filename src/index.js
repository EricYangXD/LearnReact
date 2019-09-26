import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
// import App from "./NewComponent";
// import TodoList from "./TodoList";
import Todo from "./Todo";
import { Provider } from "react-redux";
import store from "./store/todo";

const App = (
	// 将store共享给<Provider/>内部的所有组件，通过connect连接器连接
	<Provider store={store}>
		<Todo />
	</Provider>
);

// 自定义组件名首字母大写
ReactDOM.render(App, document.getElementById("root"));
