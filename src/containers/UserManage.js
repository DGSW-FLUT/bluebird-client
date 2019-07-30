import React from 'react';
import {
  Col,
  Row,
  Button,
  message,
} from 'antd';
import { inject, observer } from 'mobx-react';
import UserList from '../components/UserList';

@inject('member', 'layout')
@observer
class UserManage extends React.Component {
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
    const { isCollapsed } = layout;
    return (
      <Row type="flex">
        <Col span={24}>
          <UserList
            memberList={member.memberList}
            isCollapsed={isCollapsed}
            onDelete={this.removeMember}
            onChange={this.updateMember}
            changeable
          />
        </Col>
        <Col span={24}>
          <Button onClick={this.addMember}>추가</Button>
        </Col>
      </Row>
    );
  }
}

export default UserManage;
