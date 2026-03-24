const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

export const siteConfig = {
  siteName: '중개 수수료(복비) 계산기',
  siteDescription:
    '한국 부동산 중개보수 상한 요율을 바탕으로 매매, 전세, 월세의 예상 중개 수수료를 계산하는 무료 온라인 도구입니다.',
  siteUrl: rawSiteUrl.replace(/\/$/, ''),
  kakaoOpenChatUrl: process.env.NEXT_PUBLIC_KAKAO_OPENCHAT_URL || '',
};
