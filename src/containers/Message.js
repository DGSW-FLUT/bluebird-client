import {
 AutoComplete, Button, Col, Input, message, Modal, Row, Tag, Tooltip, Typography 
} from 'antd';
import { inject, observer } from 'mobx-react';
import React from 'react';

import axios from '../axios';
import MemberDetailModal from '../components/MemberDetailModal';
import TemplateModal from '../components/TemplateModal';
import SendPhoneModal from '../components/SendPhoneModal';
import UserList from '../components/UserList';
import config from '../config';

const { Text } = Typography;
@inject('member')
@observer
class Message extends React.Component {
  state = {
    receiveMembers: [],
    searchKeyword: '',
    memberModal: false,
    memberDetailModal: false,
    currentMember: {},
    content: '',
    sendPhone: ''
  }

  isMMS = false;

  createAutoCompleteItem = member => (
    <AutoComplete.Option key={member.id} text={member.name}>
      <Text>{member.name}</Text>
      <Text type="secondary" style={{ float: 'right' }}>
        {member.phone_number}
      </Text>
    </AutoComplete.Option>
  )

  getDataSource = () => {
    const { member } = this.props;
    const { searchKeyword, receiveMembers } = this.state;
    return member.memberList
      .filter(
        m => m.name.indexOf(searchKeyword) > -1
          && receiveMembers.indexOf(m.id) === -1
      )
      .map(this.createAutoCompleteItem);
  }


  onSearch = (value) => {
    this.setState({
      searchKeyword: value
    });
  }

  closeModal = () => {
    this.setState({
      memberModal: false
    });
  }

  onSelect = (id) => {
    const { receiveMembers } = this.state;
    this.setState({
      receiveMembers: receiveMembers.concat(parseInt(id, 10))
    });
  }

  onMessageSend = async () => {
    const { member } = this.props;
    const { receiveMembers, content, sendPhone } = this.state;
    const phoneNumbers = member.memberList.filter(m => receiveMembers.indexOf(m.id) > -1).map(m => m.phone_number);
    const response = await axios.post(`/messages/send/${this.isMMS ? 'mms' : 'sms'}`, {
      message: content,
      recipients: phoneNumbers,
      sendNo: sendPhone
    });

    console.dir(response);

    if (response.status === 200) {
      message.success('전송 성공');
    } else {
      message.error('전송 실패');
    }
  }

  render() {
    const { member } = this.props;
    const {
      receiveMembers, memberModal, memberDetailModal, currentMember, content, sendPhone
    } = this.state;

    const messageLength = (function (s, b, i, c) {
      // eslint-disable-next-line
      for (b = i = 0; c = s.charCodeAt(i++); b += c >> 7 ? 2 : 1);
      return b;
    }(content));

    this.isMMS = messageLength >= 90;
    return (
      <div>
        <Row>
          <Col>
            <h3>수신인</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            {
              receiveMembers.map((m, idx) => {
                const find = member.memberList.find(v => v.id === m);
                return (
                  <Tooltip title={find.phone_number} key={m}>
                    <Tag
                      closable
                      onClose={(e) => {
                        e.stopPropagation();
                        receiveMembers.splice(idx, 1);
                        this.setState({
                          receiveMembers
                        });
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        this.setState({
                          memberDetailModal: true,
                          currentMember: find
                        });
                      }}
                    >
                      {find.name}
                    </Tag>
                  </Tooltip>

                );
              })
            }
          </Col>
          <Col>
            총
            {
              ` ${receiveMembers.length} / ${member.memberList.length} 명`
            }
          </Col>
        </Row>
        <Row>
          <Col style={{ marginTop: '5px' }}>
            <AutoComplete
              style={{ width: '120px' }}
              dataSource={this.getDataSource()}
              onSearch={this.onSearch}
              onSelect={this.onSelect}
              size="small"
              placeholder="직접 입력"
              optionLabelProp="text"
            />
          </Col>
          <Col>

            <Button
              type="link"
              onClick={() => {
                this.setState({
                  receiveMembers: member.memberList.map(m => m.id)
                });
              }}
            >
              모든 회원

            </Button>
            <Button
              type="link"
              onClick={() => {
              this.setState({ receiveMembers: member.memberList.filter(m => m.paid_at === 'X').map(m => m.id) });
            }}
            >
              회비를 납부하지 않은 회원
            </Button>

            <Button
              type="primary"
              onClick={() => this.setState({ memberModal: true })}
            >
              직접 선택
            </Button>
          </Col>

          <Modal
            visible={memberModal}
            title="수신인을 선택해 주세요"
            onCancel={this.closeModal}
            footer={[
              <Button key="close" type="primary" onClick={this.closeModal}>확인</Button>
            ]}
          >
            <UserList
              memberList={member.memberList}
              isCollapsed
              rowSelection={{
                selectedRowKeys: receiveMembers,
                onChange: (selectedRowKeys) => {
                  this.setState({ receiveMembers: selectedRowKeys });
                },
                getCheckboxProps: record => ({
                  key: record.id
                })
              }}
            />
          </Modal>
          <MemberDetailModal
            visible={memberDetailModal}
            handleCancel={() => this.setState({ memberDetailModal: false })}
            member={currentMember}
          />
        </Row>
        <Row>
          <Col>
            <h3>보낼 메시지</h3>
          </Col>
          <Col>
            <TemplateModal onTemplateSelect={(c) => {
              this.setState({ content: c });
            }}
            />
            <SendPhoneModal
              onPhoneSelect={(c) => {
                this.setState({ sendPhone: c });
              }}
            />
          </Col>
          <Col>
            <Input.TextArea value={content} onChange={e => this.setState({ content: e.target.value })} autosize={{ minRows: 4 }} />
            {this.isMMS ? 'MMS' : `(${messageLength} / ${config.maxSmsSize} byte) 넘을 시 MMS로 변환`}
          </Col>
          <Col>
            {`발신 번호 : ${sendPhone}`}
          </Col>
        </Row>
        <Row style={{ marginTop: '10px' }}>
          <Button type="primary" onClick={this.onMessageSend}>보내기</Button>
        </Row>
      </div>
    );
  }
}

export default Message;
