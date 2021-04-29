import { message } from 'antd';
import axios from 'axios';

export const getUser = (user: string) => {
  const url = `/xxx/shopify?user=${user}`;
  return axios
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      message.error(e);
    });
};
