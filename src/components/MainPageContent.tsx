import React, { useState, useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';

import LabelGUI from 'components/sections/LabelGUI';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const MainPageContent = () => {

  const items: MenuItem[] = [
    getItem('Tools', 'sub1', <UserOutlined />, [
      getItem('Label', '1'), 
    ]),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const {token: { colorBgContainer }} = theme.useToken();

  const handleMenuClick = (e: any) => {
    setActiveItem(e.key);
  }

  useEffect(() => {
    setActiveItem('1');
  }, [setActiveItem]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1', 'sub2']}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider> */}
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px', padding: "16px", background: colorBgContainer }}>       
          {activeItem === '1' && <LabelGUI collectionName="default" mediaType="image" />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainPageContent;
