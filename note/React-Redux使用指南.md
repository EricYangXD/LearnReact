# React-Redux 教程

## Redux 设计思想

1. Web 应用是一个状态机，视图与状态是一一对应的。
2. 所有的状态，保存在一个对象里面。

## 基本概念和 API

- Store 中保存需要全局共享状态的数据，整个应用只能有一个 Store。类似 Vuex。

```js
import { createStore } from "redux";
const store = createStore(fn);
```

- Store 对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。

```js
import { createStore } from "redux";
const store = createStore(fn);
const state = store.getState();
```

- Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。其中 type 为必传字段。

```js
const action = {
  type: "ADD_TODO",
  payload: "Learn Redux",
};
```

- Action Creator 定义一个函数来生成 Action，这个函数就叫 Action Creator。

```js
const ADD_TODO = "添加 TODO";

function addTodo(text) {
  return {
    type: ADD_TODO,
    text,
  };
}

const action = addTodo("Learn Redux");
```

- 通过 dispatch 派发 actions 事件去更新 Store 中的数据。
  store.dispatch()是 View 发出 Action 的唯一方法。store.dispatch 方法正常情况下，参数只能是对象，不能是函数。

```js
import { createStore } from "redux";
const store = createStore(fn);

store.dispatch({
  type: "ADD_TODO",
  payload: "Learn Redux",
});
```

- Reducer 当 Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State -- 必须返回一个新的对象，因为 React 是基于浅比较去更新的，所以不能修改原有的 State 对象，或者说修改原对象不会触发更新。Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。由于 Reducer 是纯函数，就可以保证同样的 State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象

```js
const reducer = function (state, action) {
  // ...
  return new_state;
};
```

- Example

```js
const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD":
      return state + action.payload;
    default:
      return state;
  }
};

const state = reducer(1, {
  type: "ADD",
  payload: 2,
});

// === 实际应用中，Reducer 函数不用像上面这样手动调用，store.dispatch方法会触发 Reducer 的自动执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。
import { createStore } from "redux";
const store = createStore(reducer);
```

- Store 允许使用 store.subscribe 方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。

```js
import { createStore } from "redux";
const store = createStore(reducer);

store.subscribe(listener);
```

显然，只要把 View 的更新函数（对于 React 项目，就是组件的 render 方法或 setState 方法）放入 listen，就会实现 View 的自动渲染。

store.subscribe 方法返回一个函数，调用这个函数就可以解除监听。

```js
let unsubscribe = store.subscribe(() => console.log(store.getState()));

unsubscribe();
```

## React-Redux 用法

1. 在需要使用 redux 的模块入口文件中：

```js
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';// 异步调用必需
import {myReducer} from 'xxx/reducer';
// 创建Store
const store = createStore(
  optionalStock,
  applyMiddleware(thunk),
);
// 使用Provider包裹要共享数据状态的组件并传入Store
render() {
    return (
      <Provider store={store}>
      ...
      <Provider>
    )
}
```

2. 创建 reducerType.js & reducer.js & actions.js

reducerType.js：存放常量

```js
export const CURRENT_GROUP = "CURRENT_GROUP";
export const SUPER_GROUP_ID = "SUPER_GROUP_ID";
```

reducer.js：存放 reducer & initialState

```js
import * as reducerType from "./reducerType";

const initState = {
  current_group: null,
  super_group: null,
};
const myReducer = (state = initState, action) => {
  switch (action.type) {
    case reducerType.CURRENT_GROUP:
      return {
        ...state,
        current_group: action.groupId,
      };
    case reducerType.SUPER_GROUP_ID:
      return {
        ...state,
        super_group: action.groupId,
      };
    default:
      return state;
  }
};

export default myReducer;
```

actions.js：存放相关操作

```js
import * as reducerType from './reducerType';

// 设置当前股票分组 也可以写成payload的形式
export const setCurrentGroupId = id => ({
  type: reducerType.CURRENT_GROUP,
  id,
});

// 设置『全部自选』分组ID，该分组不可操作，默认显示全部股票
export const setSuperGroupId = id => (dispatch, getState)=>({
  fetch(Url,Options).then(res=>{
    // 通过getState()得到当前Store中的数据
    if(res.id===getState().current_group){
      ......
    }
  },err=>{
    console.log(err);
  })
});
```

3. 在组件中引入 actions 和 state

```js
import { connect } from 'react-redux';
import {
  setCurrentGroupId,
  setCurrentGroupName,
} from 'xxx/actions';

......
使用方法：
this.props.setCurrentGroup(...); // method/action
this.props.setSuperGroup(...);
this.props.currentGroup; // state/store
this.props.superGroup;
......

// 在class外面
// 类似Vuex中的 mapStates mapMutations mapActions mapGetters
// 可以设置别名，简化调用
const mapStateToProps = state => ({
  // 这里return出来谁，谁才会出现在 `this.props`
  currentGroup: state.current_group,
  superGroup: state.super_group,
});

const mapDispatchToProps = dispatch => ({
  setCurrentGroup: groupId => {
    dispatch(setCurrentGroupId(groupId));
  },
  setSuperGroup: groupId => {
    dispatch(setSuperGroupId(groupId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(YourComponentName);
```
