import { useEffect } from 'react';

import { MetaTags } from '@/components/MetaTags';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import { useCurrentComponentStore } from '@/stores/current-component';
import type { NextPageWithLayout } from '@/utils/types';
import BosMain from '@/components';

const HomePage: NextPageWithLayout = () => {
  const signedIn = useAuthStore((store) => store.signedIn);
  // const walletModal = useAuthStore((store) => store.walletModal);
  // const walletModal = useAuthStore((store) => store.requestSignInWithWallet);
  // the below didn't seem to work
  // const requestSignInWithWallet = useAuthStore((store) => store.requestSignInWithWallet);
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);

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
          <BosMain/>
      </>
  );
};

HomePage.getLayout = useDefaultLayout;

export default HomePage;
