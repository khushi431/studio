// src/components/dashboard/CategoryTable.tsx
"use client";

import { Card, Table, Typography, Dropdown, Button, Menu, Space } from 'antd';
import { DownOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import type { TableColumnsType, MenuProps } from 'antd';

const { Title, Text } = Typography;

interface Category {
  key: string;
  category: string;
  sales: number;
  trendValue: string;
  trendDirection: 'up' | 'down';
}

const columns: TableColumnsType<Category> = [
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (text) => <span style={{fontSize: '12px'}}>{text}</span>,
  },
  {
    title: 'Sales',
    dataIndex: 'sales',
    key: 'sales',
    render: (sales) => <span style={{fontSize: '12px'}}>{`$${sales.toLocaleString()}`}</span>,
    sorter: (a, b) => a.sales - b.sales,
  },
  {
    title: 'Trend',
    dataIndex: 'trend',
    key: 'trend',
    render: (_, record) => {
      const trendIcon = record.trendDirection === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
      const color = record.trendDirection === 'up' ? 'text-green-500' : 'text-red-500';
      return (
        <Text className={`${color} text-xs`}>
          {trendIcon} {record.trendValue}
        </Text>
      );
    },
  },
];

const data: Category[] = [
  { key: '1', category: 'Electronics', sales: 15200, trendValue: '+12.5%', trendDirection: 'up' },
  { key: '2', category: 'Groceries', sales: 8500, trendValue: '-2.1%', trendDirection: 'down' },
  { key: '3', category: 'Home Goods', sales: 12300, trendValue: '+8.0%', trendDirection: 'up' },
  { key: '4', category: 'Apparel', sales: 7800, trendValue: '+5.5%', trendDirection: 'up' },
  // { key: '5', category: 'Sports', sales: 9600, trendValue: '-1.5%', trendDirection: 'down' },
];

const menuItems: MenuProps['items'] = [
  { key: '1', label: 'View All Categories' },
  { key: '2', label: 'Export Data' },
];

const menu = <Menu items={menuItems} />;

const CategoryTable: React.FC = () => {
  return (
    <Card className="table-section" bodyStyle={{padding: '16px'}}>
      <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: '12px' }}>
        <Title level={5} style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Top Product Categories</Title>
        <Dropdown overlay={menu} trigger={['click']}>
           <Button size="small" type="text" style={{fontSize: '12px', color: 'hsl(var(--primary))'}}>
            View All <DownOutlined />
          </Button>
        </Dropdown>
      </Space>
      <Table<Category>
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 4, size: 'small' }}
        scroll={{ x: 'max-content' }}
        size="small"
      />
    </Card>
  );
};

export default CategoryTable;
