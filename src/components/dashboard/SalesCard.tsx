// src/components/dashboard/SalesCard.tsx
"use client";

import type { ReactNode } from 'react';
import { Card, Statistic, Typography, Button, Space, Progress } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface SalesCardProps {
  title: string;
  value: string;
  icon?: ReactNode; // For "Total Sales by Unit"
  titleIcon?: ReactNode; // For "Total Revenue" title next to text
  subtext?: string; // Kept for flexibility, though not in current target for "Total Sales"
  trendValue?: string;
  trendDirection?: 'up' | 'down';
  activeSalesText?: string;
  activeSalesPercent?: number;
  actionButtonText?: string;
  actionButtonIcon?: ReactNode;
  onActionClick?: () => void;
  chart?: ReactNode;
}

const SalesCard: React.FC<SalesCardProps> = ({
  title,
  value,
  icon,
  titleIcon,
  subtext, // Not used in the target image for "Total Sales by Unit"
  trendValue,
  trendDirection,
  activeSalesText,
  activeSalesPercent,
  actionButtonText,
  actionButtonIcon,
  onActionClick,
  chart,
}) => {
  const trendAntIcon = trendDirection === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
  const trendColorClass = trendDirection === 'up' ? 'text-green-500' : 'text-red-500';

  return (
    <Card bodyStyle={{ padding: '16px' }} className="sales-card">
      {icon && ( // Layout for "Total Sales by Unit"
        <>
          <Space direction="vertical" size="small" style={{width: '100%'}}>
            <Space>
              {icon}
              <Text style={{ fontSize: '14px', fontWeight: 500, color: 'hsl(var(--foreground))' }}>{title}</Text>
            </Space>
            <Statistic
              value={value}
              valueStyle={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.2' }}
            />
            {trendValue && trendDirection && (
              <Text className={`${trendColorClass} text-xs`}>
                {trendAntIcon} {trendValue}
              </Text>
            )}
            {activeSalesText && (
              <div style={{marginTop: '8px'}}>
                <Text type="secondary" style={{ fontSize: '12px' }}>{activeSalesText}</Text>
                {activeSalesPercent !== undefined && (
                   <Progress 
                    percent={activeSalesPercent} 
                    showInfo={false} 
                    strokeColor="hsl(var(--primary))" // Or a specific yellow/orange
                    size="small" 
                    style={{marginTop: '4px'}}
                  />
                )}
              </div>
            )}
           
          </Space>
           {actionButtonText && onActionClick && (
              <Button 
                type="text" 
                onClick={onActionClick} 
                icon={actionButtonIcon}
                style={{ marginTop: '12px', padding: '0', color: 'hsl(var(--primary))', fontSize:'12px', fontWeight: 500 }}
              >
                {actionButtonText}
              </Button>
            )}
        </>
      )}

      {!icon && titleIcon && ( // Layout for "Total Revenue"
        <>
          <Space align="center" style={{ marginBottom: '8px' }}>
            {titleIcon}
            <Text style={{ fontSize: '14px', fontWeight: 500, color: 'hsl(var(--foreground))' }}>{title}</Text>
          </Space>
           <Space align="baseline">
            <Statistic
              value={value}
              valueStyle={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.2' }}
            />
            {trendValue && trendDirection && (
              <Text className={`${trendColorClass} text-xs ml-1`}>
                {trendAntIcon} {trendValue}
              </Text>
            )}
          </Space>
          {chart && <div style={{ marginTop: '12px', height: '50px' }}>{chart}</div>}
        </>
      )}
       {!icon && !titleIcon && ( // Fallback simple layout if no icons provided
        <>
         <Text style={{ fontSize: '14px', fontWeight: 500, color: 'hsl(var(--foreground))', display: 'block', marginBottom: '4px' }}>{title}</Text>
          <Space align="baseline">
            <Statistic
              value={value}
              valueStyle={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.2' }}
            />
            {trendValue && trendDirection && (
              <Text className={`${trendColorClass} text-xs ml-1`}>
                {trendAntIcon} {trendValue}
              </Text>
            )}
          </Space>
           {subtext && <Paragraph type="secondary" className="sales-card-subtext" style={{ fontSize: '12px', margin: '4px 0 0 0' }}>{subtext}</Paragraph>}
           {chart && <div style={{ marginTop: '12px', height: '50px' }}>{chart}</div>}
        </>
      )}
    </Card>
  );
};

export default SalesCard;
