import React from 'react';
import { observer, inject } from 'mobx-react';
import {
  Row, Col, Table, Button, Upload, Modal
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
            <Table dataSource={backup.backupList} rowKey={item => item.idx}>
              <Column title="번호" dataIndex="id" key="id" />
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
            <Button type="primary">
              파일 백업하기
            </Button>
          </Col>
          <Col>
            <Upload>
              <Button type="danger" icon="upload">
                파일 복원하기
              </Button>
            </Upload>
          </Col>
        </Row>
        <Modal
          title="백업 데이터 보기"
          visible={modalVisible}
          onCancel={this.hideModal}
          width={layout.isCollapsed ? 520 : 800}
        >
          <UserList isCollapsed={layout.isCollapsed} memberList={currentBackup.dump_data} />
        </Modal>
      </Loadable>

    );
  }
}

export default BackupList;
