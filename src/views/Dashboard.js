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
        <Col span={isCollapsed ? 24 : 12} style={{ marginBottom: isCollapsed ? 32 : 0 }}>
          <Statistic title="총 회원" value={32} prefix={<Icon type="user" />} />
          <Row type="flex" style={{ marginTop: 12 }}>
            <Col span={isCollapsed ? 24 : 8}>
              <Statistic title="올해 회원 증감" value={32} />
            </Col>
            <Col span={isCollapsed ? 24 : 8}>
              <Statistic title="정회원" value={32} />
            </Col>
            <Col span={isCollapsed ? 24 : 8}>
              <Statistic title="일반회원" value={32} />
            </Col>
          </Row>
        </Col>
        <Col span={isCollapsed ? 24 : 12}>
          <Statistic title="미납 회비" value="33,000 원" prefix={<Icon type="dollar" />} />
        </Col>
      </Row>
    );
  }
}

export default Dashboard;
