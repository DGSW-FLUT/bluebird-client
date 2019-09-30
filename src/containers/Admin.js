import {
 Button, Layout, List, message 
} from 'antd';
import { inject, observer } from 'mobx-react';
import React from 'react';

import InputBox from '../components/InputBox';

const { Content } = Layout;

@inject('manager')
@observer
class Admin extends React.Component {
  handleSubmit = async (account, password, type) => {
    const { manager } = this.props;

    switch (type) {
      case 1:
        manager.changePw(password) ? message.success('변경완료') : message.success('변경 실패');
        break;
      case 2:
        const result = await manager.add({ account, password });
        if (result) {
          message.success('추가 완료');
        } else {
          message.error('이미 있는 계정이에요.');
        }

        break;
      default:
        break;
    }
  };

  handleRemove = async (data) => {
    const { manager } = this.props;
    const result = await manager.removeAdmin(data);
    if (result) {
      message.success('삭제 완료');
    } else {
      message.error('삭제 실패');
    }
  };

  render() {
    const { manager } = this.props;

    return (
      <Layout>
        <Content>
          <p>비밀번호 변경</p>
          <InputBox isId={false} isPw handleSubmit={this.handleSubmit} type={1} />
        </Content>
        <Content>
          <p>관리자 추가</p>
          <InputBox isId isPw handleSubmit={this.handleSubmit} type={2} />
        </Content>
        <Content>
          <List
            header={<div>관리자 수정</div>}
            dataSource={manager.adminList}
            renderItem={item => (
              <List.Item
                actions={[
                  <Button type="danger" onClick={() => this.handleRemove(item)}>
                    삭제
                  </Button>
                ]}
              >
                {item.account}
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    );
  }
}

export default Admin;
