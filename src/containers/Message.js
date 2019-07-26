import React, { Component, Fragment } from 'react';
import {
 Layout, Card, Row, Col, Steps, Button, message, Checkbox, Table 
} from 'antd';
import { inject, observer } from 'mobx-react';

import UserList from '../components/UserList';

const { Content } = Layout;

const { Column } = Table;
const { Step } = Steps;

@inject('layout', 'member', 'message')
@observer
class Message extends Component {
  state = {
    msg: '',
    current: 0,
    member: []
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
    const { message } = this.props;
    const { msg, member } = this.state;
    const result = message.sendMessage({
      message: msg,
      recipients: member
    });

    if (result) {
      message.success('Complete!');
    } else {
      message.error('error!');
    }
  };

  handleSelect = (user, e) => {
    const { member } = this.state;
    if (e.target.checked) {
      this.setState({
        member: [user.phone_number, ...member]
      });
    } else {
      const array = [...member];
      const idx = member.indexOf(user.phone_number);
      array.splice(idx, 1);
      this.setState({
        member: array
      });
    }
  };

  render() {
    const { msg, current } = this.state;

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
                        <React.Fragment>
                          <Checkbox onChange={e => this.handleSelect(user, e)} />
                        </React.Fragment>
                      )}
                    />
)}
                />
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
