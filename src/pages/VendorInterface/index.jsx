import React, { useState } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Table, Modal, Form, Input, Select, InputNumber, message } from 'antd'; // import message
import { apiEditAdverts, apiPostAdverts } from '../../services/auth'; // Import API services

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
  getItem('Dashboard', '1', <PieChartOutlined />),
  getItem('Adverts', '2', <DesktopOutlined />),
  getItem('Account', 'sub1', <UserOutlined />, [
    getItem('Profile', '3'),
    getItem('Settings', '4'),
  ]),
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
  const [selectedMenu, setSelectedMenu] = useState('2');
  const [loading, setLoading] = useState(false);
  const [adverts, setAdverts] = useState([
    { 
      id: 1, 
      title: 'Premium Notebooks', 
      description: 'High-quality notebooks for students',
      location: 'Accra',
      price: 25.99,
      category: 'paper products',
      images: []
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAdvert, setEditingAdvert] = useState(null);
  const [form] = Form.useForm();

  const columns = [
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
      render: (price) => price.toFixed(2),
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
            onClick={() => handleDelete(record.id)}
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
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this advert?',
      onOk() {
        setAdverts(adverts.filter(advert => advert.id !== id));
        message.success('Advert deleted successfully');
      },
    });
  };

  const handleOk = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      // Append basic fields
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('location', values.location);
      formData.append('price', values.price);
      formData.append('category', values.category);
      
      // Handle single image
      const fileInput = values.images;
      if (fileInput && fileInput.files && fileInput.files[0]) {
        formData.append('image', fileInput.files[0]);
      }

      if (editingAdvert) {
        await apiEditAdverts(editingAdvert.id, formData);
        setAdverts(adverts.map(advert => 
          advert.id === editingAdvert.id ? { ...advert, ...values } : advert

        ));
        message.success('Advert updated successfully');
      } else {
        const response = await apiPostAdverts(formData);
        setAdverts([...adverts, response.data]);
        message.success('Advert posted successfully');
      }
      
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
          defaultSelectedKeys={['2']}
          mode="inline"
          items={items}
          onSelect={({ key }) => setSelectedMenu(key)}
          className="bg-blue-800"
        />
      </Sider>
      
      <Layout>
        <Header className="bg-white shadow-md px-6">
          <div className="flex items-center h-full">
            <h1 className="text-xl font-semibold text-blue-800">Vendor Dashboard</h1>
          </div>
        </Header>
        
        <Content className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm breadcrumbs">
              <span className="text-gray-600">Vendor</span>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-blue-600">Adverts</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            {selectedMenu === '2' && (
              <div className="space-y-6">
                <button 
                  onClick={() => setIsModalVisible(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <PlusOutlined className="mr-2" />
                  Add New Advert
                </button>
                
                <div className="overflow-x-auto">
                  <Table 
                    columns={columns} 
                    dataSource={adverts}
                    className="shadow-sm"
                    rowClassName="hover:bg-blue-50"
                  />
                </div>
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
                  label={<span className="text-sm font-medium text-blue-700">Title</span>}
                  rules={[{ required: true, message: 'Please input the title!' }]}
                >
                  <Input 
                    className="w-full rounded-lg border-gray-300 shadow-sm 
                             focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
                  />
                </Form.Item>

                <Form.Item
                  name="description"
                  label={<span className="text-sm font-medium text-blue-700">Description</span>}
                >
                  <TextArea 
                    className="w-full rounded-lg border-gray-300 shadow-sm 
                             focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
                    rows={4} 
                  />
                </Form.Item>

                <Form.Item
                  name="location"
                  label={<span className="text-sm font-medium text-blue-700">Location</span>}
                >
                  <Input
                    className="w-full rounded-lg border-gray-300 shadow-sm 
                             focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
                  />
                </Form.Item>

                <Form.Item
                  name="price"
                  label={<span className="text-sm font-medium text-blue-700">Price (GH₵)</span>}
                >
                  <InputNumber 
                    className="w-full rounded-lg border-gray-300 shadow-sm 
                             focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
                    min={1} 
                    precision={2} 
                  />
                </Form.Item>

                <Form.Item
                  name="category"
                  label={<span className="text-sm font-medium text-blue-700">Category</span>}
                  rules={[{ required: true, message: 'Please select a category!' }]}
                >
                  <Select
                    placeholder="Select a category"
                    className="w-full rounded-lg border-gray-300 shadow-sm 
                             focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    options={categories}
                  />
                </Form.Item>

                <Form.Item
                  name="image"
                  label={<span className="text-sm font-medium text-blue-700">Image</span>}
                >
                  <Input 
                    type="file"
                    className="w-full rounded-lg border-gray-300 shadow-sm 
                              focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
                    accept="image/*"
                  />
                </Form.Item>

                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors duration-200"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className={`px-4 py-2 text-white rounded-lg bg-blue-600 hover:bg-blue-700 
                                transition-colors duration-200 ${loading && 'cursor-not-allowed'}`}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : editingAdvert ? 'Save Changes' : 'Post Advert'}
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
