// src/components/dashboard/MonthlyOrdersChart.tsx (Now Monthly Visitor Analytics)
"use client";

import { Card, Typography, Dropdown, Button, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons'; // MenuOutlined removed for now
import type { MenuProps } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title } = Typography;

const visitorData = [
  { month: 'Aug', residentsGuests: 120, contractors: 40, deliveryServices: 80 },
  { month: 'Sep', residentsGuests: 150, contractors: 55, deliveryServices: 90 },
  { month: 'Oct', residentsGuests: 130, contractors: 45, deliveryServices: 85 },
  { month: 'Nov', residentsGuests: 160, contractors: 60, deliveryServices: 100 },
  { month: 'Dec', residentsGuests: 180, contractors: 70, deliveryServices: 110 },
  { month: 'Jan', residentsGuests: 140, contractors: 50, deliveryServices: 95 },
  { month: 'Feb', residentsGuests: 170, contractors: 65, deliveryServices: 105 },
  { month: 'Mar', residentsGuests: 155, contractors: 58, deliveryServices: 92 },
  { month: 'Apr', residentsGuests: 165, contractors: 62, deliveryServices: 98 },
];

const residentsGuestsColor = 'hsl(var(--primary))'; // Teal
const contractorsColor = '#FFC107'; // Amber/Yellow
const deliveryServicesColor = '#795548'; // Brown

const menuItems: MenuProps['items'] = [
  { key: '1', label: 'Last 3 Months' },
  { key: '2', label: 'Last 6 Months' },
  { key: '3', label: 'This Year' },
  { key: '4', label: 'Custom Range' },
];

const menu = <Menu items={menuItems} />;

const MonthlyVisitorAnalyticsChart: React.FC = () => {
  return (
    <Card className="chart-card" style={{ height: '100%' }} bodyStyle={{padding: '16px'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Title level={5} style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Monthly Visitor Analytics</Title>
        <Space>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button size="small" type="text" style={{fontSize: '12px', color: 'hsl(var(--primary))'}}>
              Filter <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={visitorData}
          margin={{
            top: 5, right: 0, left: -25, bottom: 5,
          }}
          barGap={4}
          barCategoryGap="25%"
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
          <Bar dataKey="residentsGuests" fill={residentsGuestsColor} name="Residents' Guests" radius={[3, 3, 0, 0]} barSize={8} />
          <Bar dataKey="contractors" fill={contractorsColor} name="Contractors" radius={[3, 3, 0, 0]} barSize={8} />
          <Bar dataKey="deliveryServices" fill={deliveryServicesColor} name="Delivery Services" radius={[3, 3, 0, 0]} barSize={8} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MonthlyVisitorAnalyticsChart;
