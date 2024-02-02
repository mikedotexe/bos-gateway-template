import styled from 'styled-components';

import { VmComponent } from '@/components/vm/VmComponent';
import Disclaimer from './Discalaymer';
import SignInPage from "@/pages/signin";
import {useAuthStore} from "@/stores/auth";
import {widget} from "@/utils/config";

const Container = styled.div`
    height: 100vh;
    padding: 1rem;
`;


{/* apparently this component will not connect with Wallet Connect with closeTransport error on mainnet and testnet <SignInPage></SignInPage>*/}
export default function BosMain() {
    const signedIn = useAuthStore((store) => store.signedIn);
    const walletModal = useAuthStore((store) => store.walletModal);

    return (
        <Container>
            <VmComponent
                src={widget}
                props={{hideDisclaimer: true}}
            />
            <Disclaimer/>
        </Container>
    )
}