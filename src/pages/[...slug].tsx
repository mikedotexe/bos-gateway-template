import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'react';
import HomePage from "@/pages/index";
import App from "@/pages/_app";

export default function CatchAllPage() {
    const router = useRouter();

    // interesting, we're going to try passing it thru

    // leftoff: tryactions like redirects and setting the URL bar on the browser SPA style
    // definitely an odd approach from what next wants, i'm worried their server side rendering stuff will clash, trying a few things
    // if (conditionForRedirect) {
    //     useEffect(() => {
    //         router.push('/another-route');
    //     }, []);
    //     return null; // Or a loading indicator until redirect completes
    // }

    return (
        <HomePage pageProps={{from: "custom route"}}/>
    )
}
