import React from 'react';
import { Form, Input, Select, InputNumber, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

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

const VendorAdForm = ({ form, loading, handleOk, editingAdvert }) => {
  return (
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
        <Select showSearch placeholder="Select a category" options={categories} />
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
  );
};

export default VendorAdForm;
