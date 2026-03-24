import { useState } from 'react';
import styles from './styles/Calculator.module.css';

export default function Calculator() {

  // 상태 관리
  const [propertyType, setPropertyType] = useState('주택');
  const [transactionType, setTransactionType] = useState('매매 또는 교환');
  const [amount, setAmount] = useState('');
  const [deposit, setDeposit] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [customRate, setCustomRate] = useState(null);
  const [calculated, setCalculated] = useState(false);
  const [result, setResult] = useState({ total: 0, vat: 0, final: 0 });

  // 기본 수수료율 설정
  const defaultRates = {
    '주택': { '매매 또는 교환': 0.6, '전세': 0.5, '월세': 0.5 },
    '오피스텔': { '매매 또는 교환': 0.5, '전세': 0.4, '월세': 0.4 },
    '주택 외': { '매매 또는 교환': 0.9, '전세': 0.9, '월세': 0.9 }
  };

  // 설명 텍스트
  const descriptionText = {
    '주택': '주택의 부속토지, 주택분양권 포함',
    '오피스텔': '부엌·화장실 등의 시설을 갖춘 전용면적 85㎡ 이하 오피스텔',
    '주택 외': '오피스텔(주거용 제외), 상가, 토지 등'
  };

  // 현재 적용할 수수료율 계산
  const commissionRate = customRate !== null ? customRate : defaultRates[propertyType][transactionType];

  // 부동산 유형 변경 핸들러
  const handlePropertyTypeChange = (type) => {
    setPropertyType(type);
    setCustomRate(null);
  };

  // 거래 유형 변경 핸들러
  const handleTransactionTypeChange = (type) => {
    setTransactionType(type);
    setCustomRate(null);
  };

  // 거래 금액 계산 (월세의 경우)
  const calculateTransactionAmount = () => {
    if (transactionType === '월세') {
      const depositNum = parseInt(deposit.replace(/,/g, '')) || 0;
      const monthlyRentNum = parseInt(monthlyRent.replace(/,/g, '')) || 0;
      
      // 5천만원 미만 특례 적용
      const baseAmount = depositNum + (monthlyRentNum * 100);
      if (baseAmount < 50000000) {
        return depositNum + (monthlyRentNum * 70);
      }
      return baseAmount;
    }
    
    if (transactionType === '전세') {
      return parseInt(deposit.replace(/,/g, '')) || 0;
    }
    
    return parseInt(amount.replace(/,/g, '')) || 0;
  };

  // 중개 수수료 계산
  const calculateCommission = () => {
    const transactionAmount = calculateTransactionAmount();
    
    // 수수료율 적용
    let commission = Math.floor(transactionAmount * (commissionRate / 100));
    
    // 상한 요율 적용 (주택의 경우)
    if (propertyType === '주택') {
      if (transactionType === '매매 또는 교환') {
        if (transactionAmount < 50000000) {
          commission = Math.min(commission, 250000);
        } else if (transactionAmount < 200000000) {
          commission = Math.min(commission, 800000);
        }
      } else if (transactionType === '전세' || transactionType === '월세') {
        if (transactionAmount < 50000000) {
          commission = Math.min(commission, 200000);
        } else if (transactionAmount < 100000000) {
          commission = Math.min(commission, 300000);
        }
      }
    }
    
    // 부가가치세 계산
    const vat = Math.floor(commission * 0.1);
    const finalAmount = commission + vat;
    
    setResult({
      total: commission,
      vat: vat,
      final: finalAmount
    });
    setCalculated(true);
  };

  // 숫자 포맷팅 (3자리마다 콤마)
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 입력값 포맷팅
  const handleAmountChange = (e, setter) => {
    const value = e.target.value.replace(/,/g, '');
    if (/^\d*$/.test(value)) {
      setter(formatNumber(value));
    }
  };

  // 수수료율 변경
  const handleRateChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setCustomRate(value);
    }
  };

  // 초기화
  const resetCalculator = () => {
    setPropertyType('주택');
    setTransactionType('매매 또는 교환');
    setAmount('');
    setDeposit('');
    setMonthlyRent('');
    setCustomRate(null);
    setCalculated(false);
    setResult({ total: 0, vat: 0, final: 0 });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>중개 수수료(복비) 계산기</h1>
      
      {!calculated ? (
        <>
          {/* 부동산 유형 선택 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>부동산 유형</h2>
            <div className={styles.buttonGroup}>
              {['주택', '오피스텔', '주택 외'].map(type => (
                <button
                  key={type}
                  className={`${styles.typeButton} ${propertyType === type ? styles.active : ''}`}
                  onClick={() => handlePropertyTypeChange(type)}
                >
                  {type}
                </button>
              ))}
            </div>
            <p className={styles.description}>{descriptionText[propertyType]}</p>
          </div>

          {/* 거래 유형 선택 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>거래 유형</h2>
            <div className={styles.buttonGroup}>
              {['매매 또는 교환', '전세', '월세'].map(type => (
                <button
                  key={type}
                  className={`${styles.typeButton} ${transactionType === type ? styles.active : ''}`}
                  onClick={() => handleTransactionTypeChange(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 입력 필드 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>거래 정보</h2>
            
            {transactionType === '매매 또는 교환' && (
              <div className={styles.inputGroup}>
                <label>거래금액</label>
                <div className={styles.inputWithUnit}>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => handleAmountChange(e, setAmount)}
                    placeholder="거래금액 입력"
                  />
                  <span className={styles.unit}>원</span>
                </div>
              </div>
            )}
            
            {(transactionType === '전세' || transactionType === '월세') && (
              <div className={styles.inputGroup}>
                <label>보증금</label>
                <div className={styles.inputWithUnit}>
                  <input
                    type="text"
                    value={deposit}
                    onChange={(e) => handleAmountChange(e, setDeposit)}
                    placeholder="보증금 입력"
                  />
                  <span className={styles.unit}>원</span>
                </div>
              </div>
            )}
            
            {transactionType === '월세' && (
              <div className={styles.inputGroup}>
                <label>월세</label>
                <div className={styles.inputWithUnit}>
                  <input
                    type="text"
                    value={monthlyRent}
                    onChange={(e) => handleAmountChange(e, setMonthlyRent)}
                    placeholder="월세 입력"
                  />
                  <span className={styles.unit}>원</span>
                </div>
              </div>
            )}
            
            <div className={styles.inputGroup}>
              <label>협의 보수율</label>
              <div className={styles.inputWithUnit}>
                <input
                  type="number"
                  step="0.1"
                  value={commissionRate}
                  onChange={handleRateChange}
                />
                <span className={styles.unit}>%</span>
              </div>
              <p className={styles.rateInfo}>
                기본 {defaultRates[propertyType][transactionType]}% (최대 {defaultRates[propertyType][transactionType]}%)
              </p>
            </div>
          </div>

          {/* 계산하기 버튼 */}
          <button 
            className={styles.calculateButton}
            onClick={calculateCommission}
          >
            계산하기
          </button>
        </>
      ) : (
        /* 결과 화면 */
        <div className={styles.resultSection}>
          <h2 className={styles.resultTitle}>중개 수수료 계산 결과</h2>
          
          <div className={styles.resultItem}>
            <span>중개 수수료:</span>
            <span>{formatNumber(result.total)}원</span>
          </div>
          
          <div className={styles.resultItem}>
            <span>부가가치세 (10%):</span>
            <span>{formatNumber(result.vat)}원</span>
          </div>
          
          <div className={styles.resultItem}>
            <span className={styles.finalLabel}>총 중개 수수료:</span>
            <span className={styles.finalAmount}>{formatNumber(result.final)}원</span>
          </div>
          
          <div className={styles.note}>
            <p><strong>계산 결과 안내</strong></p>
            <p>※ 위 금액은 한쪽 당 납부하는 중개 수수료입니다.</p>
            <p>※ 실제 중개 수수료는 상한 요율 범위 내에서 협의로 결정됩니다.</p>
            <p>※ 상한 요율은 부동산의 유형과 거래 방식에 따라 다릅니다.</p>
          </div>
          
          <button 
            className={styles.resetButton}
            onClick={resetCalculator}
          >
            다시하기
          </button>
        </div>
      )}
    </div>
  );
}