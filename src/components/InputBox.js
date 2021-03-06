import React from 'react';

import {
 Form, Input, Icon, Button 
} from 'antd';

const InputBox = ({
 isId, isPw, handleSubmit, type 
}) => {
  const [account, setAccount] = React.useState('');
  const [password, setPassword] = React.useState('');

  const clearInput = () => {
    console.log('clear');
    setAccount('');
    setPassword('');
  };

  return (
    <Form layout="inline">
      {isId && (
        <Form.Item>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="아이디"
            value={account}
            onChange={e => setAccount(e.target.value)}
          />
        </Form.Item>
      )}

      {isPw && (
        <Form.Item>
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="패스워드"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Item>
      )}

      <Form.Item>
        <Button
          type="primary"
          onClick={() => {
            handleSubmit(account, password, type);
            clearInput();
          }}
        >
          확인
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InputBox;
