import { useEffect } from 'react';

import { MetaTags } from '@/components/MetaTags';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import { useCurrentComponentStore } from '@/stores/current-component';
import type { NextPageWithLayout } from '@/utils/types';
import BosMain from '@/components';

// todo move this if it works
// const SignInButton = () => {
//     const signInButtonStyles = {
//         borderRadius: "9px",
//         borderStyle: "solid",
//         borderWidth: "3px",
//         borderColor: "transparent",
//         padding: "6px 13px",
//         display: "inline-block",
//         height: "31px",
//     }
//
//     return (
//         <div>
//             {/*<button style={signInButtonStyles} onClick={props.onSignIn}>*/}
//             <button style={signInButtonStyles}>
//                 <h1>himom</h1>
//             </button>
//         </div>
//     )
// };

const HomePage: NextPageWithLayout = () => {
  const signedIn = useAuthStore((store) => store.signedIn);
  const walletModal = useAuthStore((store) => store.walletModal);
    console.log('aloha p/index walletModal', walletModal);
  // const requestSignInWithWallet = useAuthStore((store) => store.requestSignInWithWallet);
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);

  const cmon = () => {
      console.log('aloha top of cmon');
      walletModal.show()
  }

  useEffect(() => {
    if (!signedIn) {
      setComponentSrc(null);
    }
  }, [signedIn, setComponentSrc]);


  return (
      <>
          <MetaTags
              title={`BOS Gateway Template`}
              description={`"NEAR isn’t just a Layer 1 blockchain — it’s the Blockchain Operating System for an  Open Web. Create and discover decentralized apps, and help build the future of the web, today."`}
          />
          <div id={"hi"}>
              {/*{(!signedIn && useWalletSelector) && (*/}
              {(!signedIn) && (
                  // zzz < SignInButton onSignIn={() => props.requestSignIn()} />zzz
                  <>
                      <p>pleaase</p>
                      <button onClick={() => cmon()} >what</button>
                  </>
              )}
              {signedIn && (
                  <>
                      <p>logged in</p>
                      {/*<UserDropdown {...props}/>*/}
                  </>
              )}

          </div>
          <BosMain/>
      </>
  );
};

HomePage.getLayout = useDefaultLayout;

export default HomePage;
