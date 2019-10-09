import React, { useState, createContext, useContext } from "react";
// useContext:父子组件间的传值
// useReducer:状态管理
const CountContext = createContext();

function Counter() {
	// 子组件中直接接收父组件传的的数据
	let count = useContext(CountContext);
	return <h1>{count}</h1>;
}
// Hooks 方式
function Example4() {
	const [count, addCount] = useState(0); //数组解构并设置初始值
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
			{/* CountContext.Provider 提供要传递的数据，并包裹子组件 */}
			<CountContext.Provider value={count}>
				<Counter />
			</CountContext.Provider>
		</div>
	);
}

export default Example4;
