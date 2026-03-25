# 🏠 중개 수수료(복비) 계산기

한국 부동산 중개 수수료를 정확하게 계산하는 무료 온라인 도구입니다.

## ✨ 주요 기능

- **부동산 유형별 계산**: 주택, 오피스텔, 상가 등 모든 부동산 유형 지원
- **거래 유형별 계산**: 매매 또는 교환, 전세, 월세 모든 거래 방식 지원
- **법정 상한 요율 자동 적용**: 부동산중개수수료에 관한 법률의 최신 기준 적용
- **부가가치세 포함**: 10% VAT를 자동으로 계산
- **협의 보수율 조정**: 상한 요율 내에서 실제 수수료율 조정 가능
- **반응형 디자인**: 모든 디바이스에 최적화된 UI/UX
- **SEO 최적화**: Google 검색 엔진 최적화

## 🌐 배포된 사이트 이동

방문: [중개 수수료 계산기](https://brokerage-calculator.getdaytimes.com) (도메인 연결 후)

## 🚀 시작하기

### 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/yourusername/Brokerage-calculator.git
cd Brokerage-calculator

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

`http://localhost:3000`에서 애플리케이션을 확인할 수 있습니다.

## 📚 프로젝트 구조

```
Brokerage-calculator/
├── components/
│   ├── Calculator.js           # 메인 계산기 컴포넌트
│   ├── AdSense.js              # Google AdSense 광고 컴포넌트
│   ├── SeoStructuredData.js     # SEO 구조화된 데이터
│   └── styles/
│       └── Calculator.module.css # 계산기 스타일
├── pages/
│   ├── index.js                # 홈페이지
│   ├── _app.tsx                # Next.js 앱 레이아웃
│   ├── _document.tsx           # HTML 문서 레이아웃
│   └── api/
│       └── hello.ts            # API 예제
├── public/
│   ├── robots.txt              # SEO 로봇 설정
│   └── favicon.ico             # 파비콘
├── styles/
│   ├── globals.css             # 전역 스타일
│   └── Home.module.css         # 홈 스타일
├── next.config.ts             # Next.js 설정
├── tsconfig.json              # TypeScript 설정
├── package.json               # 프로젝트 메타데이터
└── DEPLOYMENT_GUIDE.md        # 배포 가이드
```

## 🛠️ 기술 스택

- **프레임워크**: Next.js 13+
- **라이브러리**: React 18+
- **스타일**: CSS Modules
- **언어**: JavaScript, TypeScript
- **배포**: Vercel, Netlify, AWS Amplify 등
- **SEO**: Schema.org, Open Graph, Twitter Cards

## 📦 설치 후 구성

### 1. 필요한 파일 업데이트

#### _app.tsx에서 도메인 변경
```typescript
// pages/_app.tsx
<meta property="og:url" content="https://yourdomain.com" />
<link rel="canonical" href="https://yourdomain.com" />
```

#### AdSense.js에서 클라이언트 ID 설정 (선택사항)
```javascript
// components/AdSense.js
// AdSense 승인 후 주석을 제거하고 클라이언트 ID 추가
data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
```

### 2. 배포 준비

[배포 가이드](./DEPLOYMENT_GUIDE.md)를 참고하여 다음 단계를 진행하세요:

1. ✅ 도메인 준비
2. ✅ 호스팅 플랫폼 선택 (Vercel 추천)
3. ✅ GitHub에 코드 업로드
4. ✅ Vercel/Netlify에서 배포
5. ✅ 도메인 연결
6. ✅ Google AdSense 신청
7. ✅ Google Search Console 설정
8. ✅ Google Analytics 설정 (선택사항)

더 자세한 내용은 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)를 참고하세요.

## 📊 사용 현황

이 프로젝트는 다음 플랫폼에서 배포 가능합니다:

- **Vercel** (권장) - Next.js 최적화, 무료 플랜
- **Netlify** - 정적 사이트 호스팅
- **AWS Amplify** - AWS 생태계 통합
- **GitHub Pages** - 정적 페이지 호스팅

## 💡 기능 상세 설명

### 부동산 유형

| 유형 | 포함 범위 | 상한 요율 |
|------|---------|---------|
| **주택** | 아파트, 단독주택, 다세대주택, 빌라 등 | 0.6% ~ 0.5% |
| **오피스텔** | 전용면적 85㎡ 이하의 오피스텔 | 0.5% ~ 0.4% |
| **주택 외** | 상가, 토지, 사무실 등 | 0.9% |

### 거래 유형

- **매매 또는 교환**: 부동산 소유권이 이전되는 거래
- **전세**: 선금(보증금)을 맡기고 사용하는 한국식 임대차
- **월세**: 보증금 + 월정액 임차료 지급

## ⚖️ 법률 정보

이 계산기는 **부동산중개수수료에 관한 법률**의 상한 요율을 기준으로 계산합니다.

- 실제 중개 수수료는 상한 요율 이내에서 협의로 결정됩니다
- 부가가치세(VAT) 10%는 별도로 부과됩니다
- 특수한 거래(경매, 공매 등)는 다른 기준이 적용될 수 있습니다

자세한 내용은 웹사이트 하단의 "협의 수수료 및 법률 정보" 섹션을 참고하세요.

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포할 수 있습니다.

## 🤝 기여하기

이 프로젝트에 기여하고 싶으시면:

1. Fork 하기
2. Feature 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## 📞 문의

문제가 있거나 제안이 있으시면 Issues를 통해 연락주세요.

## ⚠️ 면책 조항

이 계산기는 정보 제공을 목적으로 합니다. 실제 거래에서의 중개 수수료는 다양한 요인에 따라 달라질 수 있습니다. 정확한 정보는 한국공인중개사협회나 법률 전문가에게 문의하세요.

---

**마지막 업데이트**: 2026년 3월
