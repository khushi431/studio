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
    colorPrimary: '#318f8a', // Teal (hsl(175, 55%, 40%))
    colorLink: '#318f8a',   // Teal for links
    colorInfo: '#318f8a',   // Teal for info elements
    fontFamily: "'PT Sans', sans-serif",
    // colorSuccess: '#52c41a', 
    // colorError: '#ff4d4f', 
    // colorWarning: '#faad14' 
  },
  components: {
    Card: {
      colorBgContainer: '#ffffff', // Ensure cards are white by default
      paddingLG: 16, // Compact card padding
    },
    Button: {
      // colorPrimary: '#318f8a', 
      // colorPrimaryHover: '#2A7A74', 
      // colorPrimaryActive: '#23655F',
    },
    Statistic: {
      contentFontSize: 22,
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
