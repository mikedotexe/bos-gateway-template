import {type ReactElement, useEffect, useState} from 'react';

import { MetaTags } from '@/components/MetaTags';
import { useAuthStore } from '@/stores/auth';
import { useCurrentComponentStore } from '@/stores/current-component';
import type { NextPageWithLayout } from '@/utils/types';
import BosMain from '@/components';
import {DefaultLayout} from "@/components/layouts/DefaultLayout";
import {useRouter} from "next/router";

const HomePage: NextPageWithLayout = (homepageProps) => {
  const signedIn = useAuthStore((store) => store.signedIn);
  const [urlParams, setUrlParams] = useState<object>();
  const [routeDetails, setRouteDetails] = useState<object>();
  const router = useRouter();
  // the below didn't seem to work
  // const requestSignInWithWallet = useAuthStore((store) => store.requestSignInWithWallet);
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);

    useEffect(() => {
        const slugs = router.query.slug || [];
        const pathName = router.asPath;
        const baseName = slugs[0] || ''; // Assuming the base name is the first slug

        setRouteDetails({ pathName, baseName, slugs });

        const decodeParams = (params: Record<string, any>) => {
            const decodedParams: Record<string, any> = {};
            Object.keys(params).forEach(key => {
                if (Array.isArray(params[key])) {
                    decodedParams[key] = params[key].map((value: string) => decodeURIComponent(value));
                } else {
                    decodedParams[key] = decodeURIComponent(params[key]);
                }
            });
            return decodedParams;
        };

        if (router.query?.slug) {
            const { slug, ...otherParams } = router.query;
            setUrlParams(decodeParams(otherParams))
        } else {
            setUrlParams(decodeParams(router.query))
        }
    }, [router.query, router.pathname]);

  useEffect(() => {
    if (!signedIn) {
      setComponentSrc(null);
    }
  }, [signedIn, setComponentSrc]);

  return (
      <>
          <MetaTags
              title={`Staking NEAR`}
              description={`"Stake, unstake, withdraw NEAR using verifiable frontend component code."`}
          />
          <BosMain {...homepageProps} routeDetails={{...routeDetails}} urlParams={{...urlParams}}/>
      </>
  );
};

// this gets called in pages/_app.tsx
HomePage.getLayout = function getLayout(page: ReactElement) {
    return <DefaultLayout errorInfo={page.props.error.msg}>{page}</DefaultLayout>;
};

export default HomePage;
