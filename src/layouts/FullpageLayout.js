import React from 'react';
import {
  Layout,
} from 'antd';

const { Content } = Layout;

const FullpageLayout = (props) => {
  const { children } = props;
  return (
    <Layout>
      <Content
        style={{
          margin: 32,
          padding: 24,
          background: '#fff',
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default FullpageLayout;
