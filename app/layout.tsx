import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Excuse as a Service (EaaS)",
  description: "A one-click SaaS that instantly generates quirky, tech-flavored excuses for skipping the office and working from home.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Using CDN for simplicity in this migration to match previous setup */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: 'class',
                theme: {
                  extend: {
                    colors: {
                      brand: {
                        light: '#3B82F6',
                        dark: '#60A5FA',
                        bgDark: '#111827',
                        bgLight: '#FFFFFF',
                      }
                    },
                    animation: {
                      'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                      'bounce-short': 'bounce 0.5s infinite',
                    }
                  }
                }
              }
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-gray-900 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}