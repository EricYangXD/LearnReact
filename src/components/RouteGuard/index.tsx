import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, Prompt } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm: confirmModal } = Modal;

const useCustomPrompt = () => {
  const [pathTo, setPathTo] = useState('');
  const [confirm, setConfirm] = useState(false);
  const history = useHistory();
  const currentLocation = useLocation();

  const onConfirm = useCallback(() => {
    setConfirm(true);
  }, []);

  const onCancel = useCallback(() => {
    console.log('cancel');
  }, []);

  /* Prompt: message */
  const message = (location): string | boolean => {
    // location: to, currentLocation: from
    // compare the current path and the next path
    if (location.pathname === currentLocation.pathname) return true;
    showConfirm();
    setPathTo(location.pathname);
    return false;
    // 如果return了string，则会显示在Prompt上，此处使用Modal而不需要显示Prompt
    // return '当前修改尚未保存，确定要离开吗？';
  };

  /* 切换确认modal */
  const showConfirm = useCallback(() => {
    confirmModal({
      title: 'CONSTANTS.TAB_CHANGE_TITLE',
      content: 'CONSTANTS.TAB_CHANGE_TIP',
      icon: <ExclamationCircleOutlined />,
      onOk: () => onConfirm(),
      onCancel: () => onCancel(),
      closable: true,
    });
  }, [onConfirm, onCancel]);

  const CustomPrompt = ({ showPrompt, ...otherProps }) => {
    const when = showPrompt && !confirm;

    return (
      <>
        <Prompt when={when} message={message} />
      </>
    );
  };

  useEffect(() => {
    if (confirm) {
      history.push(pathTo);
    }
  }, [confirm, pathTo, history]);

  return { CustomPrompt };
};

export default useCustomPrompt;
