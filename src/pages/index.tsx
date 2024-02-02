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

const VeryTop = () => {
    const containerStyle = {
        position: 'fixed',
        top: 0,
        right: 0,
        padding: '10px',
    };

    const buttonStyle = {
        backgroundColor: '#00ec97',
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        cursor: 'pointer',
        boxShadow: '0 6px 8px rgba(0, 0, 0, 0.3)',
        filter: 'brightness(83%)',
    };

    return (
        <div style={containerStyle}>
            <button style={buttonStyle}>Login</button>
        </div>
    );
};

const HomePage: NextPageWithLayout = () => {
  const signedIn = useAuthStore((store) => store.signedIn);
  const walletModal = useAuthStore((store) => store.walletModal);
    console.log('aloha p/index walletModal', walletModal);
  // const requestSignInWithWallet = useAuthStore((store) => store.requestSignInWithWallet);
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);
  

  useEffect(() => {
    if (!signedIn) {
      setComponentSrc(null);
    }
  }, [signedIn, setComponentSrc]);

  const veryTopStyles = {
    container: {
        position: 'fixed',
        top: 0,
        right: 0,
        padding: '10px',
    },
    button: {
        backgroundColor: '#00ec97',
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        fontWeight: "bold",
        cursor: 'pointer',
        boxShadow: '0 6px 8px rgba(0, 0, 0, 0.3)',
        filter: 'brightness(83%)',
    }
  };

  return (
      <>
          <MetaTags
              title={`BOS Gateway Template`}
              description={`"NEAR isn’t just a Layer 1 blockchain — it’s the Blockchain Operating System for an  Open Web. Create and discover decentralized apps, and help build the future of the web, today."`}
          />
          <div id={"very-top"} style={veryTopStyles.container}>
              {(!signedIn) && (
                  <>
                      <button style={veryTopStyles.button} onClick={() => walletModal.show()}>Login</button>
                  </>
              )}
              {/*      TODO: Create some delete key log-out functionality here.*/}
              {/*        {signedIn && (*/}
              {/*            <>*/}
              {/*                <p>logged in</p>*/}
              {/*            </>*/}
              {/*        )}*/}
          </div>
          <BosMain/>
      </>
  );
};

HomePage.getLayout = useDefaultLayout;

export default HomePage;
