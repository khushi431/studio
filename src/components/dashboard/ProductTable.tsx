// src/components/dashboard/ProductTable.tsx
"use client";

import { Card, Table, Typography } from 'antd';
import type { TableColumnsType } from 'antd';

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
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Sold',
    dataIndex: 'sold',
    key: 'sold',
    sorter: (a, b) => a.sold - b.sold,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (price) => `$${price.toFixed(2)}`,
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Earnings',
    dataIndex: 'earnings',
    key: 'earnings',
    render: (earnings) => `$${earnings.toFixed(2)}`,
    sorter: (a, b) => a.earnings - b.earnings,
  },
];

const data: Product[] = [
  { key: '1', product: 'Wireless Mouse X300', category: 'Electronics', sold: 120, price: 25.99, earnings: 3118.80 },
  { key: '2', product: 'Organic Green Tea', category: 'Groceries', sold: 350, price: 8.50, earnings: 2975.00 },
  { key: '3', product: 'Ergonomic Keyboard K7', category: 'Electronics', sold: 75, price: 79.00, earnings: 5925.00 },
  { key: '4', product: 'Yoga Mat Pro', category: 'Sports', sold: 210, price: 30.00, earnings: 6300.00 },
  { key: '5', product: 'Smart LED Bulb', category: 'Home Goods', sold: 500, price: 12.75, earnings: 6375.00 },
];

const ProductTable: React.FC = () => {
  return (
    <Card className="table-section">
      <Title level={4} style={{ marginBottom: '20px' }}>Best Selling Products</Title>
      <Table<Product>
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 'max-content' }}
      />
    </Card>
  );
};

export default ProductTable;
