// src/components/dashboard/CategoryTable.tsx (Now Top Used Amenities Table)
"use client";

import { Card, Table, Typography, Dropdown, Button, Menu, Space, Tag } from 'antd';
import { DownOutlined } from '@ant-design/icons'; // ArrowUpOutlined, ArrowDownOutlined removed as not directly applicable
import type { TableColumnsType, MenuProps } from 'antd';

const { Title, Text } = Typography;

interface Amenity {
  key: string;
  amenityName: string;
  bookingCount: number;
  lastUsed: string; // Could be a date string
  availability: 'Available' | 'Booked' | 'Maintenance';
}

const columns: TableColumnsType<Amenity> = [
  {
    title: 'Amenity Name',
    dataIndex: 'amenityName',
    key: 'amenityName',
    render: (text) => <span style={{fontSize: '12px', fontWeight: 500}}>{text}</span>,
  },
  {
    title: 'Booking Count (Month)',
    dataIndex: 'bookingCount',
    key: 'bookingCount',
    render: (count) => <span style={{fontSize: '12px'}}>{count}</span>,
    sorter: (a, b) => a.bookingCount - b.bookingCount,
    align: 'center',
  },
  {
    title: 'Last Used',
    dataIndex: 'lastUsed',
    key: 'lastUsed',
    render: (date) => <span style={{fontSize: '12px'}}>{date}</span>,
    responsive: ['md'],
  },
  {
    title: 'Availability',
    dataIndex: 'availability',
    key: 'availability',
    render: (status: Amenity['availability']) => {
      let color;
      switch (status) {
        case 'Available':
          color = 'green';
          break;
        case 'Booked':
          color = 'orange';
          break;
        case 'Maintenance':
          color = 'red';
          break;
        default:
          color = 'default';
      }
      return <Tag color={color} style={{fontSize: '10px', padding: '2px 6px'}}>{status.toUpperCase()}</Tag>;
    },
    filters: [
        { text: 'Available', value: 'Available' },
        { text: 'Booked', value: 'Booked' },
        { text: 'Maintenance', value: 'Maintenance' },
    ],
    onFilter: (value, record) => record.availability.includes(value as string),
  },
];

const data: Amenity[] = [
  { key: '1', amenityName: 'Swimming Pool', bookingCount: 45, lastUsed: '2024-07-25', availability: 'Available' },
  { key: '2', amenityName: 'Gymnasium', bookingCount: 78, lastUsed: '2024-07-26', availability: 'Available' },
  { key: '3', amenityName: 'Party Hall', bookingCount: 12, lastUsed: '2024-07-20', availability: 'Booked' },
  { key: '4', amenityName: 'Tennis Court', bookingCount: 30, lastUsed: '2024-07-24', availability: 'Maintenance' },
  { key: '5', amenityName: 'BBQ Area', bookingCount: 22, lastUsed: '2024-07-22', availability: 'Available'},
];

const menuItems: MenuProps['items'] = [
  { key: '1', label: 'View All Amenities' },
  { key: '2', label: 'Export Usage Data' },
];

const menu = <Menu items={menuItems} />;

const AmenityUsageTable: React.FC = () => {
  return (
    <Card className="table-section" bodyStyle={{padding: '16px'}}>
      <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: '12px' }}>
        <Title level={5} style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Top Used Amenities</Title>
        <Dropdown overlay={menu} trigger={['click']}>
           <Button size="small" type="text" style={{fontSize: '12px', color: 'hsl(var(--primary))'}}>
            Manage <DownOutlined />
          </Button>
        </Dropdown>
      </Space>
      <Table<Amenity>
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 4, size: 'small' }}
        scroll={{ x: 'max-content' }}
        size="small"
      />
    </Card>
  );
};

export default AmenityUsageTable;
