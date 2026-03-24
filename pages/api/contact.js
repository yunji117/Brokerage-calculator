export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'POST 요청만 허용됩니다.' });
  }

  const { category, message } = req.body || {};

  if (!message) {
    return res.status(400).json({ message: '문의 내용은 필수입니다.' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL;
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL || 'contact@send.example.com';
  const projectName = process.env.NEXT_PUBLIC_SITE_NAME || '중개 수수료(복비) 계산기';

  if (!resendApiKey || !contactToEmail) {
    return res.status(503).json({
      message:
        '문의 전송 설정이 아직 완료되지 않았습니다. RESEND_API_KEY와 CONTACT_TO_EMAIL을 설정해 주세요.',
    });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: contactFromEmail,
        to: [contactToEmail],
        subject: `[${projectName}] ${category || '일반 문의'}`,
        text: [
          `프로젝트: ${projectName}`,
          `문의 유형: ${category || '일반 문의'}`,
          '',
          message,
        ].join('\n'),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(502).json({
        message: '문의 메일 전송에 실패했습니다.',
        detail: errorText,
      });
    }

    return res.status(200).json({ message: '문의가 정상적으로 접수되었습니다.' });
  } catch (error) {
    return res.status(500).json({
      message: '문의 전송 중 오류가 발생했습니다.',
      detail: error instanceof Error ? error.message : 'unknown error',
    });
  }
}
