import React from 'react';
import {
  Col,
  Row,
  Table,
  Button,
  Divider,
  message,
  Popconfirm,
  Input,
  Icon
} from 'antd';
import Highlighter from 'react-highlight-words';

import { inject, observer } from 'mobx-react';

const { Column } = Table;

@inject('member', 'layout')
@observer
class UserManage extends React.Component {
  state = {
    searchText: '',
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

  getColumnSearchProps = (title, dataIndex) => {
    const { searchText } = this.state;
    return ({
      filterDropdown: ({
        setSelectedKeys, selectedKeys, confirm, clearFilters
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => {
                this.searchInput = node;
              }}
            placeholder={`${title} 검색`}
            value={selectedKeys[0]}
            onChange={e =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
              검색
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
              초기화
          </Button>
        </div>
        ),
      filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      )
    });
  };

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const { member, layout } = this.props;
    const { isCollapsed } = layout;
    return (
      <Row type="flex">
        <Col span={24}>
          <Table dataSource={member.memberList} rowKey={user => user.id}>
            <Column
              title="이름"
              dataIndex="name"
              key="name"
              {...this.getColumnSearchProps('이름', 'name')}
            />
            {
              // TODO: Fragment 미동작. 더 좋은 방법을 제시해주세요 ㅠㅠ
            }
            {!isCollapsed && (
              <Column title="생년월일" dataIndex="birth" key="birth" />
            )}
            {!isCollapsed && (
              <Column
                title="주소"
                dataIndex="address"
                key="address"
                {...this.getColumnSearchProps('주소', 'address')}
              />
            )}
            {!isCollapsed && (
              <Column title="등급" dataIndex="level" key="level" />
            )}
            {!isCollapsed && (
              <Column
                title="전화번호"
                dataIndex="phone_number"
                key="phone_number"
                {...this.getColumnSearchProps('전화번호', 'phone_number')}
              />
            )}
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
          </Table>
        </Col>
        <Col span={24}>
          <Button onClick={this.addMember}>추가</Button>
        </Col>
      </Row>
    );
  }
}

export default UserManage;
