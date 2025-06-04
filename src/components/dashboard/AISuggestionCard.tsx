// src/components/dashboard/AISuggestionCard.tsx
"use client";

import React, { useState } from 'react';
import { Card, Form, Input, InputNumber, Button, Spin, Alert, Typography, Row, Col, Select } from 'antd';
import { getResidentIssueInsights, type ResidentIssueInput, type ResidentIssueOutput } from '@/ai/flows/product-insights'; // Will be resident-issue-insights

const { Title, Paragraph } = Typography;
const { Option } = Select;

const AISuggestionCard: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [insights, setInsights] = useState<ResidentIssueOutput | null>(null);

  const onFinish = async (values: ResidentIssueInput) => {
    setLoading(true);
    setError(null);
    setInsights(null);
    try {
      // Ensure the correct function name is used once the flow file is renamed/updated
      const result = await getResidentIssueInsights(values);
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
      <Title level={4} style={{ marginBottom: '20px' }}>AI-Driven Resident Support Insights</Title>
      <Paragraph type="secondary" style={{ marginBottom: '20px' }}>
        Enter details about a recurring resident issue to get AI-powered insights for prioritization and resolution.
      </Paragraph>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          issueCategory: 'Plumbing',
          numberOfReports: 5,
          urgencyLevel: "Medium",
          residentFeedbackSnippets: 'Leaky faucet in unit 101, low water pressure in 203, toilet not flushing in 305.',
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="issueCategory"
              label="Issue Category"
              rules={[{ required: true, message: 'Please input the issue category!' }]}
            >
              <Input placeholder="e.g., Plumbing, HVAC, Noise Complaint" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="numberOfReports"
              label="Number of Recent Reports"
              rules={[{ required: true, type: 'number', min: 1, message: 'Please input the number of reports!' }]}
            >
              <InputNumber style={{ width: '100%' }} placeholder="e.g., 5" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="urgencyLevel"
              label="Urgency Level"
              rules={[{ required: true, message: 'Please select the urgency level!' }]}
            >
              <Select placeholder="Select urgency">
                <Option value="Low">Low</Option>
                <Option value="Medium">Medium</Option>
                <Option value="High">High</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="residentFeedbackSnippets"
          label="Resident Feedback Snippets"
          rules={[{ required: true, message: 'Please provide some resident feedback!' }]}
        >
          <Input.TextArea rows={3} placeholder="e.g., 'Water leaking from ceiling in 5B.', 'AC not working for 2 days in 12A.'" />
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
          <Paragraph><strong>Prioritization Suggestion:</strong> {insights.prioritizationSuggestion}</Paragraph>
          <Paragraph><strong>Preventative Actions:</strong> {insights.preventativeActions}</Paragraph>
          <Paragraph><strong>Communication Strategy:</strong> {insights.communicationStrategy}</Paragraph>
          <Paragraph><strong>Potential Impact:</strong> {insights.potentialImpact}</Paragraph>
        </div>
      )}
    </Card>
  );
};

export default AISuggestionCard;
