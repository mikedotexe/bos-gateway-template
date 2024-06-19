import styled from 'styled-components';

import Disclaimer from './Discalaymer';
// import SignInPage from "@/pages/signin";
import {useAuthStore} from "@/stores/auth";
import {widget} from "@/utils/config";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";

const VmComponent = dynamic(() => import('../components/vm/VmComponent'), {});

const Container = styled.div`
    height: 150vh;
    padding: 1rem;
    background-image: radial-gradient(circle, transparent 10%, black 83%),
                      radial-gradient(circle, transparent 10%, slategray 50%, transparent 66%);
    background-color: slategray;
    background-attachment: fixed;
`;

{/* apparently this component will not connect with Wallet Connect with closeTransport error on mainnet and testnet <SignInPage></SignInPage>*/}
export default function BosMain(props: Record<string, unknown>) {
    const authStore = useAuthStore();
    const [modalIsReady, setModalIsReady] = useState(false);
    const [overrideWidget, setOverrideWidget] = useState<string>('');
    const [lastTimestampClicked, setLastTimestampClicked] = useState(19);

    const router = useRouter();
    const { query } = router;

    // When a user hits the escape key, we'll send that into the component that might
    // want to know if it should close a modal or act a certain way
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                console.log('Escape pressed');
                setLastTimestampClicked(Date.now());
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Clean up the event listener
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const overrideWidgetURLParam = query?.widget;
        if (overrideWidgetURLParam && typeof overrideWidgetURLParam === 'string') {
            console.log('Setting overrideWidgetURLParam:', overrideWidgetURLParam);
            setOverrideWidget(overrideWidgetURLParam);
        }
    }, [query?.widget]);

    useEffect(() => {
        if (authStore.walletModalReady) {
            setModalIsReady(true)
        }
    }, [authStore.walletModalReady, authStore.walletModal, authStore.signedIn]);

    // There might be another approach here, still figuring out how to use this…
    const signedIn = useAuthStore((store) => store.signedIn);
    const walletModal = useAuthStore((store) => store.walletModal);
    // let clickedOnGatewayMarkup = 19 // last time clicked on

    if (!modalIsReady) {
        return (<></>)
    } else {
        return (
            <Container onClick={async e => {
                console.log('clacked e', e)
                // This is suboptimal, but basically if the user clicks the "Close" button
                // on the VM modal (like Near.call) we don't want that to necessarily
                // trigger the closing of a modal the component may be implementing
                if ('innerText' in e.target && e.target.innerText === 'Close') {
                    return
                    // const innerTextClick = e.target.innerText
                    // if ()
                    // console.log('clacked e.target.innerText', e.target.innerText)
                }
                setLastTimestampClicked(Date.now())
            }}>
                <div id={"very-top"} style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    padding: '10px',
                }}>
                    {(!signedIn) ? (
                        <>
                            <button style={{
                                // backgroundColor: '#00ec97',
                                backgroundColor: 'rgb(107, 107, 107)',
                                border: 'none',
                                color: 'white',
                                padding: '10px 20px',
                                textTransform: 'uppercase',
                                letterSpacing: '3px',
                                fontWeight: "bold",
                                cursor: 'pointer',
                                boxShadow: '0 6px 8px rgba(0, 0, 0, 0.3)',
                                filter: 'brightness(83%)',
                            }} onClick={() => walletModal?.show()}>Login
                            </button>
                        </>
                    ) : (
                        <>
                            <button style={{
                                // backgroundColor: '#00ec97',
                                backgroundColor: 'rgb(107, 107, 107)',
                                border: 'none',
                                color: 'white',
                                borderRadius: '6px',
                                padding: '10px 20px',
                                textTransform: 'uppercase',
                                letterSpacing: '3px',
                                fontWeight: "bold",
                                cursor: 'pointer',
                                boxShadow: '0 6px 8px rgba(0, 0, 0, 0.6)',
                                filter: 'brightness(93%)',
                            }} onClick={() => walletModal?.logOut().then(logoutRes => console.log('Logged out', logoutRes))}>Logout</button>
                        </>
                    )}
                    {/*      TODO: Create some delete key log-out functionality here.*/}
                    {/*        {signedIn && (*/}
                    {/*            <>*/}
                    {/*                <p>logged in</p>*/}
                    {/*            </>*/}
                    {/*        )}*/}
                </div>
                <VmComponent
                    src={overrideWidget || widget}
                    props={{...props, lastTimestampClicked}}
                />
                <Disclaimer/>
            </Container>
        )
    }
}
