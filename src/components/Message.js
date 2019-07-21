import React from 'react';
import {
 Layout, Card, Row, Col, Steps, Button, message 
} from 'antd';

const { Content } = Layout;

const { Step } = Steps;

const Message = () => {
  const [msg, setMsg] = React.useState('메세지');
  const [current, setCurrent] = React.useState(0);

  const handleClick = (e) => {
    setMsg(e.target.innerHTML);
  };

  const steps = [
    {
      title: '메세지를 선택해주세요!'
    },
    {
      title: '보낼 사람을 선택해주세요!'
    },
    {
      title: '완료!'
    }
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const showMessage = () => {
    message.success('Complete!');
  };

  return (
    <Content>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <p style={{ marginTop: '12px' }}>{msg}</p>
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

      <Content style={{ marginTop: '8px' }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => showMessage()}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ marginLeft: '8px' }} onClick={() => prev()}>
            Prev
          </Button>
        )}
      </Content>
    </Content>
  );
};

export default Message;
