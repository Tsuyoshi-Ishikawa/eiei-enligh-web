import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import 'regenerator-runtime/runtime';
import { Layout } from '@/components/templates';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // This command is necessary for setting voice.
    // If here is not following command, we cannot set first speech voice.
    const voices = speechSynthesis.getVoices();
  }, []);

  return (
    <>
      <Head>
        <title>eiei-English</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
