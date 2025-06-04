// src/components/dashboard/SalesCard.tsx
"use client";

import type { ReactNode } from 'react';
import { Card, Statistic, Typography, Button, Space } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface SalesCardProps {
  title: string;
  value: string;
  subtext?: string;
  trendValue?: string;
  trendDirection?: 'up' | 'down';
  trendColor?: 'green' | 'red';
  icon?: ReactNode;
  actionButtonText?: string;
  onActionClick?: () => void;
  chart?: ReactNode; // For embedding small charts like the line chart for total revenue
}

const SalesCard: React.FC<SalesCardProps> = ({
  title,
  value,
  subtext,
  trendValue,
  trendDirection,
  trendColor, // This prop can be used to directly set color or map to CSS classes
  icon,
  actionButtonText,
  onActionClick,
  chart,
}) => {
  const trendIcon = trendDirection === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
  const actualTrendColor = trendColor === 'green' ? '#52c41a' : (trendColor === 'red' ? '#ff4d4f' : undefined);

  return (
    <Card className="sales-card">
      <Title level={5} style={{ marginBottom: '10px', color: '#333' }}>{title}</Title>
      <Space align="center" style={{ marginBottom: icon || trendValue ? '10px' : '0' }}>
        {icon && <span style={{ fontSize: '24px', marginRight: '8px' }}>{icon}</span>}
        <Statistic
            value={value}
            valueStyle={{ fontSize: '28px', fontWeight: 'bold', color: trendDirection ? actualTrendColor : undefined }}
            className="sales-card-statistic"
          />
      </Space>
       {trendValue && trendDirection && (
        <Text style={{ color: actualTrendColor, fontSize: '14px', display: 'block', marginBottom: '10px' }}>
          <span className="sales-card-trend-icon">{trendIcon}</span>
          {trendValue}
        </Text>
      )}
      {subtext && <Paragraph type="secondary" className="sales-card-subtext" style={{ marginBottom: chart ? '10px' : '0' }}>{subtext}</Paragraph>}
      {chart && <div style={{ marginTop: '15px', height: '60px' }}>{chart}</div>}
      {actionButtonText && onActionClick && (
        <Button type="primary" onClick={onActionClick} style={{ marginTop: '15px' }} ghost>
          {actionButtonText}
        </Button>
      )}
    </Card>
  );
};

export default SalesCard;
