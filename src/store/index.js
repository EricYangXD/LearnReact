import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
// import thunk from "redux-thunk";
import mySagas from "./mysagas";
import creactSagaMiddleware from "redux-saga";
// 使用redux-saga
const sagaMiddleware = creactSagaMiddleware();
// 增强函数--->同时使用redux-thunk和redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
	: compose;

// thunk
// const enhancer = composeEnhancers(applyMiddleware(thunk));
// saga
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const store = createStore(reducer, enhancer);
sagaMiddleware.run(mySagas);
// const store = createStore(
// reducer /* preloadedState, */,
// applyMiddleware(thunk)
// redux插件配置
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

export default store;
