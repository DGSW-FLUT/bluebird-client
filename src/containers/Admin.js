import React from 'react';
import { Layout, message } from 'antd';

import { inject, observer } from 'mobx-react';
import InputBox from '../components/InputBox';

const { Content } = Layout;

@inject('admin')
@observer
class Admin extends React.Component {
  handleSubmit = (account, password, type) => {
    const { admin } = this.props;

    switch (type) {
      case 1:
        admin.changePw(password) ? message.success('변경완료') : message.success('변경 실패');
      default:
    }
  };

  render() {
    return (
      <Layout>
        <Content>
          <p>비밀번호 변경</p>
          <InputBox isId={false} isPw handleSubmit={this.handleSubmit} type={1} />
        </Content>
      </Layout>
    );
  }
}

export default Admin;
