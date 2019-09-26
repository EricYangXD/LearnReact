import { takeEvery, put } from "redux-saga/effects";
import { GET_MY_LIST } from "./actionTypes";
import axios from "axios";
import { getListAction } from "./actionCreators";
// 在这里写业务逻辑
function* mysagas() {
	yield takeEvery(GET_MY_LIST, getList);
}

function* getList() {
	const res = yield axios.get(
		"http://rap2api.taobao.org/app/mock/232271/example/item-list"
		// "https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList"
	);
	// console.log(res.data.data);
	let data = [];
	res.data.data.forEach((item, index) => {
		data.push(item.rate);
	});
	const action = getListAction(data);
	yield put(action);
}

export default mysagas;
