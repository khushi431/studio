// src/components/dashboard/SidebarMetricCard.tsx
"use client";

import type { ReactNode } from 'react';
import { Card, Statistic, Typography, Space, Avatar } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';

const { Text } = Typography;

interface ChartDataPoint {
  name: string;
  [key: string]: any; 
}

interface SidebarMetricCardProps {
  icon: ReactNode;
  iconBgClass: string; // e.g. bg-sky-100
  iconColorClass: string; // e.g. text-sky-600
  title: string;
  value: string | number;
  trendValue: string;
  trendDirection: 'up' | 'down';
  chartData: ChartDataPoint[];
  chartDataKey: string;
  chartColor: string; // HSL or hex string for the chart line
}

const SidebarMetricCard: React.FC<SidebarMetricCardProps> = ({
  icon,
  iconBgClass,
  iconColorClass,
  title,
  value,
  trendValue,
  trendDirection,
  chartData,
  chartDataKey,
  chartColor,
}) => {
  const trendAntIcon = trendDirection === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
  const trendStyleColor = trendDirection === 'up' ? 'text-green-500' : 'text-red-500';

  return (
    <Card bodyStyle={{ padding: '12px' }} className="sidebar-metric-compact-card">
      <div style={{ height: '30px', marginBottom: '8px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <Line type="monotone" dataKey={chartDataKey} stroke={chartColor} strokeWidth={2} dot={false} />
             <Tooltip 
                contentStyle={{ fontSize: '10px', padding: '2px 5px', display: 'none' }} // Hide tooltip for these small charts
             />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Space align="center" style={{ width: '100%', justifyContent: 'space-between' }}>
        <div>
          <Text style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))', display: 'block' }}>{title}</Text>
          <Space align="baseline">
            <Statistic
              value={value}
              valueStyle={{ fontSize: '18px', fontWeight: '600', lineHeight: '1.2' }}
            />
            <Text className={`${trendStyleColor} text-xs ml-1`}>
              {trendAntIcon}
              {trendValue}
            </Text>
          </Space>
        </div>
        <Avatar 
          className={`${iconBgClass} ${iconColorClass}`}
          size={32} 
          icon={icon} 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
        />
      </Space>
    </Card>
  );
};

export default SidebarMetricCard;
