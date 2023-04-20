import "@common/styles/global.scss";
import {AppProps as NextAppProps} from "next/app";
import Head from "next/head";
import React from "react";

export default function App({Component, pageProps}: NextAppProps): React.ReactElement {
    return (
        <>
            <Head>
                <title>Next App</title>
                <meta name="description" content="Next App." />
                <meta name="keywords" content="next, react" />
                <meta name="theme-color" content="#8be0ea" />
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
