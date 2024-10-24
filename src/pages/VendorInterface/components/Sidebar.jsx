import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, PieChartOutlined, DesktopOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const items = [
  getItem('Home', 'home', <HomeOutlined />),
  getItem('Dashboard', '1', <PieChartOutlined />),
  getItem('Adverts', '2', <DesktopOutlined />),
  getItem('Account', 'sub1', <UserOutlined />, [
    getItem('Profile', '3'),
    getItem('Settings', '4'),
  ]),
  getItem('Logout', 'logout', <LogoutOutlined />),
];

const Sidebar = ({ collapsed, setCollapsed, setSelectedMenu }) => (
  <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} className="bg-blue-800">
    <div className="h-16 m-4 bg-blue-900 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-xl">VD</span>
    </div>
    <Menu
      theme="dark"
      defaultSelectedKeys={['1']}
      mode="inline"
      items={items}
      onSelect={({ key }) => setSelectedMenu(key)}
      className="bg-blue-800"
    />
  </Sider>
);

export default Sidebar;
