import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { ShoppingOutlined, DollarOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const DashboardView = ({ advertsList }) => {
  const totalAdverts = advertsList.length;
  const totalValue = advertsList.reduce((sum, ad) => sum + Number(ad.price), 0);

  return (
    <div className="space-y-6">
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
          <Col xs={24} sm={12} md={8} lg={6} key={advert.id}>
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
                <DeleteOutlined key="delete" onClick={() => handleDelete(advert.id)} />
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

export default DashboardView;