import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import 'tw-elements';
import 'regenerator-runtime/runtime';
import { Layout } from '@/components/templates';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>eiei-English</title>
        <script defer src="node_modules/tw-elements/dist/js/index.min.js"></script>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
