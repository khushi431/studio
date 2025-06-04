// src/app/page.tsx
"use client";

import { Layout, Row, Col, Typography, Space, Card } from 'antd';
import {
  UserOutlined,
  BoxPlotOutlined,
  DollarCircleOutlined,
  SolutionOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  FireOutlined,
} from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';


import SummaryCard from '@/components/dashboard/SummaryCard';
import SalesCard from '@/components/dashboard/SalesCard';
import MonthlyOrdersChart from '@/components/dashboard/MonthlyOrdersChart';
import SidebarMetricCard from '@/components/dashboard/SidebarMetricCard';
import ProductTable from '@/components/dashboard/ProductTable';
import CategoryTable from '@/components/dashboard/CategoryTable';
import AISuggestionCard from '@/components/dashboard/AISuggestionCard';

import './dashboard.css'; // Import custom CSS

const { Content } = Layout;
const { Title, Text } = Typography;

// Mock data for Total Revenue line chart
const revenueChartData = [
  { name: 'Mon', revenue: 600 },
  { name: 'Tue', revenue: 800 },
  { name: 'Wed', revenue: 750 },
  { name: 'Thu', revenue: 900 },
  { name: 'Fri', revenue: 1100 },
  { name: 'Sat', revenue: 1000 },
  { name: 'Sun', revenue: 1200 },
];


export default function DashboardPage() {
  return (
    <Layout className="dashboard-layout" style={{ minHeight: '100vh', backgroundColor: 'hsl(var(--background-page))' }}>
      <Content style={{ padding: '24px' }}>
        <Title level={1} className="dashboard-title">Dashboard Ace</Title>

        {/* Top Summary Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={12} lg={6}>
            <SummaryCard
              title="Total Orders"
              value={45}
              icon={<UserOutlined style={{ color: '#52c41a' }} />}
              iconBgColor="rgba(82, 196, 26, 0.1)"
              trendValue="+0.5%"
              trendDirection="up"
              trendColor="green"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <SummaryCard
              title="Total Packages"
              value={10}
              icon={<BoxPlotOutlined style={{ color: '#ff4d4f' }} />}
              iconBgColor="rgba(255, 77, 79, 0.1)"
              trendValue="-8.0%"
              trendDirection="down"
              trendColor="red"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <SummaryCard
              title="Total Payments"
              value={60}
              icon={<DollarCircleOutlined style={{ color: '#faad14' }} />}
              iconBgColor="rgba(250, 173, 20, 0.1)"
              trendValue="+3.5%"
              trendDirection="up"
              trendColor="green"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <SummaryCard
              title="Subscriptions"
              value={10}
              icon={<SolutionOutlined style={{ color: '#1890ff' }} />}
              iconBgColor="rgba(24, 144, 255, 0.1)"
              trendValue="+0.5%"
              trendDirection="up"
              trendColor="green"
            />
          </Col>
        </Row>

        {/* Main Content Area: Sales, Chart, Sidebar */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          {/* Left Sales Section */}
          <Col xs={24} lg={6}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <SalesCard
                title="Total Sales by Unit"
                value="$12,897"
                subtext="Active Sales: 3,274"
                trendValue="-3.5%"
                trendDirection="down"
                trendColor="red"
                icon={<FireOutlined style={{ color: '#fa8c16' }} />} // Orange icon
                actionButtonText="View Details"
                onActionClick={() => console.log('View Sales Details')}
              />
              <SalesCard
                title="Total Revenue"
                value="$8,889"
                trendValue="+5.5%"
                trendDirection="up"
                trendColor="green"
                chart={
                  <ResponsiveContainer width="100%" height={60}>
                    <LineChart data={revenueChartData}>
                      <Line type="monotone" dataKey="revenue" stroke="#52c41a" strokeWidth={2} dot={false} />
                       <Tooltip 
                        contentStyle={{ fontSize: '10px', padding: '2px 5px' }} 
                        formatter={(value: any) => [`$${value}`, 'Revenue']}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                }
              />
            </Space>
          </Col>

          {/* Center Chart Area */}
          <Col xs={24} lg={12}>
            <MonthlyOrdersChart />
          </Col>

          {/* Right Sidebar Section */}
          <Col xs={24} lg={6}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <SidebarMetricCard
                title="Top Sellers of This Week"
                infoText="You have got 5 new offers..."
                value="3,531"
                trendValue="+0.5%"
                trendDirection="up"
                trendColor="green"
              />
              <SidebarMetricCard
                title="Total Projects"
                value={60}
                trendValue="+8.0%"
                trendDirection="up"
                trendColor="green"
              />
              <SidebarMetricCard
                title="Completed Projects"
                value={40}
                trendValue="-4.0%"
                trendDirection="down"
                trendColor="red"
              />
            </Space>
          </Col>
        </Row>

        {/* Bottom Table Section */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} lg={12}>
            <ProductTable />
          </Col>
          <Col xs={24} lg={12}>
            <CategoryTable />
          </Col>
        </Row>
        
        {/* AI Insights Section */}
        <Row gutter={[16,16]}>
          <Col xs={24}>
            <AISuggestionCard />
          </Col>
        </Row>

      </Content>
    </Layout>
  );
}
