import React from 'react';
import {
  Layout, Menu, Icon,
} from 'antd';

import { observer, inject } from 'mobx-react';

import logo from '../logo.svg';
import Dashboard from '../views/Dashboard';

const {
  Sider, Header, Content
} = Layout;

@inject('layout')
@observer
class App extends React.Component {
  setCollapsed = (collapsed) => {
    const { layout } = this.props;

    layout.setCollapsed(collapsed);
  };

  toggleCollapsed = () => {
    const { layout } = this.props;

    layout.toggleCollapsed();
  };

  render() {
    const { layout } = this.props;

    const { isCollapsed } = layout;
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth={80}
          style={{ height: '100vh', position: 'fixed' }}
          onCollapse={(collapsed) => {
            this.setCollapsed(collapsed);
          }}
        >
          <img src={logo} alt="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {/* 라우터 메뉴 */}
            <Menu.Item key="1">
              <Icon type="menu" />
              <span>대시보드</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="user" />
              <span>회원 관리</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="save" />
              <span>백업</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: isCollapsed ? 80 : 200 }}>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content
            style={{
              margin: '32px 24px',
              padding: 24,
              background: '#fff',
            }}
          >
            {/* 라우터 뷰 */}
            <Dashboard />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
