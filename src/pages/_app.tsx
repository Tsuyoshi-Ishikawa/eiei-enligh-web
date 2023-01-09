import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import 'regenerator-runtime/runtime';
import { Layout } from '@/components/templates';

export default function App({ Component, pageProps }: AppProps) {
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
