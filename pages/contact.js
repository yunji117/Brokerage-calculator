import { useState } from 'react';
import Head from 'next/head';
import { siteConfig } from '../lib/siteConfig';

const pageStyles = {
  main: { maxWidth: 760, margin: '0 auto', padding: '40px 24px', lineHeight: 1.8 },
  intro: { marginBottom: 24 },
  form: {
    display: 'grid',
    gap: 16,
    padding: 24,
    border: '1px solid #e5e7eb',
    borderRadius: 16,
    background: '#ffffff',
    boxShadow: '0 12px 32px rgba(15, 23, 42, 0.06)',
  },
  label: { display: 'grid', gap: 8, fontWeight: 600 },
  input: {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #d1d5db',
    borderRadius: 10,
    fontSize: 16,
    font: 'inherit',
  },
  textarea: {
    width: '100%',
    minHeight: 180,
    padding: '12px 14px',
    border: '1px solid #d1d5db',
    borderRadius: 10,
    fontSize: 16,
    font: 'inherit',
    resize: 'vertical',
  },
  button: {
    width: 'fit-content',
    padding: '12px 18px',
    border: 0,
    borderRadius: 10,
    background: '#111827',
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
  },
  status: { margin: 0, fontSize: 14 },
  note: { marginTop: 24, color: '#4b5563' },
};

export default function ContactPage() {
  const canonicalUrl = siteConfig.siteUrl ? `${siteConfig.siteUrl}/contact` : '';
  const [category, setCategory] = useState('오류 제보');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  async function handleSubmit(event) {
    event.preventDefault();

    if (!message.trim()) {
      setSubmitStatus({ type: 'error', message: '문의 내용을 입력해 주세요.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '문의 전송에 실패했습니다.');
      }

      setMessage('');
      setSubmitStatus({
        type: 'success',
        message: data.message || '문의가 정상적으로 접수되었습니다.',
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : '문의 전송 중 오류가 발생했습니다.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>문의 안내 | {siteConfig.siteName}</title>
        <meta
          name="description"
          content="중개 수수료(복비) 계산기 서비스 문의 안내 및 문의 접수 페이지입니다."
        />
        {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
      </Head>
      <main style={pageStyles.main}>
        <h1>문의 안내</h1>
        <p style={pageStyles.intro}>
          계산 결과 오류 제보, 정보 수정 요청, 광고 및 제휴 문의를 아래 폼으로 보내 주세요.
        </p>

        <form onSubmit={handleSubmit} style={pageStyles.form}>
          <label style={pageStyles.label}>
            문의 유형
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              style={pageStyles.input}
            >
              <option value="오류 제보">오류 제보</option>
              <option value="정보 수정 요청">정보 수정 요청</option>
              <option value="광고 및 제휴">광고 및 제휴</option>
              <option value="일반 문의">일반 문의</option>
            </select>
          </label>

          <label style={pageStyles.label}>
            문의 내용
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="문의하실 내용을 입력해 주세요."
              style={pageStyles.textarea}
            />
          </label>

          <button type="submit" disabled={isSubmitting} style={pageStyles.button}>
            {isSubmitting ? '전송 중...' : '문의 보내기'}
          </button>

          {submitStatus.message ? (
            <p
              style={{
                ...pageStyles.status,
                color: submitStatus.type === 'success' ? '#047857' : '#b91c1c',
              }}
            >
              {submitStatus.message}
            </p>
          ) : null}
        </form>

        <p style={pageStyles.note}>
          법률 자문이나 세무 자문은 제공하지 않으며, 구체적인 거래는 공인중개사 및 전문가와
          별도로 확인해 주세요.
        </p>
      </main>
    </>
  );
}
