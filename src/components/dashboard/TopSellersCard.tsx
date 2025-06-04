// src/components/dashboard/TopSellersCard.tsx
"use client";

import type { ReactNode } from 'react';
import { Card, Typography, Space } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface TopSellersCardProps {
  title: string;
  description: string;
  value: string;
  trendValue: string;
  trendDirection: 'up' | 'down';
  icon: ReactNode; // Graph icon for top right
}

const TopSellersCard: React.FC<TopSellersCardProps> = ({
  title,
  description,
  value,
  trendValue,
  trendDirection,
  icon,
}) => {
  const trendIcon = trendDirection === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
  
  return (
    <Card 
      className="top-sellers-card" 
      style={{ 
        backgroundColor: 'hsl(var(--primary))', 
        color: 'hsl(var(--primary-foreground))',
        height: '100%' 
      }}
      bodyStyle={{ padding: '16px', position: 'relative' }}
    >
      <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '24px', opacity: 0.7 }}>
        {icon}
      </div>
      <Title level={5} style={{ color: 'hsl(var(--primary-foreground))', marginBottom: '8px', fontSize: '16px', fontWeight: 600 }}>
        {title}
      </Title>
      <Paragraph style={{ color: 'hsl(var(--primary-foreground))', opacity: 0.9, fontSize: '12px', marginBottom: '12px', lineHeight: '1.4' }}>
        {description}
      </Paragraph>
      <Space align="baseline">
        <Text style={{ fontSize: '24px', fontWeight: 'bold', color: 'hsl(var(--primary-foreground))' }}>
          {value}
        </Text>
        <Text style={{ fontSize: '12px', color: 'hsl(var(--primary-foreground))', opacity: 0.9 }}>
          {trendIcon} {trendValue}
        </Text>
      </Space>
    </Card>
  );
};

export default TopSellersCard;
