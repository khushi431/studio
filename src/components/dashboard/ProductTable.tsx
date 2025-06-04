// src/components/dashboard/ProductTable.tsx
"use client";

import { Card, Table, Typography, Dropdown, Button, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { TableColumnsType, MenuProps } from 'antd';

const { Title } = Typography;

interface Product {
  key: string;
  product: string;
  category: string;
  sold: number;
  price: number;
  earnings: number;
}

const columns: TableColumnsType<Product> = [
  {
    title: 'Products', // Updated from 'Product' as per image
    dataIndex: 'product',
    key: 'product',
    render: (text) => <a style={{fontSize: '12px'}}>{text}</a>,
  },
  {
    title: 'Categories', // Updated from 'Category'
    dataIndex: 'category',
    key: 'category',
    responsive: ['md'],
    render: (text) => <span style={{fontSize: '12px'}}>{text}</span>,
  },
  {
    title: 'Sold',
    dataIndex: 'sold',
    key: 'sold',
    sorter: (a, b) => a.sold - b.sold,
    render: (text) => <span style={{fontSize: '12px'}}>{text}</span>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (price) => <span style={{fontSize: '12px'}}>{`$${price.toFixed(2)}`}</span>,
    sorter: (a, b) => a.price - b.price,
    responsive: ['lg'],
  },
  {
    title: 'Earnings',
    dataIndex: 'earnings',
    key: 'earnings',
    render: (earnings) => <span style={{fontSize: '12px'}}>{`$${earnings.toFixed(2)}`}</span>,
    sorter: (a, b) => a.earnings - b.earnings,
  },
];

const data: Product[] = [
  { key: '1', product: 'Wireless Mouse X300', category: 'Electronics', sold: 120, price: 25.99, earnings: 3118.80 },
  { key: '2', product: 'Organic Green Tea', category: 'Groceries', sold: 350, price: 8.50, earnings: 2975.00 },
  { key: '3', product: 'Ergonomic Keyboard K7', category: 'Electronics', sold: 75, price: 79.00, earnings: 5925.00 },
  { key: '4', product: 'Yoga Mat Pro', category: 'Sports', sold: 210, price: 30.00, earnings: 6300.00 },
  // { key: '5', product: 'Smart LED Bulb', category: 'Home Goods', sold: 500, price: 12.75, earnings: 6375.00 },
];

const menuItems: MenuProps['items'] = [
  { key: '1', label: 'View All Products' },
  { key: '2', label: 'Export Data' },
];

const menu = <Menu items={menuItems} />;


const ProductTable: React.FC = () => {
  return (
    <Card className="table-section" bodyStyle={{padding: '16px'}}>
       <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: '12px' }}>
        <Title level={5} style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Best Selling Products</Title>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button size="small" type="text" style={{fontSize: '12px', color: 'hsl(var(--primary))'}}>
            View All <DownOutlined />
          </Button>
        </Dropdown>
      </Space>
      <Table<Product>
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 4, size: 'small' }} // Smaller page size and pagination
        scroll={{ x: 'max-content' }}
        size="small" // Compact table
      />
    </Card>
  );
};

export default ProductTable;
