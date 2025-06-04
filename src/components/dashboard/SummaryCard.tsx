// src/components/dashboard/SummaryCard.tsx
"use client";

import type { ReactNode } from 'react';
import { Card, Statistic, Typography, Space } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trendValue: string;
  trendDirection: 'up' | 'down';
  trendColor?: 'green' | 'red';
  iconBgColor?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  trendValue,
  trendDirection,
  trendColor,
  iconBgColor = 'transparent',
}) => {
  const trendIcon = trendDirection === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
  const trendStyleClass = trendDirection === 'up' ? 'positive' : 'negative';
  
  // Use specific antd colors if not overridden by CSS
  const antdTrendColor = trendColor === 'green' ? '#52c41a' : (trendColor === 'red' ? '#ff4d4f' : undefined);

  return (
    <Card>
      <Space direction="horizontal" align="center" style={{ width: '100%', justifyContent: 'space-between' }}>
        <Statistic
          title={<Text style={{ fontSize: '14px', color: '#555' }}>{title}</Text>}
          value={value}
          precision={typeof value === 'number' && !Number.isInteger(value) ? 2 : 0}
          className="summary-card-value"
        />
        <div style={{ 
          backgroundColor: iconBgColor, 
          padding: '12px', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '24px', // Adjust icon size here
        }}>
          {icon}
        </div>
      </Space>
      <div style={{ marginTop: '10px' }}>
        <Text className={`summary-card-trend ${trendStyleClass}`} style={{ color: antdTrendColor }}>
          {trendIcon} {trendValue}
        </Text>
        <Text type="secondary" style={{ marginLeft: '5px', fontSize: '12px' }}>vs last month</Text>
      </div>
    </Card>
  );
};

export default SummaryCard;
