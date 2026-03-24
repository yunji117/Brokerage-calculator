import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* Google AdSense 스크립트 */}
        {/* 도메인 연결 후 여기에 AdSense 클라이언트 ID를 추가하세요 */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script> */}
        
        {/* Google Analytics (선택사항) */}
        {/* Google Tag Manager 또는 Google Analytics 코드를 여기에 추가하세요 */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
