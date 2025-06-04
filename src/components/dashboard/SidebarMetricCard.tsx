// src/components/dashboard/SidebarMetricCard.tsx
"use client";

import type { ReactNode } from 'react';
import { Card, Statistic, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

interface SidebarMetricCardProps {
  title?: string;
  value: string | number;
  infoText?: string;
  trendValue?: string;
  trendDirection?: 'up' | 'down';
  trendColor?: 'green' | 'red';
  icon?: ReactNode; // Optional: if an icon needs to be displayed with the metric
}

const SidebarMetricCard: React.FC<SidebarMetricCardProps> = ({
  title,
  value,
  infoText,
  trendValue,
  trendDirection,
  trendColor,
  icon,
}) => {
  const trendIcon = trendDirection === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
  const actualTrendColor = trendColor === 'green' ? '#52c41a' : (trendColor === 'red' ? '#ff4d4f' : undefined);

  return (
    <Card className="sidebar-metric-card" style={{ marginBottom: '16px' }}>
      {title && <Text strong style={{ display: 'block', marginBottom: infoText || trendValue ? '8px' : '0' }}>{title}</Text>}
      {infoText && <Paragraph type="secondary" style={{ fontSize: '12px', marginBottom: '8px' }}>{infoText}</Paragraph>}
      
      <Statistic
        title={icon ? <span style={{ fontSize: '20px', marginRight: '8px' }}>{icon}</span> : ''}
        value={value}
        valueStyle={{ fontSize: '22px', fontWeight: 'bold', color: trendDirection ? actualTrendColor : undefined}}
      />

      {trendValue && trendDirection && (
        <Text style={{ color: actualTrendColor, fontSize: '12px', marginTop: '4px', display: 'inline-block' }}>
          {trendIcon} {trendValue}
        </Text>
      )}
    </Card>
  );
};

export default SidebarMetricCard;
