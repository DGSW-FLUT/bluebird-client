import React, { Component } from 'react';
import {
 Layout, Card, Row, Col, Steps, Button, message 
} from 'antd';
import { inject, observer } from 'mobx-react';

const { Content } = Layout;

const { Step } = Steps;

@inject('layout')
@observer
class Message extends Component {
  state = {
    msg: '',
    current: 0
  };

  handleMessage = (e) => {
    this.setState({
      msg: e.target.innerHTML
    });
  };

  next = () => {
    const { current } = this.state;
    this.setState({
      current: current + 1
    });
  };

  prev = () => {
    const { current } = this.state;
    this.setState({
      current: current - 1
    });
  };

  showMessage = () => {
    message.success('Complete!');
  };

  render() {
    const { msg, current } = this.state;

    const { layout } = this.props;
    const { isCollapsed } = layout;

    const steps = [
      {
        title: '메세지 입력'
      },
      {
        title: '수신인 선택'
      },
      {
        title: '완료'
      }
    ];

    return (
      <Content>
        <Steps current={current} size={isCollapsed ? 'small' : ''}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <p style={{ marginTop: '12px' }}>{msg}</p>
        <Row>
          <Col span={8}>
            <Card onClick={this.handleMessage}>[2.28 알림] 가입을 환영합니다!</Card>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Card onClick={this.handleMessage}>
              [2.28 알림] 회비가 미납되었으니 빠른 납부 부탁드립니다.
            </Card>
          </Col>
        </Row>

        <Content style={{ marginTop: '8px' }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => this.showMessage()}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: '8px' }} onClick={() => this.prev()}>
              Prev
            </Button>
          )}
        </Content>
      </Content>
    );
  }
}

export default Message;
