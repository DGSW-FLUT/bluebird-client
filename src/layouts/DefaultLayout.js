import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { inject, observer } from 'mobx-react';

import logo from '../logo.svg';
import routes from '../routes';

const { Sider, Header, Content } = Layout;

@inject('layout', 'member', 'manager')
@observer
class DefaultLayout extends React.Component {
  componentWillMount() {
    const { member, manager } = this.props;
    member.fetchMemberList();
    manager.fetchAdminList();
  }

  setCollapsed = (collapsed) => {
    const { layout } = this.props;
    layout.setCollapsed(collapsed);
  };

  render() {
    const { layout, children } = this.props;
    const { isCollapsed } = layout;

    const routesDOM = routes.map(route => (
      <Menu.Item key={route.key}>
        <Link to={route.url}>
          {isCollapsed === false && <Icon type={route.iconType} />}
          <span>{route.name}</span>
        </Link>
      </Menu.Item>
    ));

    return (
      <Layout>
        <Sider
          breakpoint="lg"
          trigger={null}
          collapsedWidth={0}
          style={{ height: '100vh', position: 'fixed' }}
          onCollapse={(collapsed) => {
            this.setCollapsed(collapsed);
          }}
        >
          <img src={logo} alt="logo" />
          <Menu theme="dark" mode="inline">
            {routesDOM}
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: isCollapsed ? 0 : 200 }}>
          {isCollapsed === true && (
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
              <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
                {routesDOM}
              </Menu>
            </Header>
          )}
          <Content
            style={{
              marginTop: isCollapsed ? 88 : 32,
              marginLeft: 32,
              marginRight: 32,
              marginBottom: 32,
              padding: 24,
              background: '#fff'
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default DefaultLayout;
