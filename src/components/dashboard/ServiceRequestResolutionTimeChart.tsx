
// src/components/dashboard/ServiceRequestResolutionTimeChart.tsx
"use client";

import { Card, Typography, Dropdown, Button, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title } = Typography;

const resolutionTimeData = [
  { month: 'Jan', "Avg Time (Days)": 2.5 },
  { month: 'Feb', "Avg Time (Days)": 2.2 },
  { month: 'Mar', "Avg Time (Days)": 2.8 },
  { month: 'Apr', "Avg Time (Days)": 2.1 },
  { month: 'May', "Avg Time (Days)": 3.0 },
  { month: 'Jun', "Avg Time (Days)": 2.4 },
];

const menuItems: MenuProps['items'] = [
  { key: '1', label: 'Last 6 Months' },
  { key: '2', label: 'Last 12 Months' },
  { key: '3', label: 'This Year' },
];

const menu = <Menu items={menuItems} />;

const ServiceRequestResolutionTimeChart: React.FC = () => {
  return (
    <Card className="chart-card" style={{ height: '100%' }} bodyStyle={{padding: '16px'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Title level={5} style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Avg. Service Request Resolution Time</Title>
        <Space>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button size="small" type="text" style={{fontSize: '12px', color: 'hsl(var(--primary))'}}>
              Period <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={resolutionTimeData}
          margin={{
            top: 5, right: 5, left: -25, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={{stroke: 'hsl(var(--border))'}} tickLine={{stroke: 'hsl(var(--border))'}} />
          <YAxis tick={{ fontSize: 10 }} unit="d" axisLine={{stroke: 'hsl(var(--border))'}} tickLine={{stroke: 'hsl(var(--border))'}}/>
          <Tooltip
            cursor={{stroke: 'hsl(var(--muted))', strokeDasharray: '3 3'}}
            contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)', fontSize: '12px', padding: '8px' }}
            labelStyle={{ fontWeight: 'bold', color: 'hsl(var(--foreground))' }}
            formatter={(value: number) => [`${value.toFixed(1)} days`, "Avg. Time"]}
          />
          <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} iconSize={8} />
          <Line type="monotone" dataKey="Avg Time (Days)" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 6 }} dot={{r:3}} isAnimationActive={true} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ServiceRequestResolutionTimeChart;
