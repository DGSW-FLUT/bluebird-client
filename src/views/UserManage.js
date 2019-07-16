import React, { useState } from 'react';
import {
  Col, Row, Table, Button
} from 'antd';

const columns = [
  {
    title: '이름',
    dataIndex: 'name'
  }
];

const UserManage = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'Hello'
    },
    {
      id: 2,
      name: 'World'
    }
  ]);

  const id = 3;

  return (
    <Row type="flex">
      <Col span={24}>
        <Table columns={columns} dataSource={data} rowKey={record => record.id} />
      </Col>
      <Col span={24}>
        <Button onClick={() => setData(data.concat({ id: id + 1, name: 'Test' }))}>추가</Button>
      </Col>
    </Row>
  );
};

export default UserManage;
