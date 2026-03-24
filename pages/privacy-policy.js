import Head from 'next/head';
import Link from 'next/link';
import { siteConfig } from '../lib/siteConfig';

export default function PrivacyPolicyPage() {
  const canonicalUrl = siteConfig.siteUrl ? `${siteConfig.siteUrl}/privacy-policy` : '';

  return (
    <>
      <Head>
        <title>개인정보처리방침 | {siteConfig.siteName}</title>
        <meta
          name="description"
          content="중개 수수료(복비) 계산기 서비스의 개인정보 처리 방침 안내입니다."
        />
        {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
      </Head>
      <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px', lineHeight: 1.8 }}>
        <h1>개인정보처리방침</h1>
        <p>
          본 사이트는 계산기 서비스 제공과 기본적인 접속 통계 확인을 위해 최소한의 정보만 처리합니다.
          별도의 회원가입 기능은 제공하지 않으며, 이름이나 주민등록번호와 같은 민감한 개인정보를
          직접 수집하지 않습니다.
        </p>
        <p>
          브라우저 및 서버 환경에서는 서비스 안정화, 보안 대응, 방문 통계 분석을 위해 IP 주소,
          브라우저 정보, 접속 일시, 방문 경로 등의 정보가 자동으로 기록될 수 있습니다.
        </p>
        <p>
          추후 Google AdSense 또는 웹 분석 도구가 적용되는 경우, 쿠키 또는 유사 기술이 사용될 수
          있으며 관련 사항은 본 페이지에 업데이트됩니다.
        </p>
        <p>
          문의 폼을 이용하는 경우에는 문의 유형과 문의 내용이 운영자에게 전달될 수 있으며, 문의 대응
          목적 범위 안에서만 사용합니다.
        </p>
        <p>
          개인정보 처리에 관한 문의가 필요한 경우 아래 문의 페이지를 이용해 주세요.
        </p>
        <p>
          <Link href="/contact">문의 페이지로 이동</Link>
        </p>
      </main>
    </>
  );
}
