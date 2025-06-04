// src/components/dashboard/SummaryCard.tsx
"use client";

import type { ReactNode } from 'react';
import { Card, Statistic, Typography, Space, Avatar } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBgColor?: string; // Tailwind class for background, e.g., 'bg-blue-500'
  iconColor?: string;   // Tailwind class for icon color, e.g., 'text-white'
  trendValue: string;
  trendDirection: 'up' | 'down';
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  iconBgColor = 'bg-gray-200',
  iconColor = 'text-gray-700',
  trendValue,
  trendDirection,
}) => {
  const trendIcon = trendDirection === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
  const trendStyleColor = trendDirection === 'up' ? 'text-green-500' : 'text-red-500';

  return (
    <Card bodyStyle={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="summary-card">
      <div>
        <Text style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))', display: 'block', marginBottom: '4px' }}>{title}</Text>
        <Space align="baseline">
          <Statistic
            value={value}
            valueStyle={{ fontSize: '20px', fontWeight: '600', lineHeight: '1.2' }}
          />
          <Text className={`${trendStyleColor} text-xs ml-1`}>
            {trendIcon}
            {trendValue}
          </Text>
        </Space>
      </div>
      <Avatar
        className={`${iconBgColor} ${iconColor}`}
        size={40}
        icon={icon}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      />
    </Card>
  );
};

export default SummaryCard;
