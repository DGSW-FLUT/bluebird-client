import React from 'react';
import { observer, inject } from 'mobx-react';
import {
  Row, Col, Table, Button, Upload, Modal, message
} from 'antd';
import Loadable from '../components/Loadable';
import UserList from '../components/UserList';

const { Column } = Table;

@inject('backup', 'layout')
@observer
class BackupList extends React.Component {
  state = {
    currentBackup: {},
    modalVisible: false,
  };

  loadable = React.createRef();

  componentDidMount() {
    const { backup } = this.props;
    this.loadable.current.setPending(true);
    backup.fetchBackupList().then(() => {
      this.loadable.current.setPending(false);
    });
  }

  showModal = (backup) => {
    this.setState({
      currentBackup: backup,
      modalVisible: true
    });
  }

  hideModal = () => {
    this.setState({
      modalVisible: false
    });
  }

  addBackup = async () => {
    const { backup } = this.props;
    const result = await backup.addBackup();
    if (result) {
      message.success('백업 성공');
    } else {
      message.error('백업 실패.');
    }
  }

  render() {
    const { modalVisible, currentBackup } = this.state;
    const { backup, layout } = this.props;
    return (
      <Loadable ref={this.loadable}>
        <Row type="flex">
          <h2>
            백업 기록
          </h2>
          <Col span={24}>
            <Table dataSource={backup.backups} rowKey={item => item.id}>
              <Column title="백업 번호" dataIndex="id" key="id" />
              <Column title="회원 수" dataIndex="userCount" key="userCount" />
              <Column title="백업 날짜" dataIndex="created_at" key="created_at" />
              <Column
                title="회원 보기"
                key="detail"
                render={data => (
                  <Button type="primary" icon="unordered-list" onClick={() => this.showModal(data)}>
                    회원 보기
                  </Button>
                )}
              />
            </Table>
          </Col>
        </Row>
        <Row type="flex" gutter={16}>
          <Col>
            <Button type="primary" onClick={this.addBackup}>
              파일 백업하기
            </Button>
          </Col>
        </Row>
        <Modal
          title="백업 데이터 보기"
          visible={modalVisible}
          onCancel={this.hideModal}
          width={layout.isCollapsed ? 520 : 800}
        >
          <UserList pageSize={5} isCollapsed={layout.isCollapsed} memberList={currentBackup.dump_data} />
        </Modal>
      </Loadable>

    );
  }
}

export default BackupList;
