import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Button, message, Modal, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';  // Importing icon for button
import Sidebar from './components/Sidebar';
import AppHeader from './components/AppHeader';
import DashboardView from './components/DashboardView';
import AdvertTable from './components/AdvertTable';
import VenAdForm from './components/VenAdForm';

const { Content } = Layout;

const VendorInterface = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('1');
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
      const response = await axios.get('https://advertisement-api-q89w.onrender.com/vendors/me/adverts');
      setAdvertsList(response.data);
    } catch (error) {
      message.error('Failed to fetch adverts');
    }
  };

  const handleEdit = (record) => {
    setEditingAdvert(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://advertisement-api-q89w.onrender.com/adverts/${id}`);
      message.success('Advert deleted');
      fetchAdverts();
    } catch (error) {
      message.error('Failed to delete advert');
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingAdvert(null);
    form.resetFields();
  };

  const handleOk = async (values) => {
    console.log('val', values)
    setLoading(true);
    try {
      if (editingAdvert) {
        await axios.patch(`https://advertisement-api-q89w.onrender.com/adverts/${editingAdvert.id}`, values);
        message.success('Advert updated');
      } else {
        await axios.post('https://advertisement-api-q89w.onrender.com/adverts', values);
        message.success('Advert created');
      }
      fetchAdverts();
      handleModalClose();
    } catch (error) {
      message.error('Failed to submit advert');
    }
    setLoading(false);
  };

  const handleAddNew = () => {
    form.resetFields();  // Clear form fields before opening
    setEditingAdvert(null);  // Ensure no advert is being edited
    setIsModalVisible(true);  // Open modal
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} setSelectedMenu={setSelectedMenu} />
      <Layout>
        <AppHeader selectedMenu={selectedMenu} />
        <Content className="m-6">
          {selectedMenu === '1' ? (
            <DashboardView advertsList={advertsList} />
          ) : (
            <div>
              <div className="flex justify-end mb-4">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddNew}
                >
                  Add New Advert
                </Button>
              </div>
              <AdvertTable advertsList={advertsList} handleEdit={handleEdit} handleDelete={handleDelete} />
            </div>
          )}
        </Content>
      </Layout>
      <Modal
        title={editingAdvert ? 'Edit Advert' : 'Create Advert'}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <VenAdForm form={form} handleOk={handleOk} loading={loading} />
      </Modal>
    </Layout>
  );
};

export default VendorInterface;
