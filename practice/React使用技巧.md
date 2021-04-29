# 记录 React 的低版本 < 16.8 的某些特性

## 16.4.1

### 生命周期

1. this.setState()用法

- State 是可变的，是组件内部维护的一组用于反映组件 UI 变化的状态集合；
- Props 对于使用它的组件来说，是只读的，要想修改 Props，只能通过该组件的父组件修改。在组件状态上移的场景中，父组件正是通过子组件的 Props,传递给子组件其所需要的状态。
- setState 就相当于是一个异步操作，不能立即被修改
- 异步的解决办法：有时需要 state 更新后再进行某个操作，就需要这么做：

```js
// method 1 利用setState()的第二个参数
// 第一个参数是一个对象，第二个参数是一个回调函数，这个回调函数是在setstate执行完并页面渲染了之后再执行
test=()=>{
  this.setState({isClicked:true},()=>{
    console.log(this.state.isClicked);// true, isClicked状态已更新
  })
}

// method 2 利用async/await
async test(){
  await this.setState({isClicked:true});
  console.log(this.state.isClicked);// true, isClicked状态已更新
}

// method 3 此时isClicked的状态依赖state中的另一个值的状态
// 一般是用于在setState之前做一些操作
this.setState(state => ({
  isClicked: !state.chosen,
}));
```

2. 当依赖的某个值发生变化时自动触发执行

```js
  componentWillReceiveProps(nextProps, nextStates) {
    if (
      this.props.current_group !== nextProps.current_group
    ) {
      this.props.getStockListByGroupId(
        nextProps.current_group,
      );
    }
  }
```

3. this.setState()会自动合并执行，所以不必刻意把多个操作写在一起。所以会出现异步。

4.
