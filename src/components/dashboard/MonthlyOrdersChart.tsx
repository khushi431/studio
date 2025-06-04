// src/components/dashboard/MonthlyOrdersChart.tsx
"use client";

import { Card, Typography, Dropdown, Button, Menu, Space } from 'antd';
import { DownOutlined, MenuOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title } = Typography;

const data = [
  { month: 'Aug', online: 300, offline: 180, marketing: 120 },
  { month: 'Sep', online: 450, offline: 220, marketing: 150 },
  { month: 'Oct', online: 400, offline: 240, marketing: 150 },
  { month: 'Nov', online: 300, offline: 139, marketing: 200 },
  { month: 'Dec', online: 200, offline: 300, marketing: 100 },
  { month: 'Jan', online: 278, offline: 390, marketing: 180 },
  { month: 'Feb', online: 500, offline: 200, marketing: 250 }, // Example target Feb
  { month: 'Mar', online: 239, offline: 380, marketing: 190 },
  { month: 'Apr', online: 349, offline: 430, marketing: 210 },
];

const onlineColor = 'hsl(var(--primary))'; // Teal - using theme variable
const offlineColor = '#2F4F4F'; // Dark Slate Gray
const marketingColor = '#D2B48C'; // Tan

const menuItems: MenuProps['items'] = [
  { key: '1', label: 'Last 30 Days' },
  { key: '2', label: 'Last 90 Days' },
  { key: '3', label: 'Last Year' },
  { key: '4', label: 'Custom Range' },
];

const menu = <Menu items={menuItems} />;

const MonthlyOrdersChart: React.FC = () => {
  return (
    <Card className="chart-card" style={{ height: '100%' }} bodyStyle={{padding: '16px'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Title level={5} style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Monthly Orders Analytics</Title>
        <Space>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button size="small" type="text" style={{fontSize: '12px', color: 'hsl(var(--primary))'}}>
              View All <DownOutlined />
            </Button>
          </Dropdown>
          {/* <Button icon={<MenuOutlined />} size="small" type="text" /> */}
        </Space>
      </div>
      <ResponsiveContainer width="100%" height={280}> {/* Adjusted height */}
        <BarChart
          data={data}
          margin={{
            top: 5, right: 0, left: -25, bottom: 5, // Adjusted left margin for YAxis
          }}
          barGap={4} // Smaller gap between bars of the same group
          barCategoryGap="25%" // Gap between groups of bars
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={{stroke: 'hsl(var(--border))'}} tickLine={{stroke: 'hsl(var(--border))'}} />
          <YAxis tick={{ fontSize: 10 }} axisLine={{stroke: 'hsl(var(--border))'}} tickLine={{stroke: 'hsl(var(--border))'}}/>
          <Tooltip
            cursor={{fill: 'hsl(var(--muted))'}}
            contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)', fontSize: '12px', padding: '8px' }}
            labelStyle={{ fontWeight: 'bold', color: 'hsl(var(--foreground))' }}
          />
          <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} iconSize={8} />
          <Bar dataKey="online" fill={onlineColor} name="Online" radius={[3, 3, 0, 0]} barSize={8} />
          <Bar dataKey="offline" fill={offlineColor} name="Offline" radius={[3, 3, 0, 0]} barSize={8} />
          <Bar dataKey="marketing" fill={marketingColor} name="Marketing" radius={[3, 3, 0, 0]} barSize={8} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MonthlyOrdersChart;
