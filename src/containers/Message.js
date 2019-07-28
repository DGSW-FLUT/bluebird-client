import React, { Component, Fragment } from 'react';
import {
 Layout, Card, Row, Col, Steps, Button, message, Checkbox, Table 
} from 'antd';
import { inject, observer } from 'mobx-react';

import UserList from '../components/UserList';

import axios from '../axios';

const { Content } = Layout;

const { Column } = Table;
const { Step } = Steps;

@inject('layout', 'member')
@observer
class Message extends Component {
  state = {
    msg: '',
    current: 0,
    recipients: []
  };

  handleMessage = (e) => {
    this.setState({
      msg: e.target.innerHTML
    });
  };

  next = () => {
    const { current, msg, recipients } = this.state;
    if (current === 0 && !msg) {
      message.error('메세지를 선택해주세요.');
      return;
    }
    if (current === 1 && !recipients.length) {
      message.error('보낼 사람을 최소 1명 선택해주세요.');
      return;
    }

    this.setState({
      current: current + 1
    });
  };

  prev = () => {
    const { current } = this.state;
    this.setState({
      current: current - 1
    });

    if (current === 2) this.setState({ recipients: [] });
  };

  sendMessage = async () => {
    const { msg, recipients } = this.state;

    const data = {
      message: msg,
      recipients: Array.from(recipients, el => el.phone_number)
    };
    try {
      await axios.post('/messages/send', data).then((res) => {
        if (res.status === 200) message.success(res.data.message);
      });
    } catch (err) {
      message.error('SMS SEND FAIL');
    }
  };

  handleSelect = (user, e) => {
    const { recipients } = this.state;
    if (e.target.checked) {
      this.setState({
        recipients: [user, ...recipients]
      });
    } else {
      const array = [...recipients];
      const idx = recipients.indexOf(user);
      array.splice(idx, 1);
      this.setState({
        recipients: array
      });
    }
  };

  render() {
    const { msg, current, recipients } = this.state;

    const { layout, member } = this.props;
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
        {(() => {
          switch (current) {
            case 0:
              return (
                <Fragment>
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
                </Fragment>
              );

            case 1:
              return (
                <UserList
                  memberList={member.memberList}
                  isCollapsed={isCollapsed}
                  afterColumns={(
<Column
                      key="action"
                      render={user => (
                        <Fragment>
                          <Checkbox onChange={e => this.handleSelect(user, e)} />
                        </Fragment>
                      )}
                    />
)}
                />
              );

            case 2:
              return (
                <Fragment>
                  <p>{`보낼 메세지: ${msg}`}</p>
                  <UserList memberList={recipients} />
                </Fragment>
              );

            default:
              break;
          }
        })()}

        <Content style={{ marginTop: '8px' }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => this.sendMessage()}>
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
