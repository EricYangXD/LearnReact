import React, { useState, useMemo } from "react";

function Example7() {
	const [xiaohong, setXiaohong] = useState("waiting");
	const [zhiling, setZhiling] = useState("ready");
	return (
		<div>
			<button
				onClick={() => {
					setXiaohong(+new Date().getTime());
				}}
			>
				xianhong
			</button>
			<button
				onClick={() => {
					setZhiling(+new Date().getTime() + "Zhiling changed");
				}}
			>
				zhiling
			</button>
			<ChildComponent name={xiaohong}>{zhiling}</ChildComponent>
		</div>
	);
}

function ChildComponent({ name, children }) {
	function changeXiaohong() {
		console.log("Xiaohong changeXiaohong.");
		return name + "Xiaohong changed.";
	}
	// 性能差
	// const actionXiaohong = changeXiaohong(name);
	// 性能好
	const actionXiaohong = useMemo(() => changeXiaohong(name), [name]);
	return (
		<>
			<div>{actionXiaohong}</div>
			<div>{children}</div>
		</>
	);
}

export default Example7;
