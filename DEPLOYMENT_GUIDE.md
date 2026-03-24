# 중개 수수료 계산기 배포 가이드

## 📋 배포 전 준비 사항

### 1. 도메인 준비
- 도메인 구매 (GoDaddy, namecheap, 가비아, Route53 등)
- DNS 설정 (배포 플랫폼에서 제공하는 nameserver로 변경)

### 2. 호스팅 플랫폼 선택
추천 플랫폼:
- **Vercel** (Next.js 최적화, 무료 플랜 있음) - 가장 추천
- **Netlify** (정적 사이트 호스팅)
- **AWS Amplify** (AWS 생태계 통합)
- **Heroku** (서버 필요 시)

## 🚀 Vercel 배포 가이드 (추천)

### 단계 1: GitHub에 코드 업로드
```bash
git add .
git commit -m "deploy: 배포 준비"
git push origin main
```

### 단계 2: Vercel 연결
1. [Vercel.com](https://vercel.com)에 접속
2. GitHub 계정으로 로그인
3. "Import Project" → GitHub 저장소 선택
4. 프로젝트 설정 후 "Deploy" 클릭

### 단계 3: 커스텀 도메인 연결
1. Vercel Dashboard → Settings → Domains
2. 도메인 추가
3. DNS 저장소에서 제공된 nameserver 입력

### 단계 4: 환경 변수 설정 (선택사항)
1. Settings → Environment Variables
2. 필요한 환경 변수 추가

## 🔍 Google AdSense 신청

### 1. Google AdSense 계정 생성
1. [Google AdSense](https://www.google.com/adsense/)에 접속
2. 없으면 Google 계정 생성
3. 웹사이트 URL 입력

### 2. AdSense 코드 설정
배포 완료 후:

#### _document.tsx 수정
```javascript
{/* Google AdSense 스크립트 */}
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script>
```
- `ca-pub-XXXXXXXXXXXXXXXX`를 자신의 AdSense 클라이언트 ID로 변경

#### Calculator.js에 광고 추가
```javascript
import { AdSenseHorizontal, AdSenseSquare } from '../components/AdSense';

// 결과 화면 위에 광고 추가
<AdSenseHorizontal />
<div className={styles.resultSection}>
  {/* ... 결과 내용 ... */}
</div>
```

### 3. AdSense 승인 대기
- 신청 후 몇 일 내에 Google 검토 시작
- 콘텐츠 품질, 트래픽 등을 평가
- 승인되면 광고 게재 시작

## 🔧 Google Search Console 설정

### 1. Google Search Console 등록
1. [Google Search Console](https://search.google.com/search-console/)에 접속
2. 도메인 추가
3. DNS 또는 HTML 파일로 소유권 확인

### 2. Sitemap 제출
1. Search Console → Sitemaps
2. sitemap.xml 제출 (next-sitemap.js 활용)

### 3. 색인 요청
1. URL 검사 → "Google에 색인 요청" 클릭

## 📊 Google Analytics 설정 (선택사항)

### 1. Google Analytics 계정 생성
1. [Google Analytics](https://analytics.google.com/)에 접속
2. 속성 생성

### 2. 추적 코드 추가
_app.tsx에 추가:
```javascript
<script async src={`https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`}></script>
<script dangerouslySetInnerHTML={{
  __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');`
}}></script>
```

## ✅ 배포 후 확인 사항

- [ ] 도메인으로 접속 가능한지 확인
- [ ] HTTPS 적용되어 있는지 확인 (대부분 자동)
- [ ] 모바일 반응형이 제대로 작동하는지 확인
- [ ] robots.txt와 sitemap.xml이 접근 가능한지 확인
- [ ] Google Search Console 소유권 확인
- [ ] AdSense 승인 상태 확인
- [ ] Analytics 데이터 수집 확인

## 🎯 SEO 최적화 팁

1. **메타데이터 최적화**: _app.tsx의 OG 메타데이터 수정
2. **스키마 마크업**: structured-data.json 추가
3. **모바일 최적화**: 반응형 디자인 확인
4. **페이지 속도**: Lighthouse 점수 확인
5. **백링크**: 관련 사이트에 링크 요청

## 📝 주의사항

- AdSense 승인 전까지는 광고가 표시되지 않습니다
- 승인 후 광고 표시까지 24-48시간이 소요될 수 있습니다
- AdSense 정책을 준수하지 않으면 계정 정지될 수 있습니다
- 정기적으로 콘텐츠를 업데이트하여 사용자 경험 향상

## 💡 추가 리소스

- [Vercel 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/learn/basics/deploying-nextjs-app)
- [Google AdSense 도움말](https://support.google.com/adsense/)
- [Google Search Console 도움말](https://support.google.com/webmasters/)

---

배포 과정에서 문제가 발생하면 각 플랫폼의 공식 문서를 참고하시길 권장합니다.
