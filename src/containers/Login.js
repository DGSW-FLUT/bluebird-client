import React from 'react';
import {
  Form, Input, Icon, Button
} from 'antd';

import { inject } from 'mobx-react';

@inject('admin')
class Login extends React.Component {
  state = {
    account: '',
    password: ''
  }

  setAccount = (event) => {
    event.persist();
    this.setState(prevState => ({
      ...prevState,
      account: event.target.value
    }));
  }

  setPassword = (event) => {
    event.persist();
    this.setState(prevState => ({
      ...prevState,
      password: event.target.value
    }));
  }

  login = (event) => {
    // TODO: Implement Login Logic
  }

  render() {
    return (
      <>
        {'관리자 아이디로 로그인할 수 있습니다.'}
        <Form layout="inline">
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="아이디"
              onChange={this.setAccount}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="패스워드"
              onChange={this.setPassword}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary">
              로그인
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default Login;
