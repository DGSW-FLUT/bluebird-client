import React from 'react';
import { observer, inject } from 'mobx-react';
import {
  Row, Col, Table, Button, Upload
} from 'antd';

const { Column } = Table;

@inject('backup')
@observer
class BackupList extends React.Component {
  render() {
    const { backup } = this.props;
    return (
      <div>
        <Row type="flex">
          <h2>
            백업 기록
          </h2>
          <Col span={24}>
            <Table dataSource={backup.backupList} rowKey={item => item.idx}>
              <Column title="번호" dataIndex="idx" key="idx" />
              <Column title="파일명" dataIndex="dump_sql_path" key="dump_sql_path" />
              <Column title="백업 날짜" dataIndex="created_at" key="created_at" />
              <Column
                title="다운로드"
                key="download"
                render={() => (
                  <Button type="primary" icon="download">
                    다운로드
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
      </div>

    );
  }
}

export default BackupList;
