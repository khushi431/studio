// src/components/dashboard/MonthlyOrdersChart.tsx (Now Monthly Amenity Booking Analytics)
"use client";

import { Card, Typography, Dropdown, Button, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title } = Typography;

const amenityBookingData = [
  { month: 'Aug', totalBookings: 120, approvedBookings: 90, cancelledBookings: 10 },
  { month: 'Sep', totalBookings: 150, approvedBookings: 110, cancelledBookings: 15 },
  { month: 'Oct', totalBookings: 130, approvedBookings: 100, cancelledBookings: 12 },
  { month: 'Nov', totalBookings: 160, approvedBookings: 125, cancelledBookings: 18 },
  { month: 'Dec', totalBookings: 180, approvedBookings: 140, cancelledBookings: 20 },
  { month: 'Jan', totalBookings: 140, approvedBookings: 105, cancelledBookings: 13 },
  { month: 'Feb', totalBookings: 170, approvedBookings: 130, cancelledBookings: 16 },
  { month: 'Mar', totalBookings: 155, approvedBookings: 115, cancelledBookings: 14 },
  { month: 'Apr', totalBookings: 165, approvedBookings: 120, cancelledBookings: 17 },
];

const totalBookingsColor = 'hsl(var(--primary))'; // Teal
const approvedBookingsColor = 'hsl(var(--chart-4))'; // Yellow (changed from chart-2)
const cancelledBookingsColor = 'hsl(var(--destructive))'; // Red

const menuItems: MenuProps['items'] = [
  { key: '1', label: 'Last 3 Months' },
  { key: '2', label: 'Last 6 Months' },
  { key: '3', label: 'This Year' },
  { key: '4', label: 'Custom Range' },
];

const menu = <Menu items={menuItems} />;

const MonthlyAmenityBookingChart: React.FC = () => {
  return (
    <Card className="chart-card" style={{ height: '100%' }} bodyStyle={{padding: '16px'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Title level={5} style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Monthly Amenity Booking Analytics</Title>
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
          data={amenityBookingData}
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
          <Bar dataKey="totalBookings" fill={totalBookingsColor} name="Total Bookings" radius={[3, 3, 0, 0]} barSize={8} />
          <Bar dataKey="approvedBookings" fill={approvedBookingsColor} name="Approved Bookings" radius={[3, 3, 0, 0]} barSize={8} />
          <Bar dataKey="cancelledBookings" fill={cancelledBookingsColor} name="Cancelled Bookings" radius={[3, 3, 0, 0]} barSize={8} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MonthlyAmenityBookingChart;
