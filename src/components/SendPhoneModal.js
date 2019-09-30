import React from 'react';
import {
  Button, Modal, message, Table
} from 'antd';
import axios from '../axios';
import SendPhoneAddModal from './SendPhoneAddModal';

class SendPhoneModal extends React.Component {
  state = {
    sendPhones: [],
    showModal: false
  }

  async componentDidMount() {
    const nums = await axios.get('/messages/numbers?pageNum=1');
    if (nums.status === 200) {
      this.setState({
        // eslint-disable-next-line no-eval
        sendPhones: eval(`(${nums.data})`),
      });
    } else {
      message.error(`템플릿 리스트를 가지고 오는데 실패했습니다. (${nums.status})`);
    }
    const numms = await axios.get('/messages/requests/numbers');
    // eslint-disable-next-line no-eval
    console.log(eval(`(${numms.data})`));
  }

  addPhone = async (phone, file) => {
    const form = new FormData();
    form.append('request_num', phone);
    form.append('request_file', file);
    const response = await axios.post('/messages/requests/numbers', form);
    console.dir(response);
    if (response.status === 201) {
      message.success('등록 신청이 완료되었습니다. 승인까지 1 ~ 2일이 소요됩니다');
    } else {
      message.error('템플릿 추가 실패');
    }
  }

  render() {
    const { onPhoneSelect } = this.props; 
    const { showModal, sendPhones } = this.state;
    console.log(sendPhones.data);
    return (
      <>
        <Button onClick={() => this.setState({ showModal: true })}>발신번호 선택</Button>
        <Modal
          visible={showModal}
          title="발신번호 선택"
          onCancel={() => this.setState({ showModal: false })}
          footer={[
            <SendPhoneAddModal onAddSendPhone={this.addPhone} />,
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
            <Table.Column title="발신 번호 목록" dataIndex="sendNo" key="sendNo" />
          </Table>
        </Modal>
      </>
    );
  }
}

export default SendPhoneModal;
