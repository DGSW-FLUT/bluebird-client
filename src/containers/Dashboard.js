import React from 'react';
import {
  Col, Statistic, Row, Icon, Spin,
} from 'antd';
import { inject, observer } from 'mobx-react';
import axios from '../axios';

@inject('layout', 'member')
@observer
class Dashboard extends React.Component {
  state = {
    increase: 0,
    decrease: 0,
    isLoading: true
  };

  async componentDidMount() {
    const response = await axios.get('/users/change');
    if (response.status === 200) {
      this.setState({ ...response.data, isLoading: false });
    }
  }

  render() {
    const { layout, member } = this.props;
    const { increase, decrease, isLoading } = this.state;
    const { isCollapsed } = layout;

    return (
      <Spin spinning={!member.isFetched}>
        <Row type="flex">
          <Col span={isCollapsed ? 24 : 12} style={{ marginBottom: isCollapsed ? 32 : 0 }}>
            <Statistic title="총 회원" value={member.memberCount} prefix={<Icon type="user" />} />
            <Row type="flex" style={{ marginTop: isCollapsed ? 0 : 12 }}>
              <Col span={isCollapsed ? 24 : 12}>
                <Statistic title="정회원 / 부회원" value={member.regularMemberCount} suffix={`/ ${member.memberCount - member.regularMemberCount}`} />
              </Col>
              <Col span={isCollapsed ? 24 : 12}>
                <Statistic
                  title="올해 회원 증감 수"
                  valueRender={() => (isLoading ? (<Spin />) : (
                    <React.Fragment>
                      <span style={{ color: '#3f8600' }}>
                        +
                        {increase}
                      </span>
                      {' '}
                      <span style={{ color: '#cf1322' }}>
                        -
                        {decrease}
                      </span>
                    </React.Fragment>
                  ))}
                />
              </Col>
            </Row>
          </Col>
          {/* <Col span={isCollapsed ? 24 : 12}>
          <Statistic title="미납 회비" value="33,000 원" prefix={<Icon type="dollar" />} />
        </Col> */}
        </Row>
      </Spin>

    );
  }
}

export default Dashboard;
