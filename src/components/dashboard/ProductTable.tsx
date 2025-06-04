// src/components/dashboard/ProductTable.tsx (Now Service Request Summary Table)
"use client";

import { Card, Table, Typography, Dropdown, Button, Menu, Space, Tag } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { TableColumnsType, MenuProps } from 'antd';
import { formatDistanceToNow } from 'date-fns';


const { Title } = Typography;

interface ServiceRequest {
  key: string;
  requestId: string;
  unit: string;
  category: 'Plumbing' | 'Electrical' | 'HVAC' | 'Appliance' | 'Other';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: Date; // Store as Date object for sorting/formatting
}

const columns: TableColumnsType<ServiceRequest> = [
  {
    title: 'Request ID',
    dataIndex: 'requestId',
    key: 'requestId',
    render: (text) => <a style={{fontSize: '12px', fontWeight: 500}}>{text}</a>,
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    key: 'unit',
    render: (text) => <span style={{fontSize: '12px'}}>{text}</span>,
    responsive: ['md'],
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (category: ServiceRequest['category']) => {
      let color;
      switch(category) {
        case 'Plumbing': color = 'blue'; break;
        case 'Electrical': color = 'orange'; break;
        case 'HVAC': color = 'green'; break;
        case 'Appliance': color = 'purple'; break;
        default: color = 'default';
      }
      return <Tag color={color} style={{fontSize: '10px'}}>{category}</Tag>;
    },
    filters: [
        { text: 'Plumbing', value: 'Plumbing' },
        { text: 'Electrical', value: 'Electrical' },
        { text: 'HVAC', value: 'HVAC' },
        { text: 'Appliance', value: 'Appliance' },
        { text: 'Other', value: 'Other' },
    ],
    onFilter: (value, record) => record.category.includes(value as string),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: ServiceRequest['status']) => {
      let color;
      if (status === 'Open') color = 'red';
      else if (status === 'In Progress') color = 'gold';
      else if (status === 'Resolved') color = 'cyan';
      else color = 'green';
      return <Tag color={color} style={{fontSize: '10px'}}>{status.toUpperCase()}</Tag>;
    },
    sorter: (a, b) => a.status.localeCompare(b.status),
     filters: [
        { text: 'Open', value: 'Open' },
        { text: 'In Progress', value: 'In Progress' },
        { text: 'Resolved', value: 'Resolved' },
        { text: 'Closed', value: 'Closed' },
    ],
    onFilter: (value, record) => record.status.includes(value as string),
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: Date) => <span style={{fontSize: '12px'}}>{formatDistanceToNow(date, { addSuffix: true })}</span>,
    sorter: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
    defaultSortOrder: 'descend',
  },
];

const data: ServiceRequest[] = [
  { key: '1', requestId: 'SR001', unit: 'A-101', category: 'Plumbing', status: 'Open', createdAt: new Date(2024, 6, 25, 10, 0) },
  { key: '2', requestId: 'SR002', unit: 'B-203', category: 'Electrical', status: 'In Progress', createdAt: new Date(2024, 6, 24, 14, 30) },
  { key: '3', requestId: 'SR003', unit: 'C-305', category: 'HVAC', status: 'Resolved', createdAt: new Date(2024, 6, 23, 9, 15) },
  { key: '4', requestId: 'SR004', unit: 'A-102', category: 'Appliance', status: 'Closed', createdAt: new Date(2024, 6, 22, 11, 0) },
  { key: '5', requestId: 'SR005', unit: 'D-410', category: 'Other', status: 'Open', createdAt: new Date(2024, 6, 26, 8, 0)},
];

const menuItems: MenuProps['items'] = [
  { key: '1', label: 'View All Requests' },
  { key: '2', label: 'Export Data' },
  { key: '3', label: 'Create New Request' },
];

const menu = <Menu items={menuItems} />;


const ServiceRequestTable: React.FC = () => {
  return (
    <Card className="table-section" bodyStyle={{padding: '16px'}}>
       <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: '12px' }}>
        <Title level={5} style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Service Request Summary</Title>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button size="small" type="text" style={{fontSize: '12px', color: 'hsl(var(--primary))'}}>
            Actions <DownOutlined />
          </Button>
        </Dropdown>
      </Space>
      <Table<ServiceRequest>
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 4, size: 'small' }}
        scroll={{ x: 'max-content' }}
        size="small"
      />
    </Card>
  );
};

export default ServiceRequestTable;
