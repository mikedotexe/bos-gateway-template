import type { ReactNode } from 'react';

import { BosLoaderBanner } from '../BosLoaderBanner';
import {ErrorLoaderBanner} from "@/components/ErrorBanner";
// import { Navigation } from '../navigation/Navigation';

interface Props {
  children: ReactNode;
  errorInfo?: string;
}

export function DefaultLayout({ children, errorInfo }: Props) {
  return (
    <>
      {/* <Navigation /> */}
      <BosLoaderBanner />
        { errorInfo && (
            <ErrorLoaderBanner errorInfo={errorInfo}/>
        )}

      {children}
    </>
  );
}
