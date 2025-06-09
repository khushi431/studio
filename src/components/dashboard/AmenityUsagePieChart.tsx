
// src/components/dashboard/AmenityUsagePieChart.tsx
"use client";

import { Card, Typography, Dropdown, Button, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const { Title } = Typography;

const amenityUsageData = [
  { name: 'Gymnasium', value: 400, color: 'hsl(var(--chart-1))' },
  { name: 'Swimming Pool', value: 300, color: 'hsl(var(--chart-2))' },
  { name: 'Party Hall', value: 150, color: 'hsl(var(--chart-3))' },
  { name: 'Tennis Court', value: 100, color: 'hsl(var(--chart-4))' },
  { name: 'BBQ Area', value: 50, color: 'hsl(var(--chart-5))' },
];

const menuItems: MenuProps['items'] = [
  { key: '1', label: 'This Month' },
  { key: '2', label: 'Last Month' },
  { key: '3', label: 'This Quarter' },
];

const menu = <Menu items={menuItems} />;

const AmenityUsagePieChart: React.FC = () => {
  return (
    <Card className="chart-card" style={{ height: '100%' }} bodyStyle={{padding: '16px'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Title level={5} style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Amenity Usage Distribution</Title>
        <Space>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button size="small" type="text" style={{fontSize: '12px', color: 'hsl(var(--primary))'}}>
              Filter <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={amenityUsageData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            isAnimationActive={true}
          >
            {amenityUsageData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)', fontSize: '12px', padding: '8px' }}
            formatter={(value: number, name: string) => [`${value} bookings`, name]}
          />
          <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} iconSize={8} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default AmenityUsagePieChart;
