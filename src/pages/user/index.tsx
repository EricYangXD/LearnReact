import React, { useEffect, useState } from 'react';

/* 面试题 */
function User(): JSX.Element {
  // const User = () => {
  //   const [value, setValue] = useState(1);
  //   console.log('value1:', value);
  //   useEffect(() => {
  //     setValue(1);
  //     setValue(2);
  //     console.log('value2:', value);
  //     setTimeout(() => {
  //       setValue(3);
  //       setValue(4);
  //       console.log('value3:', value);
  //     }, 0);
  //   }, [value]);

  //   return null;

  // result:
  // value1: 1;
  // value2: 1;
  // value1: 2;
  // value1: 3;
  // value1: 4;
  // value3: 1;
  return <div>User</div>;
}

export default User;
