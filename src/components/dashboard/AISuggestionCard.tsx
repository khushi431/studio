// src/components/dashboard/AISuggestionCard.tsx
"use client";

import React, { useState } from 'react';
import { Card, Form, Input, InputNumber, Button, Spin, Alert, Typography, Row, Col } from 'antd';
import { getProductInsights, type ProductInsightsInput, type ProductInsightsOutput } from '@/ai/flows/product-insights';

const { Title, Paragraph } = Typography;

const AISuggestionCard: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [insights, setInsights] = useState<ProductInsightsOutput | null>(null);

  const onFinish = async (values: ProductInsightsInput) => {
    setLoading(true);
    setError(null);
    setInsights(null);
    try {
      const result = await getProductInsights(values);
      setInsights(result);
    } catch (err) {
      console.error("Error fetching AI insights:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="ai-suggestion-card" style={{ marginTop: '24px' }}>
      <Title level={4} style={{ marginBottom: '20px' }}>AI-Driven Product Insights</Title>
      <Paragraph type="secondary" style={{ marginBottom: '20px' }}>
        Enter product details to get AI-powered suggestions for optimal placement and promotion strategies.
      </Paragraph>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          productName: 'Example Widget',
          category: 'Electronics',
          sold: 100,
          price: 29.99,
          earnings: 2999.00,
          marketTrends: 'Growing demand for smart home devices.',
          competitorAnalysis: 'Competitor X offers a similar product at a slightly higher price point but with fewer features.',
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="productName"
              label="Product Name"
              rules={[{ required: true, message: 'Please input the product name!' }]}
            >
              <Input placeholder="e.g., Smart Thermostat X1" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please input the category!' }]}
            >
              <Input placeholder="e.g., Home Appliances" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="sold"
              label="Units Sold"
              rules={[{ required: true, type: 'number', message: 'Please input units sold!' }]}
            >
              <InputNumber style={{ width: '100%' }} placeholder="e.g., 500" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="price"
              label="Price (per unit)"
              rules={[{ required: true, type: 'number', message: 'Please input the price!' }]}
            >
              <InputNumber style={{ width: '100%' }} placeholder="e.g., 49.99" step="0.01" />
            </Form.Item>
          </Col>
           <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="earnings"
              label="Total Earnings"
              rules={[{ required: true, type: 'number', message: 'Please input total earnings!' }]}
            >
              <InputNumber style={{ width: '100%' }} placeholder="e.g., 24995.00" step="0.01" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="marketTrends"
          label="Market Trends"
          rules={[{ required: true, message: 'Please describe market trends!' }]}
        >
          <Input.TextArea rows={3} placeholder="e.g., Increased consumer interest in sustainable products." />
        </Form.Item>
        <Form.Item
          name="competitorAnalysis"
          label="Competitor Analysis"
          rules={[{ required: true, message: 'Please provide competitor analysis!' }]}
        >
          <Input.TextArea rows={3} placeholder="e.g., Main competitor AlphaBrand launched a new model last quarter." />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Get Insights
          </Button>
        </Form.Item>
      </Form>

      {loading && <div style={{ textAlign: 'center', margin: '20px 0' }}><Spin size="large" /></div>}
      {error && <Alert message="Error" description={error} type="error" showIcon style={{ marginTop: '20px' }} />}
      
      {insights && (
        <div className="ai-results">
          <Title level={5} style={{ color: 'var(--ant-primary-color)' }}>Generated Insights:</Title>
          <Paragraph><strong>Optimal Placement:</strong> {insights.optimalPlacement}</Paragraph>
          <Paragraph><strong>Promotion Strategies:</strong> {insights.promotionStrategies}</Paragraph>
          <Paragraph><strong>Key Insights:</strong> {insights.keyInsights}</Paragraph>
        </div>
      )}
    </Card>
  );
};

export default AISuggestionCard;
