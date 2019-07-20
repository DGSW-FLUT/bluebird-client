import React from 'react';
import { Switch } from 'react-router-dom';

import RouteWithLayout from './RouteWithLayout';
import DefaultLayout from './DefaultLayout';
import FullpageLayout from './FullpageLayout';

import Dashboard from '../containers/Dashboard';
import UserManage from '../containers/UserManage';
import BackupList from '../containers/BackupList';

// TODO: routes.js 파일에서 유동적으로 불러오게 전환하고 싶어요

const App = () => (
  <Switch>
    {/* DefaultLayout */}
    <RouteWithLayout path="/" exact layout={DefaultLayout} component={Dashboard} />
    <RouteWithLayout path="/user" layout={DefaultLayout} component={UserManage} />
    <RouteWithLayout path="/message" layout={DefaultLayout} component={() => <div>Making</div>} />
    <RouteWithLayout path="/backup" layout={DefaultLayout} component={BackupList} />
    <RouteWithLayout path="/admin" layout={DefaultLayout} component={() => <div>Making</div>} />
    {/* FullpageLayout */}
    <RouteWithLayout path="/login" layout={FullpageLayout} component={() => <div>Making</div>} />
    <RouteWithLayout path="*" layout={FullpageLayout} component={() => <div>404</div>} />
  </Switch>
);

export default App;
