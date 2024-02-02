import { sanitizeUrl } from '@braintree/sanitize-url';
import { setupKeypom } from '@keypom/selector';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupHereWallet } from '@near-wallet-selector/here-wallet';
// todo: mj commented this out, but not sure if I should iterate and try with it
// import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
// import { setupNeth } from '@near-wallet-selector/neth';
import { setupNightly } from '@near-wallet-selector/nightly';
import { setupSender } from '@near-wallet-selector/sender';
// import { setupWelldoneWallet } from '@near-wallet-selector/welldone-wallet';
import Big from 'big.js';
import { setupFastAuthWallet } from 'near-fastauth-wallet';
import {
  CommitButton,
  EthersProviderContext,
  useAccount,
  useCache,
  useInitNear,
  useNear,
  utils,
  Widget,
} from 'near-social-vm';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

import { useEthersProviderContext } from '@/data/web3';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import { useAuthStore } from '@/stores/auth';
import { useVmStore } from '@/stores/vm';
import {networkId, signInContractId, walletConnectProjectId} from '@/utils/config';
import { KEYPOM_OPTIONS } from '@/utils/keypom-options';

export default function VmInitializer() {
  const [signedIn, setSignedIn] = useState(false);
  const [signedAccountId, setSignedAccountId] = useState(null);
  const [availableStorage, setAvailableStorage] = useState<Big | null>(null);
  const [walletModal, setWalletModal] = useState<WalletSelectorModal | null>(null);
  const [walletModalReady, setWalletModalReady] = useState(false);
  const [useWalletSelector, setUseWalletSelector] = useState(false);
  const ethersProviderContext = useEthersProviderContext();
  const { initNear } = useInitNear();
  const near = useNear();
  const account = useAccount();
  const cache = useCache();
  const accountId = account.accountId || null;
  const setAuthStore = useAuthStore((state) => state.set);
  const setVmStore = useVmStore((store) => store.set);
  const { requestAuthentication, saveCurrentUrl } = useSignInRedirect();

  useEffect(() => {
    initNear &&
      initNear({
        networkId,
        selector: setupWalletSelector({
          network: networkId,
          modules: [
            setupNearWallet(),
            setupMyNearWallet(),
            setupSender(),
            setupHereWallet(),
            setupWalletConnect({
              // guess this is not loading either from config?
              // projectId: walletConnectProjectId,
              projectId: "6ac6fa888fb53661396636cc747245ad",
              metadata: {
                name: 'NEAR Staking',
                description: 'Stake, unstake, withdraw NEAR',
                url: 'http://127.0.0.1:3001', // todo
                icons: ['https://avatars.githubusercontent.com/u/37784886'],
              },
            }),
              // todo here too mike
            // setupMeteorWallet(),
            // setupNeth({
            //   gas: '300000000000000',
            //   bundle: false,
            // }),
            setupNightly(),
            // setupWelldoneWallet(),
            setupFastAuthWallet({
              relayerUrl:
                networkId === 'testnet'
                  ? 'http://34.70.226.83:3030/relay'
                  : 'https://near-relayer-mainnet.api.pagoda.co/relay',
            }),
            setupKeypom({
              trialAccountSpecs: {
                url:
                  networkId == 'testnet'
                    ? 'https://test.near.org/#trial-url/ACCOUNT_ID/SECRET_KEY'
                    : 'https://near.org/#trial-url/ACCOUNT_ID/SECRET_KEY',
                modalOptions: KEYPOM_OPTIONS(networkId) as any,
              },
              instantSignInSpecs: {
                url:
                  networkId == 'testnet'
                    ? 'https://test.near.org/#instant-url/ACCOUNT_ID/SECRET_KEY/MODULE_ID'
                    : 'https://near.org/#instant-url/ACCOUNT_ID/SECRET_KEY/MODULE_ID',
              },
              networkId,
              signInContractId,
            }) as any, // TODO: Refactor setupKeypom() to TS
          ],
        }),
        customElements: {
          Link: ({ href, to, ...rest }: any) => <Link href={sanitizeUrl(href ?? to)} {...rest} />,
        },
      });
  }, [initNear]);

  useEffect(() => {
    if (!near) {
      return;
    }
    near.selector.then((selector: any) => {
      setWalletModal(setupModal(selector, { contractId: near.config.contractName }));
    });
  }, [near]);

  useEffect(() => {
    if (!walletModal) {
      return;
    }
    setWalletModalReady(true)
  }, [walletModal]);

  const requestSignMessage = useCallback(
    async (message: string) => {
      if (!near) {
        return;
      }
      const wallet = await (await near.selector).wallet();
      const nonce = Buffer.from(Array.from(Array(32).keys()));
      const recipient = 'social.near';

      try {
        const signedMessage = await wallet.signMessage({
          message,
          nonce,
          recipient,
        });

        if (signedMessage) {
          const verifiedFullKeyBelongsToUser = await wallet.verifyOwner({
            message: signedMessage,
          });

          if (verifiedFullKeyBelongsToUser) {
            alert(`Successfully verify signed message: '${message}': \n ${JSON.stringify(signedMessage)}`);
          } else {
            alert(`Failed to verify signed message '${message}': \n ${JSON.stringify(signedMessage)}`);
          }
        }
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : 'Something went wrong';
        alert(errMsg);
      }
    },
    [near],
  );

  // okay gotta come back to this
  const requestSignInWithWallet = useCallback(() => {
    if (walletModalReady) {
      saveCurrentUrl();
      walletModal?.show();
      return false;
    }
  }, [saveCurrentUrl, walletModalReady, walletModal]);
  // }, [saveCurrentUrl, walletModal]);

  const logOut = useCallback(async () => {
    if (!near) {
      return;
    }
    const wallet = await (await near.selector).wallet();
    wallet.signOut();
    near.accountId = null;
    setSignedIn(false);
    setSignedAccountId(null);
    localStorage.removeItem('accountId');
  }, [near]);

  const refreshAllowance = useCallback(async () => {
    alert("You're out of access key allowance. Need sign in again to refresh it");
    await logOut();
    requestAuthentication();
  }, [logOut, requestAuthentication]);

  useEffect(() => {
    if (!near) {
      return;
    }
    setSignedIn(!!accountId);
    // // todo set to true?
    // setUseWalletSelector(
    //     setupModal(selector, { contractId : NetworkId === "testnet" ? "v1.social08.testnet" : near.config.contractName })
    // );
    setSignedAccountId(accountId);
  }, [near, accountId]);

  useEffect(() => {
    setAvailableStorage(
      account.storageBalance ? Big(account.storageBalance.available).div(utils.StorageCostPerByte) : Big(0),
    );
  }, [account]);

  useEffect(() => {
    if (navigator.userAgent !== 'ReactSnap') {
      const pageFlashPrevent = document.getElementById('page-flash-prevent');
      if (pageFlashPrevent) {
        pageFlashPrevent.remove();
      }
    }
  }, []);

  useEffect(() => {
    setAuthStore({
      account,
      accountId: signedAccountId || '',
      availableStorage,
      logOut,
      refreshAllowance,
      requestSignInWithWallet,
      requestSignMessage,
      vmNear: near,
      signedIn,
      useWalletSelector,
      walletModal,
    });
  }, [
    account,
    availableStorage,
    logOut,
    refreshAllowance,
    requestSignInWithWallet,
    requestSignMessage,
    signedIn,
    signedAccountId,
    setAuthStore,
    near,
    useWalletSelector,
    walletModal,
    walletModalReady,
  ]);

  useEffect(() => {
    setVmStore({
      cache,
      CommitButton,
      ethersContext: ethersProviderContext,
      EthersProvider: EthersProviderContext.Provider,
      Widget,
      near,
    });
  }, [cache, ethersProviderContext, setVmStore, near]);

  return <></>;
}
