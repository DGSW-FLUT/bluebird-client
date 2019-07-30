import React from 'react';
import {
  Col,
  Row,
  Table,
  Button,
  Divider,
  message,
  Popconfirm,
  Modal,
  Form,
  Input,
  Icon,
} from 'antd';
import { inject, observer } from 'mobx-react';
import UserList from '../components/UserList';

const { Column } = Table;

@inject('member', 'layout')
@observer
class UserManage extends React.Component {
  state = {
    selectUser: {},
    modalVisible: false,
  }

  addMember = () => {
    const { member } = this.props;
    member.addMember({
      id: member.memberList[member.memberList.length - 1].id + 1,
      name: 'Hello',
      birth: '2000년 03월 22일',
      addr: '서울특별시 강남구 역삼동',
      level: '정회원',
      phoneNumber: '010-9173-7607'
    });
  };


  removeMember = async (user) => {
    const { member } = this.props;
    const isSuccess = await member.removeMember(user.id);
    if (isSuccess) {
      message.success(`${user.name}님을 삭제했습니다.`);
    } else {
      message.error('삭제 실패');
    }
  };

  updateMember = () => {

  }

  render() {
    const { member, layout } = this.props;
    const { selectUser, modalVisible } = this.state;
    const { isCollapsed } = layout;
    return (
      <Row type="flex">
        <Col span={24}>
          <UserList
            memberList={member.memberList}
            isCollapsed={isCollapsed}
            afterColumns={(
              <Column
                key="action"
                render={user => (
                  <span>
                    <a href="#">수정</a>
                    <Divider type="vertical" />
                    <Popconfirm
                      title="정말 삭제하시겠습니까?"
                      onConfirm={() => this.removeMember(user)}
                      okText="삭제"
                      cancelText="취소"
                    >
                      <a href="#">삭제</a>
                    </Popconfirm>
                  </span>
                )}
              />
            )}
          />
        </Col>
        <Col span={24}>
          <Button onClick={this.addMember}>추가</Button>
        </Col>
        <Modal
          title={`${selectUser.name}님 수정`}
          visible={modalVisible}
          width={isCollapsed ? 520 : 800}
        >
          <Form onSubmit={this.updateMember}>
            <Form.Item label="이름">
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="이름"
                value={selectUser.name}
                onChange={(e) => {
                  this.setState({
                    selectUser: {
                      ...selectUser,
                      name: e.target.value
                    }
                  });
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    );
  }
}

export default UserManage;
