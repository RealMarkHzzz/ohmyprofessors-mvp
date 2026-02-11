/**
 * Analytics Provider
 * Automatically tracks page views and user returns
 * Wrap your app with this component
 */

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView, trackUserReturn } from '@/lib/analytics';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Track page views on route change
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  // Track user return on app load (once per session)
  useEffect(() => {
    trackUserReturn();
  }, []);

  return <>{children}</>;
}
