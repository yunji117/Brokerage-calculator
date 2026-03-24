// components/SeoStructuredData.js
// Google Search 및 기타 검색 엔진을 위한 구조화된 데이터
import { siteConfig } from '../lib/siteConfig';

export default function SeoStructuredData() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': siteConfig.siteName,
    ...(siteConfig.siteUrl ? { url: siteConfig.siteUrl } : {}),
    'description': siteConfig.siteDescription,
    'applicationCategory': 'UtilityApplication',
    'browserRequirements': 'Requires JavaScript. Requires HTML5.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'KRW'
    },
    'creator': {
      '@type': 'Organization',
      'name': 'Brokerage Calculator'
    },
    'inLanguage': 'ko-KR'
  };

  const FAQData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': '중개 수수료 계산기란 무엇인가요?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': '이 웹사이트는 한국의 부동산 중개보수 상한 요율을 바탕으로 예상 중개 수수료를 계산하는 무료 온라인 도구입니다. 실제 중개보수는 법정 한도 안에서 협의로 정해집니다.'
        }
      },
      {
        '@type': 'Question',
        'name': '부동산 유형은 어떻게 선택하나요?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': '주택(아파트, 단독주택, 다세대주택, 빌라 등), 오피스텔, 주택 외(상가, 토지, 사무실 등) 중에서 해당하는 부동산 유형을 선택하면 됩니다. 각 유형별로 다른 상한 요율이 적용됩니다.'
        }
      },
      {
        '@type': 'Question',
        'name': '협의 보수율이란 무엇인가요?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': '협의 보수율은 법정 상한 요율 범위 내에서 거래 당사자와 중개사가 협의하여 결정하는 실제 중개 수수료율입니다. 상한 요율은 최고 한도이며 실제 적용 요율은 이보다 낮아질 수 있습니다.'
        }
      },
      {
        '@type': 'Question',
        'name': '계산 결과가 정확한가요?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': '이 계산기는 공인중개사법과 시행규칙, 생활법령정보의 공개 안내를 바탕으로 일반적인 중개보수 상한을 계산합니다. 실제 거래에서는 지역 조례와 개별 상황을 함께 확인해야 합니다.'
        }
      }
    ]
  };

  return (
    <>
      {/* Web Application Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQData) }}
      />
    </>
  );
}
