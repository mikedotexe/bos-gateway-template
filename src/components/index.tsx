import styled from 'styled-components';

import { VmComponent } from '@/components/vm/VmComponent';
import Disclaimer from './Discalaymer';
import SignInPage from "@/pages/signin";
import {useAuthStore} from "@/stores/auth";

const Container = styled.div`
    height: 100vh;
    padding: 1rem;
`;


export default function BosMain() {
    const signedIn = useAuthStore((store) => store.signedIn);
    const walletModal = useAuthStore((store) => store.walletModal);
    console.log('aloha c/index walletModal', walletModal);

    return (
        <Container>
            {/* apparently this component will not connect with Wallet Connect with closeTransport error on mainnet and testnet <SignInPage></SignInPage>*/}
            <div id={"hi"}>
                sheesh and {signedIn}
                {(!signedIn) && (

                    <p>I just need an element that pops up the wallet selector modal</p>
                    // <SignInButton onSignIn={() => props.requestSignIn()} />
                )}
                {signedIn && (
                    <>
                        <p>aloha brah from index component</p>
                        {/*<UserDropdown {...props}/>*/}
                    </>
                )}

            </div>
            <VmComponent
                src="mike.testnet/widget/StakingUI.Debug"
                // src="mike.near/widget/StakingUI.Debug"
                props={{hideDisclaimer: true}}
            />
            <Disclaimer/>
        </Container>
    )
}