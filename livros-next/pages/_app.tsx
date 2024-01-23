
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
        <>
        <head>
            <meta name="viewport"
                content='width=device-whidth, initial-scale=1'></meta>
        </head>
        <Component {...pageProps}></Component>
        </>
    )
}

export default MyApp;