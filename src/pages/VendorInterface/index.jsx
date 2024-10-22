import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Table, Space, Modal, Form, Input, Button } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Dashboard', '1', <PieChartOutlined />),
  getItem('Adverts', '2', <DesktopOutlined />),
  getItem('Account', 'sub1', <UserOutlined />, [
    getItem('Profile', '3'),
    getItem('Settings', '4'),
  ]),
];

const VendorInterface = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('2');
  const [adverts, setAdverts] = useState([
    { id: 1, title: 'Advert 1', description: 'Description 1' },
    { id: 2, title: 'Advert 2', description: 'Description 2' },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAdvert, setEditingAdvert] = useState(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}><EditOutlined /> Edit</a>
          <a onClick={() => handleDelete(record.id)}><DeleteOutlined /> Delete</a>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEditingAdvert(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this advert?',
      onOk() {
        setAdverts(adverts.filter(advert => advert.id !== id));
      },
    });
  };

  const handleOk = (values) => {
    if (editingAdvert) {
      setAdverts(adverts.map(advert => 
        advert.id === editingAdvert.id ? { ...advert, ...values } : advert
      ));
    } else {
      const newAdvert = {
        id: Math.max(...adverts.map(a => a.id)) + 1,
        ...values,
      };
      setAdverts([...adverts, newAdvert]);
    }
    setIsModalVisible(false);
    setEditingAdvert(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingAdvert(null);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['2']}
          mode="inline"
          items={items}
          onSelect={({ key }) => setSelectedMenu(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Vendor</Breadcrumb.Item>
            <Breadcrumb.Item>Adverts</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {selectedMenu === '2' && (
              <>
                <Button 
                  type="primary" 
                  onClick={() => setIsModalVisible(true)} 
                  style={{ marginBottom: 16 }}
                >
                  Add New Advert
                </Button>
                <Table columns={columns} dataSource={adverts} />
              </>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Vendor Dashboard ©{new Date().getFullYear()} Created by YourCompany
        </Footer>
      </Layout>

      <Modal
        title={editingAdvert ? "Edit Advert" : "Add New Advert"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={editingAdvert}
          onFinish={handleOk}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingAdvert ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default VendorInterface;