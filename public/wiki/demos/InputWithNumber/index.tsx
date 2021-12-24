import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { TextAreaProps } from 'antd/lib/input/TextArea.d';
import { InputProps } from 'antd/lib/input/index.d';
import classNames from 'classnames';

const { TextArea } = Input;

const TextAreaStyled = styled.div`
  position: relative;
  .ant-input-affix-wrapper {
    &:hover,
    &:focus {
      border-color: ${(props) => props.theme.color406};
    }
  }
`;

// TODO 自己根据实际情况调整样式
const StyledSuffix = styled.span`
  display: inline-block;
  position: absolute;
  line-height: 18px;
  right: 10px;
  font-size: 12px;
  color: #ccc;
  opacity: 0.5;

  &.hasError {
    color: #f5222d;
  }
`;

interface InputWithNumProps extends InputProps {
  max: number;
  value?: string;
  onChange?: () => {};
}

export function InputWithNum(props: InputWithNumProps) {
  const { value, onChange, max } = props;

  const valueLength = value ? value.length : 0;
  const hasError = valueLength > max;

  const suffixClassName = classNames({ hasError, numSuffix: true });

  const suffix = (
    <StyledSuffix className={suffixClassName}>
      <span>{valueLength || 0}</span>/{max}
    </StyledSuffix>
  );

  return (
    <TextAreaStyled>
      <Input {...props} value={value} onChange={onChange} suffix={suffix} />
    </TextAreaStyled>
  );
}

interface Props extends TextAreaProps {
  max: number;
  value?: string;
  onChange?: () => {};
}

/**
 * 非受控 只接收 value为string 的textarea封装
 * @param props
 * @returns
 */
function TextAreaWithNum(props: Props) {
  const { value, onChange, max } = props;

  const valueLength = value ? value.length : 0;
  const hasError = valueLength > max;

  const suffixClassName = classNames({ hasError });

  const suffix = (
    <StyledSuffix className={suffixClassName}>
      <span>{valueLength || 0}</span>/{max}
    </StyledSuffix>
  );

  return (
    <TextAreaStyled>
      <TextArea {...props} value={value} onChange={onChange} />
      {suffix}
    </TextAreaStyled>
  );
}

export default React.forwardRef(TextAreaWithNum);
