import React, { useState } from 'react';
import {
  Input, Icon, Table, Button
} from 'antd';
import Highlighter from 'react-highlight-words';
import Column from 'antd/lib/table/Column';
import MemberDetailModal from './MemberDetailModal';

const UserList = (props) => {
  const {
    isCollapsed,
    memberList,
    afterColumns,
    beforeColumns,
    pageSize,
    changeable,
    onChange,
    onDelete
  } = props;
  let searchInput = null;
  const [searchText, setSearchText] = useState('');
  const [sortedInfo, setSortedInfo] = useState({});
  const [isEnableModal, setIsEnableModal] = useState(false);
  const [currentMember, setCurrentMember] = useState({});

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (title, dataIndex) => ({
    filterDropdown: dropdown => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`${title} 검색`}
          value={dropdown.selectedKeys[0]}
          onChange={e =>
            dropdown.setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(dropdown.selectedKeys, dropdown.confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(dropdown.selectedKeys, dropdown.confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          검색
        </Button>
        <Button
          onClick={() => handleReset(dropdown.clearFilters)}
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
        setTimeout(() => searchInput.select());
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

  const handleFilterChange = (pagenation, filters, sorter) => {
    setSortedInfo(sorter);
  };

  return (
    <>
      <Table
        dataSource={memberList}
        rowKey={user => user.id}
        onChange={handleFilterChange}
        pagination={{
          pageSize: pageSize || 10
        }}
        onRow={row => ({
          onClick: () => {
            setCurrentMember(row);
            setIsEnableModal(true);
          }
        })}

      >
        {
          beforeColumns
        }
        <Column
          title="이름"
          dataIndex="name"
          key="name"
          {...getColumnSearchProps('이름', 'name')}
        />
        {
          !isCollapsed && (
            <Column
              title="생년월일"
              dataIndex="birth"
              key="birth"
              sorter={(a, b) => a.birth - b.birth}
              sortOrder={sortedInfo.columnKey === 'birth' && sortedInfo.order}
            />
          )
        }
        {
          !isCollapsed && (
            <Column
              title="주소"
              dataIndex="address"
              key="address"
              {...getColumnSearchProps('주소', 'address')}
            />
          )
        }
        {
          !isCollapsed && (
            <Column title="등급" dataIndex="level" key="level" />
          )
        }
        <Column
          title="전화번호"
          dataIndex="phone_number"
          key="phone_number"
          {...getColumnSearchProps('전화번호', 'phone_number')}
        />

        {
          afterColumns
        }
      </Table>
      <MemberDetailModal
        visible={isEnableModal}
        member={currentMember}
        handleCancel={() => setIsEnableModal(false)}
        onChange={onChange}
        onDelete={onDelete}
        changeable={changeable}
      />
    </>

  );
};

export default UserList;
