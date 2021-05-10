import React, { useState, useEffect } from 'react';
import useCustomPrompt from 'components/RouteGuard/index';
import { Input } from 'antd';

function Home(): JSX.Element {
  const { CustomPrompt } = useCustomPrompt();
  const [input, setInputValue] = useState('');
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    // console.log(input);
    setChanged(true);
  }, [input]);

  const message = 'Do you want to leave this page?';
  const onChange = (e) => setInputValue(e.target.value);
  return (
    <div>
      <p>Home</p>
      <h2>Input Something At First</h2>
      <Input placeholder="Input sth here." onChange={onChange} allowClear />
      <h2>Then Click On Another Page Link</h2>
      <CustomPrompt showPrompt={changed} msg={message} okText={'OK'} cancelText={'NO'} />
    </div>
  );
}

export default Home;
