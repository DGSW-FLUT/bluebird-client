import React, { useState } from 'react';

import {
  Button, Layout, Menu, Icon
} from 'antd';

import logo from './logo.svg';

const {
  Sider, Header, Content
} = Layout;

const App = () => {
  const [number, setNumber] = useState(0);
  const [isCollapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={isCollapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0
        }}
      >
        <img src={logo} alt="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span>nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span>nav 3</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: isCollapsed ? 80 : 200 }}>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={isCollapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => setCollapsed(!isCollapsed)}
            style={{ marginLeft: 32 }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
          <div>
            {number}
            &nbsp;
            <Button onClick={() => setNumber(number + 1)}>+</Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
