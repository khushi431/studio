// src/app/antd-config-provider.tsx
"use client";

import type { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';
import React from 'react';

// Ant Design theme configuration
const theme = {
  token: {
    colorPrimary: '#73A3B1', // Soft blue
    colorLink: '#A984D3',   // Light purple for links/interactive elements
    colorInfo: '#73A3B1',   // Soft blue for info elements
    fontFamily: "'PT Sans', sans-serif",
    // AntD will use colorPrimary for success by default for Statistic, let's customize if needed
    // colorSuccess: '#52c41a', // Default AntD green, can be customized
    // colorError: '#ff4d4f', // Default AntD red
    // colorWarning: '#faad14' // Default AntD orange/yellow
  },
  components: {
    Card: {
      colorBgContainer: '#ffffff', // Ensure cards are white by default
    },
    Button: {
      // Example: If accent color #A984D3 should be default button color
      // colorPrimary: '#A984D3', 
      // colorPrimaryHover: '#BF9AE0', // Lighter purple for hover
      // colorPrimaryActive: '#9870C0', // Darker purple for active
    }
  }
};

export const AntdRegistry = ({ children }: { children: ReactNode }) => {
  const cache = React.useMemo<any>(() => createCache(), []);
  useServerInsertedHTML(() => (
    <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
  ));
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};


export function AntdConfigProvider({ children }: { children: ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={theme}>
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}
