import React from 'react';
import {
  Col, Row, Table, Button, Divider
} from 'antd';

import { inject, observer } from 'mobx-react';
import axios from '../axios';

const { Column } = Table;

@inject('member', 'admin', 'layout')
@observer
class UserManage extends React.Component {
  addMember = () => {
    const { member, admin } = this.props;
    member.addMember({
      id: member.memberList[member.memberList.length - 1].id + 1,
      name: 'Hello',
      birth: '2000년 03월 22일',
      addr: '서울특별시 강남구 역삼동',
      level: '정회원',
      phoneNumber: '010-9173-7607'
    });
    admin.jwt += '1';
    console.log(axios.defaults.headers);
  }


  render() {
    const { member, layout } = this.props;
    const { isCollapsed } = layout;
    return (
      <Row type="flex">
        <Col span={24}>
          <Table dataSource={member.memberList} rowKey={user => user.id}>
            <Column title="이름" dataIndex="name" key="name" />
            {
              // TODO: Fragment 미동작. 더 좋은 방법을 제시해주세요 ㅠㅠ
            }
            {
              !isCollapsed && (
                <Column title="생년월일" dataIndex="birth" key="birth" />
              )
            }
            {
              !isCollapsed && (
                <Column title="주소" dataIndex="addr" key="addr" />
              )
            }
            {
              !isCollapsed && (
                <Column title="등급" dataIndex="level" key="level" />
              )
            }
            {
              !isCollapsed && (
                <Column title="전화번호" dataIndex="phoneNumber" key="phoneNumber" />
              )
            }
            <Column
              title="액션"
              key="action"
              render={() => (
                <span>
                  <a>수정</a>
                  <Divider type="vertical" />
                  <a>삭제</a>
                </span>
              )}
            />
          </Table>
        </Col>
        <Col span={24}>
          <Button onClick={this.addMember}>
            추가
          </Button>
        </Col>
      </Row>
    );
  }
}

export default UserManage;
