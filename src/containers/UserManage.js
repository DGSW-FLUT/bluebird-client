import React from 'react';
import {
 Col, Row, Button, message 
} from 'antd';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import UserList from '../components/UserList';
import MemberAddModal from '../components/MemberAddModal';

@inject('member', 'layout')
@observer
class UserManage extends React.Component {
  @observable showModal = false;

  state = {
    receiveMembers: []
  };

  componentDidMount() {
    const { member } = this.props;
    this.setState({
      receiveMembers: member.memberList.filter(m => m.paid_at === 'O').map(m => m.id)
    });
  }

  addMember = async (user) => {
    const { member } = this.props;
    const isSuccess = await member.addMember(user);
    if (isSuccess) {
      message.success('회원 추가 성공');
      return true;
    }
    message.error('회원 추가 실패');
    return false;
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

  updateMember = async (user) => {
    const { member } = this.props;
    const isSuccess = await member.updateMember(user);
    if (isSuccess) {
      message.success('수정 성공!');
      return true;
    }
    message.error('수정 실패');
    return false;
  };

  setPayment = async (id) => {
    console.log(id);
  };

  render() {
    const { member, layout } = this.props;
    const { isCollapsed } = layout;
    const { receiveMembers } = this.state;

    return (
      <Row type="flex">
        <Col span={24}>
          <UserList
            memberList={member.memberList}
            isCollapsed={isCollapsed}
            onDelete={this.removeMember}
            onChange={this.updateMember}
            rowSelection={{
              selectedRowKeys: receiveMembers,
              onChange: (selectedRowKeys, idx) => {
                this.setPayment(idx);
                this.setState({ receiveMembers: selectedRowKeys });
              },
              getCheckboxProps: record => ({
                key: record.id
              })
            }}
            changeable
          />
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => {
              this.showModal = true;
            }}
          >
            추가
          </Button>
        </Col>
        <MemberAddModal
          visible={this.showModal}
          handleCancel={() => {
            this.showModal = false;
          }}
          onAdd={this.addMember}
        />
      </Row>
    );
  }
}

export default UserManage;
