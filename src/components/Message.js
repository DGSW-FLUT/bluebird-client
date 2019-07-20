import React from 'react';
import {
 Layout, Card, Row, Col 
} from 'antd';

const { Content } = Layout;

const Message = () => {
  const [message, setMessage] = React.useState('메세지');

  const handleClick = (e) => {
    setMessage(e.target.innerHTML);
  };

  return (
    <Content style={{ display: 'block' }}>
      <p>{message}</p>
      <Row>
        <Col span={8}>
          <Card onClick={handleClick}>[2.28 알림] 가입을 환영합니다!</Card>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Card onClick={handleClick}>[2.28 알림] 회비가 미납되었으니 빠른 납부 부탁드립니다.</Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Message;
