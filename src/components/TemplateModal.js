import React from 'react';
import {
  Button, Modal, Table, message
} from 'antd';
import axios from '../axios';
import TemplateAddModal from './TemplateAddModal';

class TemplateModal extends React.Component {
  state = {
    templates: [],
    showModal: false
  }

  async componentWillMount() {
    const tmps = await axios.get('/messages');
    if (tmps.status === 200) {
      this.setState({
        templates: tmps.data
      });
    } else {
      message.error(`템플릿 리스트를 가지고 오는데 실패했습니다. (${tmps.status})`);
    }
  }

  addTemplate = async (content) => {
    const { templates } = this.state;
    const response = await axios.post('/messages', { content });
    if (response.status === 201) {
      this.setState({
        templates: templates.concat(response.data)
      });
    } else {
      message.error('템플릿 추가 실패');
    }
  }

  removeTemplate = async (index, id) => {
    const { templates } = this.state;
    const response = await axios.delete(`/messages/${id}`);
    templates.splice(index, 1);
    if (response.status === 204) {
      this.setState({
        templates
      });
    } else {
      message.error('템플릿 삭제 실패');
    }
  }

  render() {
    const { onTemplateSelect } = this.props;
    const { showModal, templates } = this.state;
    return (
      <>
        <Button onClick={() => this.setState({ showModal: true })}>템플릿 선택</Button>
        <Modal
          visible={showModal}
          title="템플릿 선택"
          onCancel={() => this.setState({ showModal: false })}
          footer={[
            <TemplateAddModal key="addTemplate" onAddTemplate={this.addTemplate} />,
            <Button key="close" onClick={() => this.setState({ showModal: false })}>닫기</Button>,
          ]}
        >
          내용을 클릭시 메시지가 바뀝니다.
          <Table
            dataSource={templates}
            onRow={record => ({
              onClick: () => {
                onTemplateSelect(record.content);
              }
            })}
            rowKey="id"
          >
            <Table.Column title="내용" dataIndex="content" key="content" />
            <Table.Column
              key="action"
              render={(text, record, idx) => (
                <Button
                  type="link"
                  onClick={(e) => {
                    e.stopPropagation();
                    this.removeTemplate(idx, record.id);
                  }}
                >
                  삭제

                </Button>
              )}
            />
          </Table>
        </Modal>
      </>
    );
  }
}

export default TemplateModal;
