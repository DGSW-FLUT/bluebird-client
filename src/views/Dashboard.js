import React from 'react';
import {
  Col, Statistic, Row, Icon,
} from 'antd';
import { inject, observer } from 'mobx-react';

@inject('layout')
@observer
class Dashboard extends React.Component {
  render() {
    const { layout } = this.props;
    const { isCollapsed } = layout;

    return (
      <Row type="flex">
        <Col xs={{ span: isCollapsed ? 24 : 12 }}>
          <Statistic title="총 회원" value={32} prefix={<Icon type="user" />} style={{ marginBottom: isCollapsed ? 24 : 0 }} />
        </Col>
        <Col xs={{ span: isCollapsed ? 24 : 12 }}>
          <Statistic title="총 회원" value={32} />
        </Col>
      </Row>
    );
  }
}

export default Dashboard;
