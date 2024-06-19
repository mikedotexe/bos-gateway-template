import { useRouter } from 'next/router';
import React from 'react';
import HomePage from "@/pages/index";

export default function CatchAllPage() {
    const router = useRouter();

    // Define a function for redirection
    const redirectToNearOrg = () => {
        router.push('https://near.org');
    };

    return (
        <HomePage pageProps={{from: "custom route", redirectToNearOrg: redirectToNearOrg}}/>
    );
}
