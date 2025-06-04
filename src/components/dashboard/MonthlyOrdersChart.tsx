// src/components/dashboard/MonthlyOrdersChart.tsx
"use client";

import { Card, Typography } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title } = Typography;

const data = [
  { month: 'Jan', online: 400, offline: 240, marketing: 150 },
  { month: 'Feb', online: 300, offline: 139, marketing: 200 },
  { month: 'Mar', online: 200, offline: 980, marketing: 220 },
  { month: 'Apr', online: 278, offline: 390, marketing: 180 },
  { month: 'May', online: 189, offline: 480, marketing: 250 },
  { month: 'Jun', online: 239, offline: 380, marketing: 190 },
  { month: 'Jul', online: 349, offline: 430, marketing: 210 },
];

// Colors for bars
const onlineColor = '#00829B'; // Teal
const offlineColor = '#2F4F4F'; // Dark Slate Gray (dark)
const marketingColor = '#D2B48C'; // Tan

const MonthlyOrdersChart: React.FC = () => {
  return (
    <Card className="chart-card" style={{ height: '100%' }}>
      <Title level={4} style={{ marginBottom: '20px' }}>Monthly Orders Analytics</Title>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5, right: 0, left: -20, bottom: 5, // Adjusted left margin for YAxis
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
            labelStyle={{ fontWeight: 'bold', color: '#333' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          <Bar dataKey="online" fill={onlineColor} name="Online" radius={[4, 4, 0, 0]} />
          <Bar dataKey="offline" fill={offlineColor} name="Offline" radius={[4, 4, 0, 0]} />
          <Bar dataKey="marketing" fill={marketingColor} name="Marketing" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MonthlyOrdersChart;
