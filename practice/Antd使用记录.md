# 记录使用 antd 踩过的坑

## 主要是高低版本切换导致的一些使用方法或 API 的变化

### Form 表单

1. Form.Item
2. form 通过 refs 获取
3. 经 Form.create() 包装过的组件会自带 this.props.form 属性
4. 表单布局:layout={'horizontal'|'vertical'|'inline'}
5. Form.create(options)#
   使用方式如下：

```js
class CustomizedForm extends React.Component {}
CustomizedForm = Form.create({})(CustomizedForm);

<EnhancedForm wrappedComponentRef={(form) => (this.form = form)} />;
this.form; // => The instance of CustomizedForm
```

5. options 的配置项如下:
   mapPropsToFields:把父组件的属性映射到表单项上（如：把 Redux store 中的值读出），需要对返回值中的表单域数据用 Form.createFormField 标记，注意表单项将变成受控组件, error 等也需要一并手动传入
6. 经过 Form.create 包装的组件将会自带 this.props.form 属性，this.props.form 提供的 API 如下：
   注意：使用 getFieldsValue getFieldValue setFieldsValue 等时，应确保对应的 field 已经用 getFieldDecorator 注册过了。
7. getFieldDecorator:用于和表单进行双向绑定.

8. getFieldsValue:获取一组输入控件的值，如不传入参数，则获取全部组件的值
9. getFieldValue:获取一个输入控件的值
10. validateFields:校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
11. this.props.form.getFieldDecorator(id, options)#
    经过 getFieldDecorator 包装的控件，表单控件会自动添加 value（或 valuePropName 指定的其他属性） onChange（或 trigger 指定的其他属性），数据同步将被 Form 接管，这会导致以下结果：
    你不再需要也不应该用 onChange 来做同步，但还是可以继续监听 onChange 等事件。
    你不能用控件的 value defaultValue 等属性来设置表单域的值，默认值可以用 getFieldDecorator 里的 initialValue。
    你不应该用 setState，可以使用 this.props.form.setFieldsValue 来动态改变表单值。
12. getFieldDecorator(id, options) 参数
    options.normalize: function(value, prevValue, allValues): any
13. id:必填输入控件唯一标志。支持嵌套式的写法。
14. options.getValueFromEvent:可以把 onChange 的参数（如 event）转化为控件的值
15. options.valuePropName:子节点的值的属性

### Checkbox

1. Checkbox.Group 以分组显示多项
2. checked 指定当前是否选中,value:当前选中项
3. onChange 回调
4. disabled 失效状态
5. options+Checkbox.Group 渲染多项
6. 可以获取 nested 数据结构（貌似不支持同时显示多个 checkbox.group）

```js
getFieldDecorator("formItems[0].items.value");
```

### Select

1. <Select> {option-lists} </Select>
2. 通过以下挂载到某个节点上而不是<body>上

```js
  getPopupContainer={() =>
    document.getElementById('Select')
  }
```

3. 通过以下阻止冒泡事件

```js
  onMouseDown={e => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }}
```

4. <Select>中自定义选项

```js
  dropdownRender={options => (
    <div key="droprender">
      <React.Fragment>{options}</React.Fragment>
      <div
        role="option"
        key="add"
        style={xxx}
        onClick={this.xxx}
        onMouseDown={e => {
          e.preventDefault();
          return false;
        }}
      >
        新建分组
      </div>
    </div>
  )}
```

### Input

1. <Input suffix={<Icon type="search" />} />

### Icon

1. <Icon type="upload">
2. <Button type="primary" icon="upload">Click</Button>

### Modal

1. 挂载
2. 通过 footer 可以重写底部确认取消按钮，onCancel 方法提供点击关闭表单功能

```js
<Modal>
  getContainer={() =>
    document.getElementById('dom-id')
  }
  footer={[
    <Button onClick={this.handleClick}>
      恢复默认
    </Button>,
    <Button
      type="primary"
      onClick={this.handleSubmit}
      disabled={clickable}
    >
      确定
    </Button>,
  ]}
```

### Autocomplete

1. 照官网使用即可,注意 onSelect 和 onSearch 的触发时机：前者类似 onClick 后者类似 onChange

```js
<AutoComplete
  getPopupContainer={() => document.getElementById("AutoComplete")}
  placeholder="输入sth"
  // 渲染从接口获取的数据
  dataSource={this.state.options.map(renderOption)}
  onSelect={this.onSelect}
  onSearch={this.onSearch}
  optionLabelProp="text"
  allowClear
>
  <Input suffix={<Icon type="search" />} />
</AutoComplete>
```

### Upload

1. 接收一个 option 参数，该参数包含上传的文件信息

```js
  upload(option) {
    const isExcel =
      option.file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      option.file.type === 'application/vnd.ms-excel';
    // 此处需要特别注意，使用file.type进行校验是不可靠的，并非所有系统和浏览器都能获取file.type的信息，比如同为chrome，在mac环境是无法获取到file.type的
    const suffix = option.file.name.substr(
      option.file.name.lastIndexOf('.'),
    );
    if (
      !isExcel &&
      (suffix !== '.xls' && suffix !== '.xlsx')
    ) {
      message.error('请上传Excel文件');
      return;
    }
    this.uploadFile(xxx, option);// 后续根据option处理post方法的参数
    // const formData = new FormData();
    // formData.append('filename', option.file);
  }
```

### 下载

```js
  onBtnDownloadClick() {
    // 1.
    // window.location.href = 'https://baidu.com/1.txt';
    // 2.
    const fileUrl ='https://baidu.com/1.txt';

    const form = document.createElement('form');
    form.setAttribute('style', 'display: none');
    form.setAttribute('target', '');
    form.setAttribute('method', 'get');
    form.setAttribute('action', fileUrl);

    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', 'exportPostTime');
    input.setAttribute('value', '');
    document.body.appendChild(form);
    form.appendChild(input);
    form.submit();
  }
```

### Grid 栅格

1. <Row>+<Col>配合 span 属性进行布局
2. justify:flex 布局下的水平排列方式：start end center space-around space-between
3. gutter:栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 { xs: 8, sm: 16, md: 24}。或者使用数组形式同时设置 [水平间距, 垂直间距]（3.24.0 后支持）。
4. align:flex 布局下的垂直对齐方式：top middle bottom

### Empty

1. description:自定义描述内容.string | ReactNode
2. imageStyle:图片样式
3. image:设置显示图片，为 string 时表示自定义图片地址。string | ReactNode

### Table

1. 修改样式时先给最外层套一个 className，在该 className 下修改
2. scroll={x:1200,y:500}
3. getPopupContainer:设置表格内各类浮层的渲染节点，如筛选菜单
4. rowSelection:表格行是否可选择
5. pagination:分页器，参考配置项或 pagination 文档，设为 false 时不展示和进行分页
6. locale:默认文案设置，目前包括排序、过滤、空数据文案
7. loading:页面是否加载中
8. Column ellipsis 折叠文字
9. sorter:(a,b)=>{a.dataIndex-b.dataIndex}
10. render:(text, record, index) => {}; // record 是当前行
11. fixed:把选择框列固定在左边
12. getCheckboxProps:选择框的默认属性配置
