// pages/_app.tsx - 이렇게 수정하세요!
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>중개 수수료(복비) 계산기</title>
        <meta name="description" content="한국 부동산 중개 수수료를 계산하는 웹 애플리케이션" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}