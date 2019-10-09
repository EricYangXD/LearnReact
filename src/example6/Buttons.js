import React, { useContext } from "react";
import { UPDATE_COLOR, ColorContext } from "./color";
function Buttons() {
	const { dispatch } = useContext(ColorContext);
	return (
		<div>
			<button
				onClick={() => {
					dispatch({ type: UPDATE_COLOR, color: "red" });
				}}
			>
				Red
			</button>
			<button
				onClick={() => {
					dispatch({ type: UPDATE_COLOR, color: "yellow" });
				}}
			>
				Yellow
			</button>
		</div>
	);
}

export default Buttons;
