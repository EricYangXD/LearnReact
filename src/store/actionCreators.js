import {
	CHANGE_INPUT_VALUE,
	ADD_ITEM,
	DELETE_ITEM,
	GET_LIST,
	GET_MY_LIST
} from "./actionTypes";
import axios from "axios";

export const changeInputValueAction = value => ({
	type: CHANGE_INPUT_VALUE,
	value: value
});
export const addItemAction = () => ({
	type: ADD_ITEM
});
export const deleteItemAction = index => ({
	type: DELETE_ITEM,
	index: index
});
export const getListAction = data => ({
	type: GET_LIST,
	data
});
// redux-saga
export const getMyListAction = data => ({
	type: GET_MY_LIST
	// data
});

// 使用redux-chunk
export const getTodoList = () => {
	return dispatch => {
		axios
			.get(
				"http://rap2api.taobao.org/app/mock/232271/example/item-list"
				// "https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList"
			)
			.then(res => {
				// console.log(res.data.data);
				let data = [];
				res.data.data.forEach((item, index) => {
					data.push(item.rate);
				});
				const action = getListAction(data);
				dispatch(action);
			});
	};
};
