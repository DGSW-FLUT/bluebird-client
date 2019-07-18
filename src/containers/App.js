import React from 'react';
import {
  Layout, Menu, Icon,
} from 'antd';

import { Route, Link, Switch } from 'react-router-dom';

import { observer, inject } from 'mobx-react';

import logo from '../logo.svg';
import Dashboard from '../views/Dashboard';
import UserManage from '../views/UserManage';

import routes from '../routes';

const {
  Sider, Header, Content
} = Layout;

// @inject('layout')
// @observer
// class App extends React.Component {
//   setCollapsed = (collapsed) => {
//     const { layout } = this.props;

//     layout.setCollapsed(collapsed);
//   };

//   toggleCollapsed = () => {
//     const { layout } = this.props;

//     layout.toggleCollapsed();
//   };

//   render() {
//     const { layout } = this.props;

//     const { isCollapsed } = layout;

//     const routesDOM = routes.map(route => (
//       <Menu.Item key={route.key}>
//         <Link to={route.url}>
//           {isCollapsed === false && <Icon type={route.iconType} />}
//           <span>{route.name}</span>
//         </Link>
//       </Menu.Item>
//     ));

//     return (
//       <Layout>
//         <Sider
//           breakpoint="lg"
//           trigger={null}
//           collapsedWidth={0}
//           style={{ height: '100vh', position: 'fixed' }}
//           onCollapse={(collapsed) => {
//             this.setCollapsed(collapsed);
//           }}
//         >
//           <img src={logo} alt="logo" />
//           <Menu theme="dark" mode="inline">
//             {routesDOM}
//           </Menu>
//         </Sider>
//         <Layout style={{ marginLeft: isCollapsed ? 0 : 200 }}>
//           {isCollapsed === true && (
//             <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
//               <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
//                 {routesDOM}
//               </Menu>
//             </Header>
//           )}
//           <Content
//             style={{
//               marginTop: isCollapsed ? 88 : 32,
//               marginLeft: 32,
//               marginRight: 32,
//               marginBottom: 32,
//               padding: 24,
//               background: '#fff',
//             }}
//           >
//             <Switch>
//               <Route path="/" exact component={Dashboard} />
//               <Route path="/user" component={UserManage} />
//               <Route path="/backup" component={() => <div>Backup</div>} />
//             </Switch>
//           </Content>
//         </Layout>
//       </Layout>
//     );
//   }
// }

const App = inject('layout')(observer((props) => {
  const { layout } = props;
  const { isCollapsed } = layout;

  const setCollapsed = (collapsed) => {
    layout.setCollapsed(collapsed);
  };

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
          setCollapsed(collapsed);
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
            background: '#fff',
          }}
        >
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/user" component={UserManage} />
            <Route path="/backup" component={() => <div>Backup</div>} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}));

export default App;
