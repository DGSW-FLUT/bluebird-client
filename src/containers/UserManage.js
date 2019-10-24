import React from 'react';
import {
 Col, Row, Button, message, Checkbox 
} from 'antd';
import Column from 'antd/lib/table/Column';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import UserList from '../components/UserList';
import MemberAddModal from '../components/MemberAddModal';

@inject('member', 'layout')
@observer
class UserManage extends React.Component {
  @observable showModal = false;

  async componentDidMount() {
    const { member } = this.props;
    await member.fetchMemberList();
    // this.setState({
    //   receiveMembers: member.memberList.filter(m => m.paid_at === 'O').map(m => m.id)
    // });
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

  setPayment = async (id, value) => {
    const { member } = this.props;
    member.setPayment(id, value);
  };

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
            afterColumns={(
<Column
                title="납부 여부"
                dataIndex="paid_at"
                key="paid_at"
                render={(text, record) => (
                  <Checkbox
                    onClick={e => {
                      e.stopPropagation();
                      this.setPayment(record.id, !e.target.checked);
                    }}
                    checked={text === "O"}
                  />
                )}
              />
)}
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
