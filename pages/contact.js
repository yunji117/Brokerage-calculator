import { useEffect, useState } from 'react';
import Head from 'next/head';
import { siteConfig } from '../lib/siteConfig';

export default function ContactPage() {
  const canonicalUrl = siteConfig.siteUrl ? `${siteConfig.siteUrl}/contact` : '';
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    category: '오류 제보',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus({
          type: 'error',
          message: data.message || '문의 전송에 실패했습니다.',
        });
        return;
      }

      setStatus({
        type: 'success',
        message: data.message || '문의가 정상적으로 접수되었습니다.',
      });
      setFormData({
        category: '오류 제보',
        message: '',
      });
    } catch {
      setStatus({
        type: 'error',
        message: '문의 전송 중 네트워크 오류가 발생했습니다.',
      });
    } finally {
      setSubmitting(false);
    }
  };

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
          계산기 오류 제보, 정보 수정 요청, 광고 및 제휴 문의를 아래 폼으로 남겨 주세요.
        </p>
        <p>
          문의 내용은 운영자에게 전달되며, 확인 후 필요한 내용부터 순차적으로 반영합니다.
        </p>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'grid',
            gap: 16,
            marginTop: 24,
            padding: 24,
            border: '1px solid #e9ecef',
            borderRadius: 16,
            background: '#f8f9fa',
          }}
        >
          <label>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>문의 유형</div>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #cfd8dc' }}
            >
              <option value="오류 제보">오류 제보</option>
              <option value="정보 수정 요청">정보 수정 요청</option>
              <option value="광고 및 제휴">광고 및 제휴</option>
              <option value="기타 문의">기타 문의</option>
            </select>
          </label>

          <label>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>문의 내용</div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={8}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 10,
                border: '1px solid #cfd8dc',
                resize: 'vertical',
              }}
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            style={{
              border: 'none',
              borderRadius: 12,
              background: '#1abc9c',
              color: '#fff',
              padding: '14px 18px',
              fontWeight: 700,
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? '전송 중...' : '문의 보내기'}
          </button>

          {status.message ? (
            <p
              style={{
                margin: 0,
                color: status.type === 'error' ? '#c0392b' : '#0f8b6d',
                fontWeight: 600,
              }}
            >
              {status.message}
            </p>
          ) : null}
        </form>

        {mounted && siteConfig.kakaoOpenChatUrl ? (
          <div
            style={{
              marginTop: 24,
              padding: 24,
              borderRadius: 16,
              background: '#fff9d9',
              border: '1px solid #f2e28c',
            }}
          >
            <h2 style={{ fontSize: 20, marginTop: 0, marginBottom: 8 }}>빠른 문의</h2>
            <p style={{ marginTop: 0, marginBottom: 16 }}>
              카카오톡 오픈채팅으로 빠르게 문의할 수 있습니다.
            </p>
            <a
              href={siteConfig.kakaoOpenChatUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 220,
                padding: '14px 20px',
                borderRadius: 12,
                background: '#FEE500',
                color: '#191919',
                fontWeight: 800,
                textDecoration: 'none',
                boxShadow: '0 8px 20px rgba(25, 25, 25, 0.12)',
              }}
            >
              카카오톡으로 바로 문의하기
            </a>
          </div>
        ) : null}
        <p>
          법률 자문이나 세무 자문은 제공하지 않으며, 구체적인 거래는 공인중개사 및 전문가와 반드시
          별도로 확인해 주세요.
        </p>
      </main>
    </>
  );
}
