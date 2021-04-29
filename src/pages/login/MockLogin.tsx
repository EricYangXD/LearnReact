import React from 'react';
import queryString from 'query-string';
import { Form, Input, Button, message } from 'antd';
import encrypt from 'utils/encrypt';

function MockLogin() {
  const onFinish = (values: any) => {
    console.log('Success:', values);
    const loginName = encrypt(values.username);
    const password = encrypt(values.password);
    const queryStr = queryString.stringify({ loginName, password });
    console.log(queryStr);
    message.success('登录成功');
    // call login api, then jump to content pages.
    // window.location.href = `/user?token=${token}`;
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <div style={{ width: 500, margin: '0 auto', paddingTop: 40 }}>
      <Form {...layout} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default MockLogin;
