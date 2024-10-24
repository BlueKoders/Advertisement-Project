import React, { useEffect } from 'react';
import { Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const AdvertTable = ({ advertsList, handleEdit, handleDelete }) => {

    useEffect(() => {
        fetchAdverts();
      }, []);
    
      const fetchAdverts = async () => {
        try {
          const response = await axios.get('https://advertisement-api-q89w.onrender.com/vendors/me/adverts');
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
            render: (price) => Number(price).toFixed(2),
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

    return (
        <div className="overflow-x-auto">
            <Table
                columns={columns}
                dataSource={advertsList}
                rowKey="id"
            />
        </div>
    );
};

export default AdvertTable;
