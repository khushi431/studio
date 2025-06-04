import type { Metadata } from 'next';
import './globals.css';
import { AntdConfigProvider } from './antd-config-provider';

export const metadata: Metadata = {
  title: 'Dashboard Ace',
  description: 'Modern admin dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AntdConfigProvider>{children}</AntdConfigProvider>
      </body>
    </html>
  );
}
