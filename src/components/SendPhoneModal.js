/* eslint-disable no-eval */
import React from 'react';
import {
  Button, Modal, message, Table
} from 'antd';
import axios from '../axios';
import SendPhoneAddModal from './SendPhoneAddModal';

class SendPhoneModal extends React.Component {
  state = {
    sendPhones: [],
    waitPhones: [],
    showModal: false,
    showList: false,
  }

  async componentDidMount() {
    const nums = await axios.get('/messages/numbers?pageNum=1');
    if (nums.status === 200) {
      this.setState({
        sendPhones: eval(`(${nums.data})`),
      });
    } else {
      message.error(`템플릿 리스트를 가지고 오는데 실패했습니다. (${nums.status})`);
    }
    const numms = await axios.get('/messages/requests/numbers');
    const phones = [];
    const { data } = eval(`(${numms.data})`);
    data.forEach((phone, index) => {
      phones.push({
        sendNo: phone.sendNos[0],
        // eslint-disable-next-line no-nested-ternary
        status: phone.status === 'REGIST_REQUEST' ? '대기 중' : phone.status === 'REJECT' ? '등록 거절' : '등록 완료',
        id: index
      });
    });
    this.setState({
      waitPhones: phones,
    });
  }

  addPhone = async (phone, file) => {
    const { waitPhones } = this.state;
    console.log(waitPhones);
    const found = waitPhones.find(e => e.sendNo === phone);
    console.log(found);
    if (found !== undefined) {
      if (found.status === '대기 중' || found.status === '등록 완료') {
        message.error('입력한 번호가 승인 대기중이거나 승인 완료된 번호입니다');
        return;
      }
    }
    const form = new FormData();
    form.append('request_num', phone);
    form.append('request_file', file);
    const response = await axios.post('/messages/requests/numbers', form);
    if (response.status === 200) {
      message.success('등록 신청이 완료되었습니다. 승인까지 1 ~ 2일이 소요됩니다');
    } else {
      message.error('템플릿 추가 실패');
    }
  }

  render() {
    const { onPhoneSelect } = this.props; 
    const {
 showModal, sendPhones, showList, waitPhones
} = this.state;

    return (
      <>
        <Button onClick={() => this.setState({ showModal: true })}>발신번호 선택</Button>
        <Modal
          visible={showModal}
          title="발신번호 선택"
          onCancel={() => this.setState({ showModal: false })}
          footer={[
            <Button key="openList" onClick={() => this.setState({ showList: true })}>신청 목록 보기</Button>,
            <SendPhoneAddModal onAddSendPhone={this.addPhone} key="sendPhoneAddModal" />,
            <Button key="close" onClick={() => this.setState({ showModal: false })}>닫기</Button>,
          ]}
        >
          번호를 클릭시 발신 번호가 바뀝니다.
          <Table
            dataSource={sendPhones.data}
            onRow={record => ({
              onClick: () => {
                onPhoneSelect(record.sendNo);
              }
            })}
            rowKey="sendNo"
          >
            <Table.Column title="발신 번호 목록" dataIndex="sendNo" key="id" />
          </Table>
        </Modal>
        <Modal visible={showList} title="신청 목록" onCancel={() => this.setState({ showList: false })}>
          <Table dataSource={waitPhones} rowKey="id">
            <Table.Column title="번호" dataIndex="sendNo" key="id" />
            <Table.Column title="상태" dataIndex="status" key="id" />
          </Table>
        </Modal>
      </>
    );
  }
}

export default SendPhoneModal;
