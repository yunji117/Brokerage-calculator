// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { siteConfig } from '../lib/siteConfig';

export default function App({ Component, pageProps }: AppProps) {
  const homepageUrl = siteConfig.siteUrl || '';
  const previewImagePath = '/og-image.png';
  const faviconIcoPath = '/favicon.ico?v=2';
  const favicon16Path = '/favicon-16x16.png?v=2';
  const favicon32Path = '/favicon-32x32.png?v=2';
  const appleTouchIconPath = '/apple-touch-icon.png?v=2';
  const androidChrome192Path = '/android-chrome-192x192.png?v=2';

  return (
    <>
      <Head>
        {/* 기본 메타데이터 */}
        <title>중개 수수료(복비) 계산기 | 부동산 중개료 자동 계산</title>
        <meta name="description" content={siteConfig.siteDescription} />
        <meta name="keywords" content="중개 수수료, 중개료, 복비, 부동산 계산기, 중개보수 계산, 공인중개사법" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Brokerage Calculator" />
        <meta name="robots" content="index, follow" />
        
        {/* OG (Open Graph) 메타데이터 - SNS 공유용 */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteConfig.siteName} />
        <meta property="og:description" content={siteConfig.siteDescription} />
        {homepageUrl ? <meta property="og:url" content={homepageUrl} /> : null}
        {/* og:image는 배포 후 추가하세요 */}
        {/* <meta property="og:image" content="https://yourdomain.com/og-image.png" /> */}
        {homepageUrl ? <meta property="og:image" content={`${homepageUrl}${previewImagePath}`} /> : null}
        <meta property="og:image:alt" content="중개 수수료(복비) 계산기 미리보기 이미지" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {homepageUrl ? <meta name="twitter:image" content={`${homepageUrl}${previewImagePath}`} /> : null}

        
        {/* Twitter 카드 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteConfig.siteName} />
        <meta name="twitter:description" content={siteConfig.siteDescription} />
        {/* <meta name="twitter:image" content="https://yourdomain.com/og-image.png" /> */}
        
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href={favicon32Path} />
        <link rel="icon" type="image/png" sizes="16x16" href={favicon16Path} />
        <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIconPath} />
        <link rel="icon" type="image/png" sizes="192x192" href={androidChrome192Path} />
        <link rel="shortcut icon" href={faviconIcoPath} />
        {homepageUrl ? <link rel="canonical" href={homepageUrl} /> : null}
        
        {/* 추가 SEO 설정 */}
        <meta name="theme-color" content="#1abc9c" />
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
