import styled from 'styled-components';

import { VmComponent } from '@/components/vm/VmComponent';
import Disclaimer from './Discalaymer';
// import SignInPage from "@/pages/signin";
import {useAuthStore} from "@/stores/auth";
import {widget} from "@/utils/config";
import {useEffect, useState} from "react";

const Container = styled.div`
    height: 100vh;
    padding: 1rem;
`;


{/* apparently this component will not connect with Wallet Connect with closeTransport error on mainnet and testnet <SignInPage></SignInPage>*/}
export default function BosMain() {
    const authStore = useAuthStore();
    const [modalIsReady, setModalIsReady] = useState(false);

    useEffect(() => {
        if (authStore.walletModalReady) {
            setModalIsReady(true)
        }
    }, [authStore.walletModalReady, authStore.walletModal, authStore.signedIn]);

    // There might be another approach here, still figuring out how to use this…
    const signedIn = useAuthStore((store) => store.signedIn);
    const walletModal = useAuthStore((store) => store.walletModal);
    const walletModalReady = useAuthStore((store) => store.walletModalReady);

    if (!modalIsReady) {
        return (<></>)
    } else {
        return (
            <Container>
                <div id={"very-top"} style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    padding: '10px',
                }}>
                    {(!signedIn) && (
                        <>
                            <button style={{
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
                            }} onClick={() => walletModal?.show()}>Login
                            </button>
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
                    src={widget}
                    props={{hideDisclaimer: true}}
                />
                <Disclaimer/>
            </Container>
        )
    }
}