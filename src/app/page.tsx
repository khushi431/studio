// src/app/page.tsx
"use client";

import { Layout, Row, Col, Space, Dropdown, Button, Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  UserOutlined,
  GiftOutlined,
  CreditCardOutlined,
  TeamOutlined,
  ShoppingOutlined, // For Total Sales by Unit
  BarChartOutlined, // For Total Revenue icon
  DownOutlined,
  MenuOutlined,
  ExportOutlined,
  FolderOutlined,
  FileDoneOutlined,
  LineChartOutlined as TrendIcon, // For TopSellersCard graph icon
} from '@ant-design/icons';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';


import SummaryCard from '@/components/dashboard/SummaryCard';
import SalesCard from '@/components/dashboard/SalesCard';
import MonthlyOrdersChart from '@/components/dashboard/MonthlyOrdersChart';
import TopSellersCard from '@/components/dashboard/TopSellersCard';
import SidebarMetricCard from '@/components/dashboard/SidebarMetricCard';
import ProductTable from '@/components/dashboard/ProductTable';
import CategoryTable from '@/components/dashboard/CategoryTable';
import AISuggestionCard from '@/components/dashboard/AISuggestionCard';

import './dashboard.css'; // Import custom CSS

const { Content } = Layout;

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

const mockSmallTrendData = [
  { name: 'A', v: 5 },
  { name: 'B', v: 8 },
  { name: 'C', v: 6 },
  { name: 'D', v: 10 },
  { name: 'E', v: 7 },
];


export default function DashboardPage() {
  return (
    <Layout className="dashboard-layout" style={{ minHeight: '100vh', backgroundColor: 'hsl(var(--background-page))' }}>
      <Content style={{ padding: '16px' }}> {/* Reduced padding */}
        {/* Top Summary Cards - 4 columns */}
        <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
          <Col xs={24} sm={12} md={12} lg={6}>
            <SummaryCard
              title="Total Orders"
              value="45"
              icon={<UserOutlined />}
              iconBgColor="bg-sky-500" // Example: Tailwind class for bg
              iconColor="text-white"   // Example: Tailwind class for icon color
              trendValue="+0.5%"
              trendDirection="up"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <SummaryCard
              title="Total Package"
              value="10"
              icon={<GiftOutlined />}
              iconBgColor="bg-red-500"
              iconColor="text-white"
              trendValue="-8.0%"
              trendDirection="down"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <SummaryCard
              title="Total Payments"
              value="60"
              icon={<CreditCardOutlined />}
              iconBgColor="bg-yellow-500"
              iconColor="text-white"
              trendValue="+3.5%"
              trendDirection="up"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <SummaryCard
              title="Subscriptions"
              value="10"
              icon={<TeamOutlined />}
              iconBgColor="bg-blue-500"
              iconColor="text-white"
              trendValue="+0.5%"
              trendDirection="up"
            />
          </Col>
        </Row>

        {/* Main Content Area: Sales, Chart, Sidebar */}
        <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
          {/* Left Sales Section */}
          <Col xs={24} lg={6}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <SalesCard
                icon={<ShoppingOutlined style={{ fontSize: '24px', color: 'hsl(var(--primary))' }} />}
                title="Total Sales by Unit"
                value="$12,897"
                trendValue="-3.5%"
                trendDirection="down"
                activeSalesText="Active Sales: 3,274"
                activeSalesPercent={70} // Example percentage for progress bar
                actionButtonText="View Details"
                actionButtonIcon={<ExportOutlined />}
                onActionClick={() => console.log('View Sales Details')}
              />
              <SalesCard
                title="Total Revenue"
                titleIcon={<BarChartOutlined style={{color: 'hsl(var(--primary))' }} />}
                value="$8,889"
                trendValue="+5.5%"
                trendDirection="up"
                chart={
                  <ResponsiveContainer width="100%" height={50}>
                    <LineChart data={revenueChartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                      <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                       <Tooltip 
                        contentStyle={{ fontSize: '10px', padding: '2px 5px', borderRadius: '4px' }} 
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
              <TopSellersCard
                title="Top Sellers of This Week"
                description="You have got 5 new offers, Track here the Sales data and best deals here."
                value="3,531"
                trendValue="+0.5%"
                trendDirection="up"
                icon={<TrendIcon />}
              />
              <SidebarMetricCard
                icon={<FolderOutlined />}
                iconBgClass="bg-sky-100"
                iconColorClass="text-sky-600"
                title="Total Projects"
                value="60"
                trendValue="+8.0%"
                trendDirection="up"
                chartData={mockSmallTrendData}
                chartDataKey="v"
                chartColor="hsl(var(--primary))"
              />
              <SidebarMetricCard
                icon={<FileDoneOutlined />}
                iconBgClass="bg-red-100"
                iconColorClass="text-red-600"
                title="Completed Projects"
                value="40"
                trendValue="-4.0%"
                trendDirection="down"
                chartData={mockSmallTrendData.slice().reverse()} // different data for variety
                chartDataKey="v"
                chartColor="hsl(var(--destructive))"
              />
            </Space>
          </Col>
        </Row>

        {/* Bottom Table Section */}
        <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
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
