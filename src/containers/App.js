import React from 'react';
import {
  Button, Layout, Menu, Icon
} from 'antd';

import { observer, inject } from 'mobx-react';

import logo from '../logo.svg';

const {
  Sider, Header, Content
} = Layout;

@inject('test')
@observer
class App extends React.Component {
  state = {
    isCollapsed: false
  }

  setCollapsed = (collapsed) => {
    this.setState({
      isCollapsed: collapsed
    });
  };

  render() {
    const { isCollapsed } = this.state;
    const { test } = this.props;
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{ height: '100vh', position: 'fixed' }}
          onCollapse={(collapsed) => {
            this.setCollapsed(collapsed);
          }}
        >
          <img src={logo} alt="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
        <Layout style={{ marginLeft: isCollapsed ? 0 : 200 }}>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content
            style={{
              margin: '32px 24px',
              padding: 24,
              background: '#fff',
            }}
          >
            <div>
              {test.value}
              &nbsp;
              <Button onClick={() => { test.setValue(test.value + 1); console.log('clicked'); }}>+</Button>
            </div>
            ...
            <br />
            Really
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            long
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            content
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
