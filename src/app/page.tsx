// src/app/page.tsx
"use client";

import { Layout, Row, Col, Space } from 'antd';
import {
  AppstoreOutlined, // For Total Units
  TeamOutlined, // For Active Visitors
  ToolOutlined, // For Open Service Requests & Top Maintenance
  NotificationOutlined, // For Total Announcements
  CalendarOutlined, // For Amenity Bookings
  BoxPlotOutlined, // For Parcel Deliveries
  ExportOutlined,
  ProjectOutlined, // For Total Projects
  CheckCircleOutlined, // For Completed Work Orders
  LineChartOutlined as TrendIcon, // For TopSellersCard graph icon (repurposed for Maintenance)
} from '@ant-design/icons';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';


import SummaryCard from '@/components/dashboard/SummaryCard';
import SalesCard from '@/components/dashboard/SalesCard';
import MonthlyOrdersChart from '@/components/dashboard/MonthlyOrdersChart';
import TopSellersCard from '@/components/dashboard/TopSellersCard';
import SidebarMetricCard from '@/components/dashboard/SidebarMetricCard';
import ProductTable from '@/components/dashboard/ProductTable'; // Will be ServiceRequestTable
import CategoryTable from '@/components/dashboard/CategoryTable'; // Will be AmenityUsageTable
import AISuggestionCard from '@/components/dashboard/AISuggestionCard';

import './dashboard.css'; // Import custom CSS

const { Content } = Layout;

// Mock data for Parcel Deliveries line chart
const parcelTrendData = [
  { name: 'Mon', parcels: 60 },
  { name: 'Tue', parcels: 80 },
  { name: 'Wed', parcels: 75 },
  { name: 'Thu', parcels: 90 },
  { name: 'Fri', parcels: 110 },
  { name: 'Sat', parcels: 100 },
  { name: 'Sun', parcels: 120 },
];

const mockSmallTrendDataCondo1 = [
  { name: 'A', v: 5 },
  { name: 'B', v: 3 },
  { name: 'C', v: 6 },
  { name: 'D', v: 4 },
  { name: 'E', v: 7 },
];

const mockSmallTrendDataCondo2 = [
  { name: 'A', v: 8 },
  { name: 'B', v: 6 },
  { name: 'C', v: 9 },
  { name: 'D', v: 5 },
  { name: 'E', v: 10 },
];


export default function DashboardPage() {
  return (
    <Layout className="dashboard-layout" style={{ minHeight: '100vh', backgroundColor: 'hsl(var(--background-page))' }}>
      <Content style={{ padding: '16px' }}>
        {/* Top Summary Cards - 4 columns */}
        <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
          <Col xs={24} sm={12} md={12} lg={6}>
            <SummaryCard
              title="Total Units"
              value="120"
              icon={<AppstoreOutlined />}
              iconBgColor="bg-sky-500"
              iconColor="text-white"
              trendValue="+2 since last month" // Example trend
              trendDirection="up"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <SummaryCard
              title="Active Visitors Today"
              value="15"
              icon={<TeamOutlined />}
              iconBgColor="bg-red-500" // Keeping colors diverse for now
              iconColor="text-white"
              trendValue="-5 since yesterday"
              trendDirection="down"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <SummaryCard
              title="Open Service Requests"
              value="23"
              icon={<ToolOutlined />}
              iconBgColor="bg-yellow-500"
              iconColor="text-white"
              trendValue="+3 new today"
              trendDirection="up"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <SummaryCard
              title="Total Announcements Sent"
              value="300"
              icon={<NotificationOutlined />}
              iconBgColor="bg-blue-500"
              iconColor="text-white"
              trendValue="+15 this week"
              trendDirection="up"
            />
          </Col>
        </Row>

        {/* Main Content Area: Amenity Bookings, Visitor Chart, Maintenance/Projects Sidebar */}
        <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
          {/* Left Section: Amenity Bookings & Parcel Deliveries */}
          <Col xs={24} lg={6}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <SalesCard
                icon={<CalendarOutlined style={{ fontSize: '24px', color: 'hsl(var(--primary))' }} />}
                title="Amenity Bookings"
                value="87 this month"
                trendValue="+12%"
                trendDirection="up"
                activeSalesText="Active Bookings: 5" // Renamed from activeSalesText
                activeSalesPercent={60} // Example percentage
                actionButtonText="View Bookings"
                actionButtonIcon={<ExportOutlined />}
                onActionClick={() => console.log('View Amenity Bookings')}
              />
              <SalesCard
                title="Parcel Deliveries"
                titleIcon={<BoxPlotOutlined style={{color: 'hsl(var(--primary))' }} />}
                value="320 logged"
                trendValue="+8% this week"
                trendDirection="up"
                chart={
                  <ResponsiveContainer width="100%" height={50}>
                    <LineChart data={parcelTrendData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                      <Line type="monotone" dataKey="parcels" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                       <Tooltip 
                        contentStyle={{ fontSize: '10px', padding: '2px 5px', borderRadius: '4px' }} 
                        formatter={(value: any) => [`${value} parcels`, 'Trend']}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                }
              />
            </Space>
          </Col>

          {/* Center Chart Area: Monthly Visitor Analytics */}
          <Col xs={24} lg={12}>
            <MonthlyOrdersChart /> {/* This component will be updated internally */}
          </Col>

          {/* Right Sidebar Section: Maintenance, Projects, Work Orders */}
          <Col xs={24} lg={6}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <TopSellersCard // Repurposed for Top Maintenance Categories
                title="Top Maintenance Issues"
                description="You have 10 new tickets this week. Track issue status and assignments."
                value="23 Open Issues" // Matches Open Service Requests summary
                trendValue="+5 this week" // Example trend
                trendDirection="up"
                icon={<TrendIcon />} // Using existing TrendIcon, could be ToolOutlined
              />
              <SidebarMetricCard
                icon={<ProjectOutlined />}
                iconBgClass="bg-sky-100"
                iconColorClass="text-sky-600"
                title="Total Projects (Renovations)"
                value="12"
                trendValue="+2 ongoing"
                trendDirection="up"
                chartData={mockSmallTrendDataCondo1}
                chartDataKey="v"
                chartColor="hsl(var(--primary))"
              />
              <SidebarMetricCard
                icon={<CheckCircleOutlined />}
                iconBgClass="bg-red-100" // Kept diverse color
                iconColorClass="text-red-600"
                title="Completed Work Orders"
                value="60"
                trendValue="+15 last month"
                trendDirection="up" // Assuming positive trend for completions
                chartData={mockSmallTrendDataCondo2} 
                chartDataKey="v"
                chartColor="hsl(var(--destructive))" // Or a green color
              />
            </Space>
          </Col>
        </Row>

        {/* Bottom Table Section: Service Requests & Amenity Usage */}
        <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
          <Col xs={24} lg={12}>
            <ProductTable /> {/* Internally becomes Service Request Table */}
          </Col>
          <Col xs={24} lg={12}>
            <CategoryTable /> {/* Internally becomes Amenity Usage Table */}
          </Col>
        </Row>
        
        {/* AI Insights Section */}
        <Row gutter={[16,16]}>
          <Col xs={24}>
            <AISuggestionCard /> {/* Internally updated for Condo context */}
          </Col>
        </Row>

      </Content>
    </Layout>
  );
}
