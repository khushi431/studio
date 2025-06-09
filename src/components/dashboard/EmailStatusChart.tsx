
// src/components/dashboard/EmailStatusChart.tsx
"use client";

import { Card, Typography, Dropdown, Button, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { FC } from 'react';

const { Title } = Typography;

const emailStatusData = [
  { name: 'Successful Emails', value: 1250, color: 'hsl(var(--chart-2))' }, // Using a success-like color
  { name: 'Failed Emails', value: 80, color: 'hsl(var(--destructive))' }, // Using a failure/error color
];

const menuItems: MenuProps['items'] = [
  { key: '1', label: 'Last 24 Hours' },
  { key: '2', label: 'Last 7 Days' },
  { key: '3', label: 'Last 30 Days' },
];

const menu = <Menu items={menuItems} />;

const EmailStatusChart: FC = () => {
  return (
    <Card className="chart-card" style={{ height: '100%' }} bodyStyle={{padding: '16px'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Title level={5} style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Email Delivery Status</Title>
        <Space>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button size="small" type="text" style={{fontSize: '12px', color: 'hsl(var(--primary))'}}>
              Period <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={emailStatusData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            isAnimationActive={true}
          >
            {emailStatusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)', fontSize: '12px', padding: '8px' }}
            formatter={(value: number, name: string) => [`${value} emails`, name]}
          />
          <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} iconSize={8} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default EmailStatusChart;
