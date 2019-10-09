import React, { useRef, useState, useEffect } from "react";

function Example8() {
	const inputEle = useRef(null);
	const onButtonClick = () => {
		inputEle.current.value = "I am your father.";
		console.log(inputEle);
	};

	const [text, setText] = useState("test");
	const textRef = useRef();
	useEffect(() => {
		textRef.current = text;
		console.log("textRef.current", textRef.current);
	});
	return (
		<div>
			<input ref={inputEle} type="text"></input>
			<button onClick={onButtonClick}>Click me</button>
			<br></br>
			<br></br>
			<br></br>
			<input
				value={text}
				onChange={e => {
					setText(e.target.value);
				}}
			/>
		</div>
	);
}

export default Example8;
