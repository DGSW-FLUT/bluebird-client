import React from 'react';
import {
  Form, Input, Icon, Button, Spin
} from 'antd';

import { inject } from 'mobx-react';
import axios from '../axios';

@inject('admin')
class Login extends React.Component {
  state = {
    account: '',
    password: '',
    pending: false
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleEnter, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleEnter, false);
  }

  handleEnter = (event) => {
    if (event.key !== 'Enter') {
      return;
    }
    this.login();
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

  login = async () => {
    this.setState(prevState => ({
      ...prevState,
      pending: true
    }));

    const { account, password } = this.state;
    try {
      const { data } = await axios.post('/auth/login', {
        account,
        password
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState(prevState => ({
        ...prevState,
        pending: false
      }));
    }
  }

  render() {
    const { pending } = this.state;
    return (
      <Spin spinning={pending} indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
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
            <Button type="primary" onClick={() => this.login()}>
              로그인
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    );
  }
}

export default Login;
