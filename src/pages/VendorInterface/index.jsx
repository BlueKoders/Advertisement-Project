import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  HomeOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Table, Modal, Form, Input, Select, InputNumber, message, Upload, Card, Row, Col, Statistic } from 'antd';

const { Header, Content, Sider } = Layout;
const { TextArea } = Input;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
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

const categories = [
  { value: 'writing instruments', label: 'Writing Instruments' },
  { value: 'paper products', label: 'Paper Products' },
  { value: 'organization', label: 'Organization' },
  { value: 'art supplies', label: 'Art Supplies' },
  { value: 'technology', label: 'Technology' },
  { value: 'classroom essentials', label: 'Classroom Essentials' },
  { value: 'sports & pe', label: 'Sports & PE' },
  { value: 'school uniforms', label: 'School Uniforms' },
];

const VendorInterface = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('1'); // Default to Dashboard
  const [loading, setLoading] = useState(false);
  const [advertsList, setAdvertsList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAdvert, setEditingAdvert] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAdverts();
  }, []);

  const fetchAdverts = async () => {
    try {
      const response = await axios.get('https://advertisement-api-q89w.onrender.com/adverts');
      setAdvertsList(response.data);
    } catch (error) {
      message.error('Failed to fetch adverts');
      console.error('Error fetching adverts:', error);
    }
  };

  const columns = [
    {
      title: 'Image',
      key: 'image',
      render: (_, record) => (
        <img 
          src={`https://savefiles.org/${record.image}?shareable_link=445`} 
          alt={record.title}
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text) => text.charAt(0).toUpperCase() + text.slice(1),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Price (GH₵)',
      dataIndex: 'price',
      key: 'price',
      render: (price) => {
        const numericPrice = Number(price);
        return isNaN(numericPrice) ? price : numericPrice.toFixed(2);
      },
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(record)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <EditOutlined className="mr-1" /> Edit
          </button>
          <button
            onClick={() => handleDelete(record._id)}
            className="flex items-center text-red-600 hover:text-red-800"
          >
            <DeleteOutlined className="mr-1" /> Delete
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEditingAdvert(record);
    form.setFieldsValue({
      ...record,
      images: undefined
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://advertisement-api-q89w.onrender.com/adverts/${id}`);
      message.success('Advert deleted successfully');
      fetchAdverts();
    } catch (error) {
      message.error('Failed to delete advert');
      console.error('Error deleting advert:', error);
    }
  };

  const handleOk = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('location', values.location);
      formData.append('price', Number(values.price));
      formData.append('category', values.category);
      
      if (values.images && values.images.fileList && values.images.fileList[0]) {
        formData.append('image', values.images.fileList[0].originFileObj);
      }

      if (editingAdvert) {
        await axios.patch(
          `https://advertisement-api-q89w.onrender.com/adverts/${editingAdvert._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        message.success('Advert updated successfully');
      } else {
        await axios.post(
          'https://advertisement-api-q89w.onrender.com/adverts',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        message.success('Advert posted successfully');
      }
      
      fetchAdverts();
      setIsModalVisible(false);
      setEditingAdvert(null);
      form.resetFields();
     
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message || 'Server error occurred');
      } else if (error.request) {
        message.error('No response from server. Please check your connection.');
      } else {
        message.error('Error creating advert: ' + error.message);
      }
      console.error('Error details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingAdvert(null);
    form.resetFields();
  };

  const DashboardView = () => {
    const totalAdverts = advertsList.length;
    const totalValue = advertsList.reduce((sum, ad) => sum + Number(ad.price), 0);
    
    return (
      <div className="space-y-6">
        {/* Summary Statistics */}
        <Row gutter={16} className="mb-6">
          <Col span={8}>
            <Card>
              <Statistic
                title="Total Adverts"
                value={totalAdverts}
                prefix={<ShoppingOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Total Value"
                value={totalValue.toFixed(2)}
                prefix={<DollarOutlined />}
                suffix="GH₵"
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Products Grid */}
        <Row gutter={[16, 16]}>
          {advertsList.map(advert => (
            <Col xs={24} sm={12} md={8} lg={6} key={advert._id}>
              <Card
                hoverable
                cover={
                  <div className="h-48 overflow-hidden">
                    <img
                      alt={advert.title}
                      src={`https://savefiles.org/${advert.image}?shareable_link=445`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                }
                actions={[
                  <EditOutlined key="edit" onClick={() => handleEdit(advert)} />,
                  <DeleteOutlined key="delete" onClick={() => handleDelete(advert._id)} />
                ]}
                className="h-full flex flex-col"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 truncate">{advert.title}</h3>
                  <p className="text-gray-500 mb-2 text-sm">
                    {advert.description?.length > 100
                      ? `${advert.description.substring(0, 100)}...`
                      : advert.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-blue-600 font-medium">
                      GH₵ {Number(advert.price).toFixed(2)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {advert.location}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {advert.category}
                    </span>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  return (
    <Layout className="min-h-screen">
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        className="bg-blue-800"
      >
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
      
      <Layout>
        <Header className="bg-white shadow-md px-6">
          <div className="flex items-center h-full">
            <h1 className="text-xl font-semibold text-blue-800">
              {selectedMenu === '1' ? 'Dashboard' : 'Vendor Dashboard'}
            </h1>
          </div>
        </Header>
        
        <Content className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm breadcrumbs">
              <span className="text-gray-600">Vendor</span>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-blue-600">
                {selectedMenu === '1' ? 'Dashboard' : 'Adverts'}
              </span>
            </div>
            {selectedMenu === '2' && (
              <button 
                onClick={() => setIsModalVisible(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <PlusOutlined className="mr-2" />
                Add New Advert
              </button>
            )}
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            {selectedMenu === '1' ? (
              <DashboardView />
            ) : selectedMenu === '2' && (
              <div className="overflow-x-auto">
                <Table 
                  columns={columns} 
                  dataSource={advertsList}
                  className="shadow-sm"
                  rowClassName="hover:bg-blue-50"
                  rowKey="_id"
                />
              </div>
            )}
          </div>
        </Content>
      </Layout>

      <Modal
        title={null}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={720}
        className="p-0"
        closable={false}
        centered
      >
        <div className="relative min-h-[900px]">
          <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('./src/assets/images/notebook2.jpg')" }} />
          
          <div className="relative z-10 p-14">
            <div className="w-full max-w-md mx-auto bg-inherit rounded-lg shadow-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
                {editingAdvert ? "Edit Advert" : "Post a New Advert"}
              </h2>
              
              <Form
                form={form}
                layout="vertical"
                onFinish={handleOk}
                className="space-y-6"
              >
                <Form.Item
                  name="title"
                  label={<span className="text-sm font-medium text-gray-700">Title</span>}
                  rules={[{ required: true, message: 'Please enter the advert title' }]}
                >
                  <Input placeholder="Advert title" />
                </Form.Item>
                
                <Form.Item
                  name="description"
                  label={<span className="text-sm font-medium text-gray-700">Description</span>}
                  rules={[{ required: true, message: 'Please enter a description' }]}
                >
                  <TextArea rows={3} placeholder="Brief description of the advert" />
                </Form.Item>

                <Form.Item
                  name="category"
                  label={<span className="text-sm font-medium text-gray-700">Category</span>}
                  rules={[{ required: true, message: 'Please select a category' }]}
                >
                  <Select
                    showSearch
                    placeholder="Select a category"
                    options={categories}
                  />
                </Form.Item>
                
                <Form.Item
                  name="price"
                  label={<span className="text-sm font-medium text-gray-700">Price (GH₵)</span>}
                  rules={[{ required: true, message: 'Please enter the price' }]}
                >
                  <InputNumber min={0} placeholder="Price in Ghana cedis" className="w-full" />
                </Form.Item>
                
                <Form.Item
                  name="location"
                  label={<span className="text-sm font-medium text-gray-700">Location</span>}
                  rules={[{ required: true, message: 'Please enter the location' }]}
                >
                  <Input placeholder="Location" />
                </Form.Item>

                <Form.Item
                  name="image"
                  label={<span className="text-sm font-medium text-gray-700">Image Upload</span>}
                >
                  <Upload
                    listType="picture-card"
                    maxCount={1}
                    beforeUpload={() => false}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className={`${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                      } px-4 py-2 text-white rounded-lg transition-colors duration-200`}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : editingAdvert ? 'Update Advert' : 'Post Advert'}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default VendorInterface;