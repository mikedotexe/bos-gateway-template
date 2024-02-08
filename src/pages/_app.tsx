import '@/styles/theme.css';
import '@/styles/globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@near-wallet-selector/modal-ui/styles.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import {useEffect, useState} from 'react';

import { Toaster } from '@/components/lib/Toast';
import { useBosLoaderInitializer } from '@/hooks/useBosLoaderInitializer';
import { useHashUrlBackwardsCompatibility } from '@/hooks/useHashUrlBackwardsCompatibility';
import { useAuthStore } from '@/stores/auth';
import type { NextPageWithLayout } from '@/utils/types';

const VmInitializer = dynamic(() => import('../components/vm/VmInitializer'), {
  ssr: false,
});

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useBosLoaderInitializer();
  useHashUrlBackwardsCompatibility();

  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  const authStore = useAuthStore();
  const componentSrc = router.query;

  const [errorInfo, setErrorInfo] = useState<object>({});

  useEffect(() => {
    if (router.query.errorCode) {
      const errorCode = router.query.errorCode as string;
      const errorMessage = router.query.errorMessage  as string;
      setErrorInfo({
        code: decodeURIComponent(errorCode),
        msg: decodeURIComponent(errorMessage),
      });
      // todo: figure out how Toast works and try it
      console.error(`Error: ${errorCode}, Message: ${errorMessage as string}`);
    }
  }, [authStore.accountId, authStore.signedIn, componentSrc, router.query, router.pathname]);

  return (
    <>
      <Head>
        <meta name="" content="" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <Script id="bootstrap" src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />

      <VmInitializer />
      {/* look at the bottom of pages/index.tsx, for default layout shiznit */}
      {getLayout(<Component {...pageProps} error={{...errorInfo}}/>)}

      {/* todo: figure out how to use it, yes! */}
      <Toaster />
    </>
  );
}
