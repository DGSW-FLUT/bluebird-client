import React, { useState } from 'react';
import {
  Col, Row, Table, Button, Divider
} from 'antd';

import { inject, observer } from 'mobx-react';

const { Column } = Table;

const UserManage = inject('layout')(observer((props) => {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'Hello',
      birth: '2001년 03월 22일',
      addr: '서울특별시 강남구 역삼동',
      level: '정회원',
      phoneNumber: '010-9173-7607'
    },
    {
      id: 2,
      name: 'Hello',
      birth: '2001년 03월 22일',
      addr: '서울특별시 강남구 역삼동',
      level: '정회원',
      phoneNumber: '010-9173-7607'
    }
  ]);

  const id = 3;

  return (
    <Row type="flex">
      <Col span={24}>
        {/*
        LayoutStore Inject 후 모바일 뷰 시 이름 / 수정|삭제 만 나오도록 하기
        모바일/일반 상관없이 row를 누르면 상세 보기
        */}
        <Table dataSource={data} rowKey={user => user.id}>
          <Column title="이름" dataIndex="name" key="name" />
          <Column title="생년월일" dataIndex="birth" key="birth" />
          <Column title="주소" dataIndex="addr" key="addr" />
          <Column title="등급" dataIndex="level" key="level" />
          <Column title="전화번호" dataIndex="phoneNumber" key="phoneNumber" />
          <Column
            title="액션"
            key="action"
            render={(rawData, { id }) => (
              <span>
                <a href="#">수정</a>
                <Divider type="vertical" />
                <a href="#">삭제</a>
              </span>
            )}
          />
        </Table>
      </Col>
      <Col span={24}>
        <Button onClick={() => setData(data.concat({
          id: id + 1,
          name: 'Hello',
          birth: '2001년 03월 22일',
          addr: '서울특별시 강남구 역삼동',
          level: '정회원',
          phoneNumber: '010-9173-7607'
        }))}
        >
          추가
        </Button>
      </Col>
    </Row>
  );
}));

export default UserManage;
