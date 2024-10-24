import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const AppHeader = ({ selectedMenu }) => (
  <Header className="bg-white shadow-md px-6">
    <div className="flex items-center h-full">
      <h1 className="text-xl font-semibold text-blue-800">
        {selectedMenu === '1' ? 'Dashboard' : 'Vendor Dashboard'}
      </h1>
    </div>
  </Header>
);

export default AppHeader;
