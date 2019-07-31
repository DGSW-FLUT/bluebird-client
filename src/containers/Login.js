import React from 'react';
import {
 Form, Input, Icon, Button, message 
} from 'antd';

import { withRouter } from 'react-router-dom';
import { inject } from 'mobx-react';
import axios from '../axios';
import Loadable from '../components/Loadable';

@inject('admin')
@withRouter
class Login extends React.Component {
  state = {
    account: '',
    password: ''
  };

  loadable = React.createRef();

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
  };

  setAccount = (event) => {
    event.persist();
    this.setState(prevState => ({
      ...prevState,
      account: event.target.value
    }));
  };

  setPassword = (event) => {
    event.persist();
    this.setState(prevState => ({
      ...prevState,
      password: event.target.value
    }));
  };

  login = async () => {
    this.loadable.current.setPending(true);

    const { account, password } = this.state;
    const { admin, history } = this.props;

    try {
      const { data } = await axios.post('/auth/login', {
        account,
        password
      });
      await admin.setJwtToken(data.token);
      history.push('/');
    } catch (error) {
      message.warning('아이디 혹은 비밀번호가 틀렸습니다.');
      console.log(error);
      this.loadable.current.setPending(false);
    }

    // finally {
    //   console.log(this.loadable.current);
    //   this.loadable.current.setPending(false);
    // }
  };

  render() {
    return (
      <Loadable ref={this.loadable}>
        <p>관리자 아이디로 로그인할 수 있습니다.</p>
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
      </Loadable>
      // </Spin>
    );
  }
}

export default Login;
