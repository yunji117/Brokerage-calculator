import Head from 'next/head';
import { siteConfig } from '../lib/siteConfig';

export default function ContactPage() {
  const canonicalUrl = siteConfig.siteUrl ? `${siteConfig.siteUrl}/contact` : '';

  return (
    <>
      <Head>
        <title>문의 안내 | {siteConfig.siteName}</title>
        <meta
          name="description"
          content="중개 수수료(복비) 계산기 서비스 문의 안내 페이지입니다."
        />
        {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
      </Head>
      <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px', lineHeight: 1.8 }}>
        <h1>문의 안내</h1>
        <p>
          계산 결과 오류 제보, 정보 수정 요청, 광고 및 제휴 문의는 아래 이메일로 보내 주세요.
        </p>
        <p>
          이메일: <a href="mailto: yunifystudio99@gmail.com">yunifystudio99@gmail.com</a>
        </p>
        <p>
          실제 운영을 시작하실 때에는 이 주소를 운영자 이메일로 교체하는 것을 권장합니다.
        </p>
        <p>
          법률 자문이나 세무 자문은 제공하지 않으며, 구체적인 거래는 공인중개사 및 전문가와
          반드시 별도로 확인해 주세요.
        </p>
      </main>
    </>
  );
}
